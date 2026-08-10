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

const secondaryForegroundPreview = vm.runInContext(
  'PREVIEW_TOKEN_COLORS["Button/secondary/fg"]',
  sandbox,
);
assert.deepEqual(
  JSON.parse(JSON.stringify(secondaryForegroundPreview)),
  { r: 26 / 255, g: 25 / 255, b: 25 / 255 },
);

const node = (id, name, type = 'FRAME') => ({ id, name, type });
const surface = node('surface', 'Button', 'COMPONENT');
const label = node('label', 'NAME', 'TEXT');
const leftIcon = node('left', 'Left Icon', 'INSTANCE');
const rightIcon = node('right', 'Right Icon', 'INSTANCE');
const loadingSpinner = node('loading', 'Loading Spinner', 'INSTANCE');
const outlineBackground = {
  ...node('outline-background', 'bgr-filled', 'RECTANGLE'),
  visible: false,
  fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }],
};

assert.equal(sandbox.normalizeVariant('Positive'), 'success');
assert.equal(sandbox.normalizeVariant('Negative'), 'destructive');
assert.equal(sandbox.normalizeVariant('𝙶̶𝚑̶𝚘̶𝚜̶𝚝̶ Outline'), 'outline');
assert.equal(sandbox.normalizeSize('XS - Xtra Small'), 'xs');
assert.equal(sandbox.normalizeSize('S - Small'), 'sm');
assert.equal(sandbox.normalizeSize('M - Medium'), 'md');
assert.equal(sandbox.normalizeSize('L - Large'), 'lg');
assert.equal(sandbox.normalizeState('Pressed'), 'pressed');
assert.equal(sandbox.normalizeState('Selected'), 'selected');

const selectedButtonInstance = node('button-instance', 'Button', 'INSTANCE');
selectedButtonInstance.componentProperties = {
  Type: { type: 'VARIANT', value: 'Primary' },
  '📐 Size': { type: 'VARIANT', value: 'L - Large' },
  State: { type: 'VARIANT', value: 'Pressed' },
};
assert.equal(
  sandbox.collectTargets([selectedButtonInstance, surface, node('frame', 'Frame')]).map((item) => item.id).join(','),
  'button-instance,surface',
);
assert.equal(sandbox.getVariantProperty(sandbox.getParsedProperties(selectedButtonInstance), ['type']), 'Primary');
assert.equal(sandbox.getVariantProperty(sandbox.getParsedProperties(selectedButtonInstance), ['size']), 'L - Large');
assert.equal(sandbox.getVariantProperty(sandbox.getParsedProperties(selectedButtonInstance), ['state']), 'Pressed');

function mapping({ variant, state, size = 'md', iconOnly = false, left = false, right = false, loading = false }) {
  const leadingIcon = loading ? loadingSpinner : left || iconOnly ? leftIcon : null;
  const children = [];
  if (leadingIcon) children.push(leadingIcon);
  if (!iconOnly) children.push(label);
  if (right) children.push(rightIcon);
  const component = { ...surface, children };

  return sandbox.buildMappingPreview({
    familyCandidate: iconOnly ? 'Buttons/Icon button' : variant === 'destructive' ? 'Buttons/Button destructive' : 'Buttons/Button',
    variantCandidate: variant,
    sizeCandidate: size,
    stateCandidate: state,
    componentLayer: component,
    surfaceLayer: component,
    legacyBackgroundLayer: variant === 'outline' ? outlineBackground : null,
    borderLayer: null,
    labelLayer: iconOnly ? null : label,
    leadingIconLayer: leadingIcon,
    trailingIconLayer: right ? rightIcon : null,
  });
}

function tokenFor(preview, role) {
  return preview.assignments.find((assignment) => assignment.role === role)?.token;
}

const outlineFocus = mapping({ variant: 'outline', state: 'focus' });
assert.equal(tokenFor(outlineFocus, 'surface'), 'Button/outline/bg');
assert.equal(tokenFor(outlineFocus, 'background-surface'), 'Button/outline/bg-surface');
assert.equal(tokenFor(outlineFocus, 'border'), 'Button/outline/border-focus');
assert.equal(sandbox.detectLegacyBackgroundLayer({ children: [outlineBackground] }), outlineBackground);

