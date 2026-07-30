import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const pluginDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(pluginDir, '../../..');
const source = fs.readFileSync(path.join(pluginDir, 'code.js'), 'utf8');
const sandbox = {
  __html__: '',
  console,
  figma: {
    mixed: Symbol('mixed'),
    showUI() {},
    ui: { onmessage: null },
  },
};

vm.createContext(sandbox);
vm.runInContext(source, sandbox, { filename: 'code.js' });

const node = (id, name, type = 'FRAME') => ({ id, name, type });
const surface = node('surface', 'Button', 'COMPONENT');
const label = node('label', 'NAME', 'TEXT');
const leftIcon = node('left', 'Left Icon', 'INSTANCE');
const rightIcon = node('right', 'Right Icon', 'INSTANCE');

assert.equal(sandbox.normalizeVariant('Positive'), 'success');
assert.equal(sandbox.normalizeVariant('Negative'), 'destructive');
assert.equal(sandbox.normalizeVariant('𝙶̶𝚑̶𝚘̶𝚜̶𝚝̶ Outline'), 'outline');
assert.equal(sandbox.normalizeSize('XS - Xtra Small'), 'xs');
assert.equal(sandbox.normalizeSize('S - Small'), 'sm');
assert.equal(sandbox.normalizeSize('M - Medium'), 'md');
assert.equal(sandbox.normalizeSize('L - Large'), 'lg');
assert.equal(sandbox.normalizeState('Pressed'), 'pressed');
assert.equal(sandbox.normalizeState('Selected'), 'selected');

function mapping({ variant, state, size = 'md', iconOnly = false, left = false, right = false }) {
  return sandbox.buildMappingPreview({
    familyCandidate: iconOnly ? 'Buttons/Icon button' : variant === 'destructive' ? 'Buttons/Button destructive' : 'Buttons/Button',
    variantCandidate: variant,
    sizeCandidate: size,
    stateCandidate: state,
    surfaceLayer: surface,
    borderLayer: null,
    labelLayer: iconOnly ? null : label,
    leadingIconLayer: left || iconOnly ? leftIcon : null,
    trailingIconLayer: right ? rightIcon : null,
  });
}

function tokenFor(preview, role) {
  return preview.assignments.find((assignment) => assignment.role === role)?.token;
}

const outlineFocus = mapping({ variant: 'outline', state: 'focus' });
assert.equal(tokenFor(outlineFocus, 'surface'), 'Button/outline/bg');
assert.equal(tokenFor(outlineFocus, 'border'), 'Button/outline/border-focus');

const linkHover = mapping({ variant: 'link', state: 'hover', left: true, right: true });
assert.equal(tokenFor(linkHover, 'label'), 'Button/link/text-hover');
assert.equal(tokenFor(linkHover, 'leading-icon'), 'Button/link/fg-hover');
assert.equal(tokenFor(linkHover, 'trailing-icon'), 'Button/link/fg-hover');
assert.equal(linkHover.assignments.filter((assignment) => assignment.role === 'icon-size').length, 2);

const linkPressed = mapping({ variant: 'link', state: 'pressed', left: true });
assert.equal(tokenFor(linkPressed, 'surface'), 'Button/link/bg-active');
assert.equal(tokenFor(linkPressed, 'border'), 'Button/link/border');
assert.equal(tokenFor(linkPressed, 'label'), 'Button/link/text-active');
assert.equal(tokenFor(linkPressed, 'leading-icon'), 'Button/link/fg-active');

const primaryLoading = mapping({ variant: 'primary', state: 'loading' });
assert.equal(tokenFor(primaryLoading, 'surface'), 'Button/primary/bg');
assert.equal(tokenFor(primaryLoading, 'border'), 'Button/primary/border');
assert.equal(tokenFor(primaryLoading, 'disabled'), 'Button/disabled/opacity');

const iconOnlyXs = mapping({ variant: 'primary', state: 'default', size: 'xs', iconOnly: true });
assert.equal(tokenFor(iconOnlyXs, 'size'), 'Button/icon-only/xs/size');
assert.equal(tokenFor(iconOnlyXs, 'radius'), 'Button/size/xs/radius');
assert.equal(tokenFor(iconOnlyXs, 'icon-size'), 'Button/size/xs/icon-size');

function flattenTokenPaths(value, prefix = '', result = new Set()) {
  if (!value || typeof value !== 'object') return result;
  if ('$value' in value) {
    result.add(prefix);
    return result;
  }
  for (const [key, child] of Object.entries(value)) {
    flattenTokenPaths(child, prefix ? `${prefix}/${key}` : key, result);
  }
  return result;
}

const lightTokens = flattenTokenPaths(JSON.parse(fs.readFileSync(path.join(repoRoot, 'packages/tokens/figma/component-button-light.json'), 'utf8')));
const darkTokens = flattenTokenPaths(JSON.parse(fs.readFileSync(path.join(repoRoot, 'packages/tokens/figma/component-button-dark.json'), 'utf8')));
const types = ['Primary', 'Secondary', '𝙶̶𝚑̶𝚘̶𝚜̶𝚝̶ Outline', 'Positive', 'Negative', 'Link', 'Ghost'];
const sizes = ['L - Large', 'M - Medium', 'S - Small', 'XS - Xtra Small'];
const states = ['Default', 'Pressed', 'Focus', 'Hover', 'Selected', 'Loading', 'Disabled'];
const iconPatterns = ['none', 'left', 'just', 'left+right', 'left+dropdown', 'right', 'dropdown'];
let variantCount = 0;
const generatedTokens = new Set();

for (const type of types) {
  for (const size of sizes) {
    for (const state of states) {
      for (const iconPattern of iconPatterns) {
        variantCount += 1;
        const variant = sandbox.normalizeVariant(type);
        const normalizedSize = sandbox.normalizeSize(size);
        const normalizedState = sandbox.normalizeState(state);
        assert.notEqual(variant, '');
        assert.notEqual(normalizedSize, '');
        assert.notEqual(normalizedState, '');
        const preview = mapping({
          variant,
          state: normalizedState,
          size: normalizedSize,
          iconOnly: iconPattern === 'just',
          left: iconPattern.includes('left') || iconPattern === 'dropdown',
          right: iconPattern === 'right' || iconPattern === 'left+right' || iconPattern === 'left+dropdown',
        });
        for (const assignment of preview.assignments) generatedTokens.add(assignment.token);
      }
    }
  }
}

assert.equal(variantCount, 1372);
for (const token of generatedTokens) {
  assert.ok(lightTokens.has(token), `Light token is missing: ${token}`);
  assert.ok(darkTokens.has(token), `Dark token is missing: ${token}`);
  assert.ok(!token.includes('/danger/'), `Legacy danger token generated: ${token}`);
  assert.ok(!token.endsWith('bg-focus'), `Nonexistent focus background generated: ${token}`);
  assert.ok(!token.endsWith('border-active'), `Nonexistent active border generated: ${token}`);
}

console.log(`Button migration tests passed: ${variantCount} variants, ${generatedTokens.size} unique target tokens.`);