const outlinePressed = mapping({ variant: 'outline', state: 'pressed' });
assert.equal(tokenFor(outlinePressed, 'border'), 'Button/outline/border-active');

const linkHover = mapping({ variant: 'link', state: 'hover', left: true, right: true });
assert.equal(tokenFor(linkHover, 'label'), 'Button/link/text-hover');
assert.equal(tokenFor(linkHover, 'leading-icon'), 'Button/link/fg-hover');
assert.equal(tokenFor(linkHover, 'trailing-icon'), 'Button/link/fg-hover');
assert.equal(linkHover.assignments.filter((assignment) => assignment.role === 'icon-size').length, 2);
assert.ok(linkHover.assignments.some((assignment) => assignment.role === 'link-layout' && !assignment.token));
assert.equal(tokenFor(linkHover, 'padding-zero'), 'spacing-none');
for (const forbiddenRole of ['height', 'padding-x', 'padding-left', 'padding-right', 'radius', 'size']) {
  assert.equal(linkHover.assignments.some((assignment) => assignment.role === forbiddenRole), false, `Link must not use ${forbiddenRole}`);
}
assert.equal(tokenFor(linkHover, 'gap'), 'Button/size/md/gap');
assert.equal(tokenFor(linkHover, 'text-size'), 'Button/size/md/text');

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

const primaryNoIcons = mapping({ variant: 'primary', state: 'default' });
assert.equal(tokenFor(primaryNoIcons, 'padding-left'), 'Button/size/md/padding-x');
assert.equal(tokenFor(primaryNoIcons, 'padding-right'), 'Button/size/md/padding-x');

const primaryLeftIcon = mapping({ variant: 'primary', state: 'default', left: true });
assert.equal(tokenFor(primaryLeftIcon, 'padding-left'), 'Button/size/md/padding-x-icon');
assert.equal(tokenFor(primaryLeftIcon, 'padding-right'), 'Button/size/md/padding-x');

const primaryRightIcon = mapping({ variant: 'primary', state: 'default', right: true });
assert.equal(tokenFor(primaryRightIcon, 'padding-left'), 'Button/size/md/padding-x');
assert.equal(tokenFor(primaryRightIcon, 'padding-right'), 'Button/size/md/padding-x-icon');

const primaryTwoIcons = mapping({ variant: 'primary', state: 'default', left: true, right: true });
assert.equal(tokenFor(primaryTwoIcons, 'padding-left'), 'Button/size/md/padding-x-icon');
assert.equal(tokenFor(primaryTwoIcons, 'padding-right'), 'Button/size/md/padding-x-icon');
assert.equal(tokenFor(primaryTwoIcons, 'leading-icon'), 'Button/primary/fg');
assert.equal(tokenFor(primaryTwoIcons, 'trailing-icon'), 'Button/primary/fg');

for (const variant of ['secondary', 'outline', 'ghost', 'success', 'destructive', 'warning']) {
  const preview = mapping({ variant, state: 'hover', left: true, right: true });
  assert.equal(tokenFor(preview, 'leading-icon'), `Button/${variant}/fg`);
  assert.equal(tokenFor(preview, 'trailing-icon'), `Button/${variant}/fg`);
}

const primaryLoadingSpinner = mapping({ variant: 'primary', state: 'loading', loading: true });
assert.equal(tokenFor(primaryLoadingSpinner, 'padding-left'), 'Button/size/md/padding-x-icon');
assert.equal(tokenFor(primaryLoadingSpinner, 'padding-right'), 'Button/size/md/padding-x');

const clearedBindings = new Map();
const linkLayoutNode = {
  layoutMode: 'HORIZONTAL',
  primaryAxisSizingMode: 'FIXED',
  counterAxisSizingMode: 'FIXED',
  layoutSizingHorizontal: 'FIXED',
  layoutSizingVertical: 'FIXED',
  minWidth: 80,
  maxWidth: 200,
  minHeight: 24,
  maxHeight: 48,
  topLeftRadius: 4,
  topRightRadius: 4,
  bottomLeftRadius: 4,
  bottomRightRadius: 4,
  boundVariables: {
    height: { id: 'old-height' },
    topLeftRadius: { id: 'old-radius' },
    topRightRadius: { id: 'old-radius' },
    bottomLeftRadius: { id: 'old-radius' },
    bottomRightRadius: { id: 'old-radius' },
  },
  setBoundVariable(field, variable) {
    clearedBindings.set(field, variable);
  },
};
assert.equal(sandbox.applyLinkLayout(linkLayoutNode, null, []), true);
assert.equal(linkLayoutNode.layoutSizingHorizontal, 'HUG');
assert.equal(linkLayoutNode.layoutSizingVertical, 'HUG');
assert.equal(linkLayoutNode.minHeight, null);
assert.equal(linkLayoutNode.topLeftRadius, 0);
assert.equal(clearedBindings.get('height'), null);

let paintBindingCalls = 0;
sandbox.figma.variables = {
  setBoundVariableForPaint(paint, field, variable) {
    paintBindingCalls += 1;
    return {
      ...paint,
      boundVariableId: variable.id,
      boundField: field,
      boundVariables: { color: { id: variable.id } },
    };
  },
};
const spinnerTrack = {
  id: 'spinner-track',
  name: 'Track',
  type: 'ELLIPSE',
  fills: [],
  strokes: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }],
  strokeWeight: 1,
};
const spinnerActive = {
  id: 'spinner-active',
  name: 'Active',
  type: 'ELLIPSE',
  fills: [],
  strokes: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }],
  strokeWeight: 1,
};
const spinnerInstance = {
  id: 'spinner',
  name: 'Loading Spinner',
  type: 'INSTANCE',
  fills: [],
  children: [spinnerTrack, spinnerActive],
};
assert.equal(await sandbox.bindIconColorVariable(spinnerInstance, { id: 'icon-color', resolvedType: 'COLOR' }), true);
assert.equal(spinnerTrack.strokes[0].boundVariableId, 'icon-color');
assert.equal(spinnerActive.strokes[0].boundVariableId, 'icon-color');
assert.equal(paintBindingCalls, 2);
assert.equal(await sandbox.bindIconColorVariable(spinnerInstance, { id: 'icon-color', resolvedType: 'COLOR' }), true);
assert.equal(paintBindingCalls, 2);

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

const componentTokenJson = JSON.parse(fs.readFileSync(path.join(repoRoot, 'packages/tokens/figma/component-button.json'), 'utf8'));
const componentTokens = flattenTokenPaths(componentTokenJson);
const spacingTokens = flattenTokenPaths(JSON.parse(fs.readFileSync(path.join(repoRoot, 'packages/tokens/figma/spacing.json'), 'utf8')));
const availableTokens = new Set([...componentTokens, ...spacingTokens]);
assert.equal(componentTokenJson.Button.size.xs.gap.$value, '{Spacing/spacing-xs}');
assert.equal(componentTokenJson.Button.size.sm.gap.$value, '{Spacing/spacing-sm}');
assert.equal(componentTokenJson.Button.size.md.gap.$value, '{Spacing/spacing-md}');
assert.equal(componentTokenJson.Button.size.lg.gap.$value, '{Spacing/spacing-md}');
assert.equal(componentTokenJson.Button.size.xs['padding-x'].$value, '{Spacing/spacing-md}');
assert.equal(componentTokenJson.Button.size.xs['padding-x-icon'].$value, '{Spacing/spacing-sm}');
assert.equal(componentTokenJson.Button.size.sm['padding-x-icon'].$value, '{Spacing/spacing-md}');
assert.equal(componentTokenJson.Button.size.md['padding-x-icon'].$value, 14);
assert.equal(componentTokenJson.Button.size.lg['padding-x-icon'].$value, '{Spacing/spacing-2xl}');
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
        for (const assignment of preview.assignments) {
          if (assignment.token) generatedTokens.add(assignment.token);
        }
      }
    }
  }
}

assert.equal(variantCount, 1372);
for (const token of generatedTokens) {
  assert.ok(availableTokens.has(token), `Migration token is missing: ${token}`);
  assert.ok(!token.includes('/danger/'), `Legacy danger token generated: ${token}`);
  assert.ok(!token.endsWith('bg-focus'), `Nonexistent focus background generated: ${token}`);
  if (token.endsWith('border-active')) {
    assert.equal(token, 'Button/outline/border-active', `Unexpected active border generated: ${token}`);
  }
}

console.log(`Button migration tests passed: ${variantCount} variants, ${generatedTokens.size} unique target tokens.`);
