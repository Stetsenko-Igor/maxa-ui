figma.showUI(__html__, { width: 560, height: 760 });

const MIGRATIONS = {
  variables: {
    'Color modes/bg/secondary': 'Color modes/background/bg-surface',
    'Color modes/bg/inset': 'Color modes/background/bg-muted',
    'Color modes/bg/success-solid': 'Color modes/background/bg-success-strong',
    'Color modes/bg/error-solid': 'Color modes/background/bg-error-strong',
    'Color modes/bg/warning-solid': 'Color modes/background/bg-warning-strong',
    'Color modes/bg/info-solid': 'Color modes/background/bg-info-strong',
    'Color modes/bg-success-solid': 'Color modes/background/bg-success-strong',
    'Color modes/bg-error-solid': 'Color modes/background/bg-error-strong',
    'Color modes/bg-warning-solid': 'Color modes/background/bg-warning-strong',
    'Color modes/bg-info-solid': 'Color modes/background/bg-info-strong',
    'Color modes/bg/brand': 'Color modes/background/bg-brand-surface',
    'Color modes/bg/bg-brand': 'Color modes/background/bg-brand-surface',
    'Color modes/background/bg-brand': 'Color modes/background/bg-brand-surface',
    'Color modes/bg/brand-solid': 'Color modes/background/bg-brand-strong',
    'Color modes/bg/bg-brand-solid': 'Color modes/background/bg-brand-strong',
    'Color modes/background/bg-brand-solid': 'Color modes/background/bg-brand-strong',
    // 2026-07 color naming resolution (Scheme B): error/success everywhere,
    // destructive for the interactive action layer. Renames preserve Figma IDs
    // so existing bindings survive.
    'Color modes/foreground/fg-positive': 'Color modes/foreground/fg-success',
    'Color modes/foreground/fg-negative': 'Color modes/foreground/fg-error',
    'Color modes/action/action-positive': 'Color modes/action/action-success',
    'Color modes/action/action-positive-hover': 'Color modes/action/action-success-hover',
    'Color modes/action/action-positive-active': 'Color modes/action/action-success-active',
    'Color modes/action/action-positive-subtle': 'Color modes/action/action-success-subtle',
    'Color modes/action/action-positive-subtle-hover': 'Color modes/action/action-success-subtle-hover',
    'Color modes/action/action-positive-subtle-active': 'Color modes/action/action-success-subtle-active',
    'Color modes/action/action-negative': 'Color modes/action/action-destructive',
    'Color modes/action/action-negative-hover': 'Color modes/action/action-destructive-hover',
    'Color modes/action/action-negative-active': 'Color modes/action/action-destructive-active',
    'Color modes/action/action-negative-subtle': 'Color modes/action/action-destructive-subtle',
    'Color modes/action/action-negative-subtle-hover': 'Color modes/action/action-destructive-subtle-hover',
    'Color modes/action/action-negative-subtle-active': 'Color modes/action/action-destructive-subtle-active',
    'Color modes/border/border-error': 'Color modes/border/border-error-strong',
    'Color modes/border/border-danger-subtle': 'Color modes/border/border-error-subtle',
    'Component-based/Alert/color/danger/bg': 'Component-based/Alert/color/error/bg',
    'Component-based/Alert/color/danger/border': 'Component-based/Alert/color/error/border',
    'Component-based/Alert/color/danger/accent': 'Component-based/Alert/color/error/accent',
    'Component-based/Alert/color/danger/text': 'Component-based/Alert/color/error/text',
    'Component-based/Button/danger/bg': 'Component-based/Button/destructive/bg',
    'Component-based/Button/danger/bg-hover': 'Component-based/Button/destructive/bg-hover',
    'Component-based/Button/danger/bg-active': 'Component-based/Button/destructive/bg-active',
    'Component-based/Button/danger/text': 'Component-based/Button/destructive/text',
    'Component-based/Button/danger/border': 'Component-based/Button/destructive/border',
    'Component-based/Button/danger/border-hover': 'Component-based/Button/destructive/border-hover',
    'Component-based/Button/danger/border-focus': 'Component-based/Button/destructive/border-focus',
  },
  textStyles: {},
  effectStyles: {},
};

const COLOR_MODE_TOKEN_NAMES = {
  text: {
    targetGroup: 'text',
    prefix: 'text',
    tokens: [
      'primary',
      'secondary',
      'tertiary',
      'disabled',
      'inverse',
      'on-brand',
      'brand',
      'success',
      'warning',
      'error',
      'info',
    ],
  },
  fg: {
    targetGroup: 'foreground',
    prefix: 'fg',
    tokens: [
      'primary',
      'secondary',
      'tertiary',
      'disabled',
      'inverse',
      'on-brand',
      'brand',
      'positive',
      'negative',
      'warning',
      'info',
    ],
  },
  bg: {
    targetGroup: 'background',
    prefix: 'bg',
    tokens: [
      'page',
      'surface',
      'muted',
      'disabled',
      'overlay',
      'inverse',
      'brand-subtle',
      'brand-surface',
      'brand-strong',
      'success-subtle',
      'success-surface',
      'success-strong',
      'warning-subtle',
      'warning-surface',
      'warning-strong',
      'error-subtle',
      'error-surface',
      'error-strong',
      'info-subtle',
      'info-surface',
      'info-strong',
    ],
  },
  border: {
    targetGroup: 'border',
    prefix: 'border',
    tokens: [
      'primary',
      'secondary',
      'tertiary',
      'focus',
      'brand',
      'error',
    ],
  },
  action: {
    targetGroup: 'action',
    prefix: 'action',
    tokens: [
      'primary',
      'primary-hover',
      'primary-active',
      'primary-subtle',
      'primary-subtle-hover',
      'primary-subtle-active',
      'neutral',
      'neutral-hover',
      'neutral-active',
      'neutral-subtle',
      'neutral-subtle-hover',
      'neutral-subtle-active',
      'brand',
      'brand-hover',
      'brand-active',
      'brand-subtle',
      'brand-subtle-hover',
      'brand-subtle-active',
      'positive',
      'positive-hover',
      'positive-active',
      'positive-subtle',
      'positive-subtle-hover',
      'positive-subtle-active',
      'negative',
      'negative-hover',
      'negative-active',
      'negative-subtle',
      'negative-subtle-hover',
      'negative-subtle-active',
      'warning',
      'warning-hover',
      'warning-active',
      'warning-subtle',
      'warning-subtle-hover',
      'warning-subtle-active',
    ],
  },
};

for (const [groupName, { targetGroup, prefix, tokens: tokenNames }] of Object.entries(COLOR_MODE_TOKEN_NAMES)) {
  for (const tokenName of tokenNames) {
    const targetPath = `Color modes/${targetGroup}/${prefix}-${tokenName}`;
    const legacyPath = `Color modes/${groupName}/${tokenName}`;
    const prefixedPath = `Color modes/${groupName}/${prefix}-${tokenName}`;
    MIGRATIONS.variables[legacyPath] = targetPath;
    if (prefixedPath !== targetPath) {
      MIGRATIONS.variables[prefixedPath] = targetPath;
    }
  }
}

for (const sizeKey of [
  'heading-2xl',
  'heading-xl',
  'heading-lg',
  'heading-md',
  'heading-sm',
  'heading-xs',
  'text-lg',
  'text-md',
  'text-sm',
  'caption-sm',
  'caption-xs',
]) {
  for (const weightKey of ['regular', 'medium', 'semibold', 'bold']) {
    const newName = `${formatTypographyGroupName(sizeKey)}/${formatTypographyWeightName(weightKey)}`;
    MIGRATIONS.textStyles[`Typography/${newName}`] = newName;
  }
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'import-tokens') {
    const logs = [];
    try {
      const bundle = parseBundle(msg.payload);
      const options = {
        removeStaleVariables: Boolean(msg.options && msg.options.removeStaleVariables),
        removeStaleModes: Boolean(msg.options && msg.options.removeStaleModes),
        recreateWrongTypes: Boolean(msg.options && msg.options.recreateWrongTypes),
      };
      const preflight = validateBundle(bundle);
      const existingState = await validateExistingVariableState(bundle, options);
      pushLog(logs, 'info', `Bundle parsed. Collections: ${Object.keys(bundle.collections).length}.`);
      pushLog(logs, 'success', `Preflight passed: ${preflight.variableCount} typed variables, ${preflight.aliasCount} alias values, ${preflight.modeValueCount} mode values.`);
      pushLog(logs, 'success', `Existing-state preflight passed: ${existingState.wrongTypeCount} wrong-type variable(s) require recreation.`);
      if (options.removeStaleVariables) {
        pushLog(logs, 'warn', 'Stale variable cleanup is enabled. Variables missing from the bundle will be removed from imported collections.');
      } else {
        pushLog(logs, 'info', 'Stale variable cleanup is disabled. Existing variables missing from the bundle will be kept.');
      }
      if (options.removeStaleModes) {
        pushLog(logs, 'warn', 'Stale mode cleanup is enabled. Collection modes missing from the bundle will be removed.');
      } else {
        pushLog(logs, 'info', 'Stale mode cleanup is disabled. Existing modes missing from the bundle will be kept.');
      }
      if (options.recreateWrongTypes) {
        pushLog(logs, 'warn', 'Wrong-type recreation is enabled. Affected variable IDs will change.');
      } else {
        pushLog(logs, 'info', 'Wrong-type recreation is disabled. Import will stop if a stale variable has the wrong type.');
      }
      await applyMigrations(MIGRATIONS, logs);
      await importBundle(bundle, logs, { ...options, existingStateValidated: true });
      await createTypographyStyles(bundle, logs);
      await createShadowEffectStyles(bundle, logs);
      pushLog(logs, 'success', 'Import finished successfully.');
      figma.ui.postMessage({ type: 'import-result', ok: true, logs });
    } catch (error) {
      pushLog(logs, 'error', error && error.message ? error.message : String(error));
      figma.ui.postMessage({ type: 'import-result', ok: false, logs });
    }
  }

  if (msg.type === 'export-variables') {
    const logs = [];
    try {
      const bundle = await exportVariablesAsBundle(logs);
      pushLog(logs, 'success', 'Export finished successfully.');
      figma.ui.postMessage({ type: 'export-result', ok: true, logs, bundle });
    } catch (error) {
      pushLog(logs, 'error', error && error.message ? error.message : String(error));
      figma.ui.postMessage({ type: 'export-result', ok: false, logs });
    }
  }

  if (msg.type === 'close-plugin') {
    figma.closePlugin();
  }
};

/**
 * Reads every local variable collection/mode/variable and serializes it into
 * the SAME shape import-bundle.json uses: { collections: { <Name>: { modes: {
 * <Mode>: { "group/token-name": value } }, descriptions: { "group/token-name":
 * text } } } }. Aliases are re-emitted as "{Collection/group/token-name}"
 * strings, matching the alias syntax the importer already parses (parseAliasPath).
 *
 * This is read-only: it never calls any figma.variables.* setter or creator.
 */
async function exportVariablesAsBundle(logs) {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const allVariables = await figma.variables.getLocalVariablesAsync();
  const variableById = new Map(allVariables.map((v) => [v.id, v]));
  // Aliases can point to a variable in a DIFFERENT collection than the one
  // being exported (e.g. a Component-based token aliasing a Color modes
  // token) — the emitted "{Collection/name}" must use the TARGET variable's
  // own collection, not the collection currently being iterated.
  const collectionNameById = new Map(collections.map((c) => [c.id, c.name]));

  const bundle = { collections: {} };

  for (const collection of collections) {
    const modes = {};
    const descriptions = {};
    const types = {};
    const scopes = {};
    const collectionVariables = allVariables.filter((v) => v.variableCollectionId === collection.id);

    for (const mode of collection.modes) {
      const tokens = {};

      for (const variable of collectionVariables) {
        const raw = variable.valuesByMode[mode.modeId];
        if (raw === undefined) continue;
        tokens[variable.name] = serializeVariableValue(raw, variable, variableById, collectionNameById);
      }

      modes[mode.name] = tokens;
    }

    for (const variable of collectionVariables) {
      types[variable.name] = variable.resolvedType;
      scopes[variable.name] = [...variable.scopes];
      if (variable.description && variable.description.trim()) {
        descriptions[variable.name] = variable.description.trim();
      }
    }

    bundle.collections[collection.name] = Object.keys(descriptions).length > 0
      ? { modes, descriptions, types, scopes }
      : { modes, types, scopes };

    pushLog(logs, 'info', `Exported "${collection.name}": ${collectionVariables.length} variable(s), ${collection.modes.length} mode(s).`);
  }

  return bundle;
}

function serializeVariableValue(raw, variable, variableById, collectionNameById) {
  if (raw && typeof raw === 'object' && raw.type === 'VARIABLE_ALIAS') {
    const target = variableById.get(raw.id);
    if (!target) return null;
    const targetCollectionName = collectionNameById.get(target.variableCollectionId);
    if (!targetCollectionName) return null;
    return `{${targetCollectionName}/${target.name}}`;
  }

  if (variable.resolvedType === 'COLOR' && raw && typeof raw === 'object') {
    return rgbaToHex(raw);
  }

  return raw;
}

function rgbaToHex({ r, g, b, a }) {
  const toByte = (channel) => Math.round(channel * 255).toString(16).padStart(2, '0');
  const hex = `#${toByte(r)}${toByte(g)}${toByte(b)}`;
  return a < 1 ? `${hex}${toByte(a)}` : hex;
}

function parseBundle(input) {
  let parsed;
  try {
    parsed = JSON.parse(input);
  } catch (e) {
    throw new Error('Invalid JSON. Paste a valid MAXA import bundle.');
  }
  if (!parsed || typeof parsed !== 'object' || !parsed.collections || typeof parsed.collections !== 'object') {
    throw new Error('Invalid bundle shape. Expected: { "collections": { ... } }');
  }
  return parsed;
}

function validateBundle(bundle) {
  const validTypes = new Set(['BOOLEAN', 'COLOR', 'FLOAT', 'STRING']);
  const validScopes = new Set([
    'ALL_SCOPES', 'TEXT_CONTENT', 'CORNER_RADIUS', 'WIDTH_HEIGHT', 'GAP',
    'ALL_FILLS', 'FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL', 'STROKE_COLOR',
    'STROKE_FLOAT', 'EFFECT_FLOAT', 'EFFECT_COLOR', 'OPACITY', 'FONT_FAMILY',
    'FONT_STYLE', 'FONT_WEIGHT', 'FONT_SIZE', 'LINE_HEIGHT', 'LETTER_SPACING',
    'PARAGRAPH_SPACING', 'PARAGRAPH_INDENT',
  ]);
  const tokenPaths = new Set();
  let variableCount = 0;
  let aliasCount = 0;
  let modeValueCount = 0;

  for (const [collectionName, collectionDef] of Object.entries(bundle.collections || {})) {
    const modeEntries = Object.entries((collectionDef && collectionDef.modes) || {});
    if (!modeEntries.length) throw new Error(`Preflight: collection "${collectionName}" has no modes.`);

    const expectedNames = Object.keys(modeEntries[0][1] || {}).sort();
    if (!expectedNames.length) throw new Error(`Preflight: collection "${collectionName}" has no variables.`);

    for (const [modeName, modeTokens] of modeEntries) {
      const actualNames = Object.keys(modeTokens || {}).sort();
      if (JSON.stringify(actualNames) !== JSON.stringify(expectedNames)) {
        throw new Error(`Preflight: collection "${collectionName}" mode "${modeName}" has a different token set.`);
      }
    }

    for (const tokenName of expectedNames) {
      const resolvedType = collectionDef.types && collectionDef.types[tokenName];
      if (!validTypes.has(resolvedType)) {
        throw new Error(`Preflight: Missing resolved type for "${collectionName}/${tokenName}".`);
      }
      const scopes = collectionDef.scopes && collectionDef.scopes[tokenName];
      if (!Array.isArray(scopes) || scopes.some((scope) => !validScopes.has(scope))) {
        throw new Error(`Preflight: Missing or invalid scopes for "${collectionName}/${tokenName}".`);
      }
      tokenPaths.add(`${collectionName}/${tokenName}`);
      variableCount += 1;
    }
  }

  const aliasEdges = new Map();
  for (const [collectionName, collectionDef] of Object.entries(bundle.collections || {})) {
    for (const [modeName, modeTokens] of Object.entries(collectionDef.modes || {})) {
      for (const [tokenName, value] of Object.entries(modeTokens || {})) {
        const sourcePath = `${collectionName}/${tokenName}`;
        const resolvedType = collectionDef.types[tokenName];
        modeValueCount += 1;

        if (typeof value === 'string' && /(?:var\(--|color-mix\(|\b(?:px|rem)\b)/.test(value)) {
          throw new Error(`Preflight: CSS expression cannot be a Figma variable value at "${sourcePath}" [${modeName}]: ${value}`);
        }

        if (isAlias(value)) {
          const targetPath = parseAliasPath(bundle, collectionName, value);
          if (!tokenPaths.has(targetPath)) {
            throw new Error(`Preflight: Alias target not found for "${sourcePath}" [${modeName}] -> "${targetPath}".`);
          }
          const targetParts = parseVariablePath(targetPath);
          const targetType = bundle.collections[targetParts.collectionName].types[targetParts.variableName];
          if (targetType !== resolvedType) {
            throw new Error(`Preflight: Alias type mismatch for "${sourcePath}" (${resolvedType}) -> "${targetPath}" (${targetType}).`);
          }
          if (!aliasEdges.has(sourcePath)) aliasEdges.set(sourcePath, new Set());
          aliasEdges.get(sourcePath).add(targetPath);
          aliasCount += 1;
          continue;
        }

        if (!isLiteralCompatibleWithType(resolvedType, value)) {
          throw new Error(`Preflight: Invalid ${resolvedType} literal at "${sourcePath}" [${modeName}]: ${String(value)}`);
        }
      }
    }
  }

  const visiting = new Set();
  const visited = new Set();
  const visit = (path) => {
    if (visiting.has(path)) throw new Error(`Preflight: Circular variable alias detected at "${path}".`);
    if (visited.has(path)) return;
    visiting.add(path);
    for (const target of aliasEdges.get(path) || []) visit(target);
    visiting.delete(path);
    visited.add(path);
  };
  for (const path of tokenPaths) visit(path);

  return { variableCount, aliasCount, modeValueCount };
}

function isLiteralCompatibleWithType(type, value) {
  if (type === 'FLOAT') return typeof value === 'number' && Number.isFinite(value);
  if (type === 'BOOLEAN') return typeof value === 'boolean';
  if (type === 'STRING') return typeof value === 'string';
  if (type === 'COLOR') return typeof value === 'string' && isColor(value);
  return false;
}

async function validateExistingVariableState(bundle, options = {}) {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const variables = await figma.variables.getLocalVariablesAsync();
  const collectionNameById = new Map(collections.map((collection) => [collection.id, collection.name]));
  const desiredTypes = new Map();

  for (const [collectionName, collectionDef] of Object.entries(bundle.collections || {})) {
    for (const [tokenName, type] of Object.entries(collectionDef.types || {})) {
      desiredTypes.set(`${collectionName}/${tokenName}`, type);
    }
  }

  const wrongTypes = [];
  for (const variable of variables) {
    const collectionName = collectionNameById.get(variable.variableCollectionId);
    if (!collectionName) continue;
    const path = `${collectionName}/${variable.name}`;
    const desiredType = desiredTypes.get(path);
    if (desiredType && desiredType !== variable.resolvedType) {
      wrongTypes.push({ variable, path, desiredType });
    }
  }

  if (wrongTypes.length && !options.recreateWrongTypes) {
    const sample = wrongTypes.slice(0, 5)
      .map(({ path, variable, desiredType }) => `${path}: ${variable.resolvedType} -> ${desiredType}`)
      .join(', ');
    throw new Error(
      `Existing-state preflight: ${wrongTypes.length} variable(s) have the wrong type (${sample}). ` +
      'Enable "Recreate wrong-type variables" only after reviewing the ID-change warning.',
    );
  }

  if (wrongTypes.length) {
    const wrongIds = new Set(wrongTypes.map(({ variable }) => variable.id));
    const unmanagedConsumers = [];
    for (const variable of variables) {
      const collectionName = collectionNameById.get(variable.variableCollectionId);
      const consumerPath = collectionName ? `${collectionName}/${variable.name}` : variable.id;
      if (desiredTypes.has(consumerPath)) continue;
      for (const value of Object.values(variable.valuesByMode || {})) {
        if (value && value.type === 'VARIABLE_ALIAS' && wrongIds.has(value.id)) {
          unmanagedConsumers.push(consumerPath);
          break;
        }
      }
    }
    if (unmanagedConsumers.length) {
      throw new Error(
        `Existing-state preflight: wrong-type variables are referenced by ${unmanagedConsumers.length} unmanaged local variable(s): ` +
        `${unmanagedConsumers.slice(0, 5).join(', ')}. Rebind them before recreation.`,
      );
    }
  }

  return { wrongTypeCount: wrongTypes.length };
}

async function applyMigrations(migrations, logs) {
  await migrateVariables(migrations.variables || {}, logs);
  await migrateStyles('Text style', await figma.getLocalTextStylesAsync(), migrations.textStyles || {}, logs);
  await migrateStyles('Effect style', await figma.getLocalEffectStylesAsync(), migrations.effectStyles || {}, logs);
}

async function migrateVariables(variableMigrations, logs) {
  const entries = Object.entries(variableMigrations);
  if (!entries.length) return;

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const variables = await figma.variables.getLocalVariablesAsync();
  let count = 0;

  for (const [sourcePath, targetPath] of entries) {
    const sourceParts = parseVariablePath(sourcePath);
    const targetParts = parseVariablePath(targetPath);

    if (!sourceParts || !targetParts || sourceParts.collectionName !== targetParts.collectionName) {
      pushLog(logs, 'warn', `Skipped variable migration "${sourcePath}" -> "${targetPath}" because cross-collection migrations are not supported.`);
      continue;
    }

    const collection = collections.find((item) => item.name === sourceParts.collectionName);
    if (!collection) continue;

    const source = variables.find((variable) => variable.variableCollectionId === collection.id && variable.name === sourceParts.variableName);
    if (!source) continue;

    const target = variables.find((variable) => variable.variableCollectionId === collection.id && variable.name === targetParts.variableName);
    if (target) {
      pushLog(logs, 'warn', `Skipped variable migration "${sourcePath}" because "${targetPath}" already exists.`);
      continue;
    }

    source.name = targetParts.variableName;
    count += 1;
    pushLog(logs, 'info', `Migrated variable "${sourcePath}" -> "${targetPath}".`);
  }

  if (count > 0) {
    pushLog(logs, 'info', `Variable migrations finished. Renamed ${count} variable(s).`);
  }
}

function parseVariablePath(path) {
  const slashIndex = path.indexOf('/');
  if (slashIndex === -1) return null;
  return {
    collectionName: path.slice(0, slashIndex),
    variableName: path.slice(slashIndex + 1),
  };
}

async function migrateStyles(kind, styles, styleMigrations, logs) {
  const entries = Object.entries(styleMigrations);
  if (!entries.length) return;

  let count = 0;
  for (const [sourceName, targetName] of entries) {
    const source = findStyleByName(styles, sourceName);
    if (!source) continue;

    const target = findStyleByName(styles, targetName);
    if (target) {
      pushLog(logs, 'warn', `Skipped ${kind.toLowerCase()} migration "${sourceName}" because "${targetName}" already exists.`);
      continue;
    }

    source.name = targetName;
    count += 1;
    pushLog(logs, 'info', `Migrated ${kind.toLowerCase()} "${sourceName}" -> "${targetName}".`);
  }

  if (count > 0) {
    pushLog(logs, 'info', `${kind} migrations finished. Renamed ${count} style(s).`);
  }
}

async function importBundle(bundle, logs, options = {}) {
  if (!options.existingStateValidated) await validateExistingVariableState(bundle, options);

  const allVariablesByPath = new Map();
  const desiredTokenNamesByCollection = new Map();
  const collectionByName = new Map();

  // Phase 1: create every collection and every typed variable before assigning
  // any values. This makes forward and cross-component aliases deterministic
  // instead of depending on manifest/token ordering.
  for (const [collectionName, collectionDef] of Object.entries(bundle.collections)) {
    const modeNames = Object.keys((collectionDef && collectionDef.modes) || {});
    if (modeNames.length === 0) continue;

    const collection = await getOrCreateCollection(collectionName, logs);
    await syncModes(collection, modeNames, logs, options.removeStaleModes);
    collectionByName.set(collectionName, collection);

    const firstModeName = modeNames[0];
    const firstModeTokens = collectionDef.modes[firstModeName] || {};
    desiredTokenNamesByCollection.set(collectionName, new Set(Object.keys(firstModeTokens)));
    pushLog(logs, 'info', `Preparing typed variables for "${collectionName}".`);

    for (const tokenName of Object.keys(firstModeTokens)) {
      const resolvedType = collectionDef.types[tokenName];
      const variable = await getOrCreateVariable(collection, tokenName, resolvedType, logs, options);
      variable.scopes = [...collectionDef.scopes[tokenName]];
      allVariablesByPath.set(`${collectionName}/${tokenName}`, variable);
    }
  }

  // Phase 2: with the complete variable map available, assign literals and
  // aliases independently for every mode.
  for (const [collectionName, collectionDef] of Object.entries(bundle.collections)) {
    const collection = collectionByName.get(collectionName);
    if (!collection) continue;
    const modeMap = getModeNameToId(collection);
    pushLog(logs, 'info', `Assigning mode values for "${collectionName}".`);

    for (const tokenName of Object.keys(Object.values(collectionDef.modes)[0] || {})) {
      const variable = allVariablesByPath.get(`${collectionName}/${tokenName}`);
      const resolvedType = collectionDef.types[tokenName];

      for (const [modeName, modeTokens] of Object.entries(collectionDef.modes)) {
        const modeId = modeMap.get(modeName);
        if (!modeId) throw new Error(`Mode "${modeName}" was not created in "${collectionName}".`);

        const rawValue = modeTokens[tokenName];
        if (isAlias(rawValue)) {
          const aliasPath = parseAliasPath(bundle, collectionName, rawValue);
          const target = allVariablesByPath.get(aliasPath);
          if (!target) throw new Error(`Alias target disappeared after preflight: "${aliasPath}".`);
          variable.setValueForMode(modeId, figma.variables.createVariableAlias(target));
        } else {
          variable.setValueForMode(modeId, normalizeValue(resolvedType, rawValue));
        }
      }
    }
  }

  // Apply variable descriptions ("How to use this variable" in Figma). The
  // bundle carries a mode-independent descriptions map per collection.
  let describedCount = 0;
  for (const [collectionName, collectionDef] of Object.entries(bundle.collections)) {
    const descriptions = (collectionDef && collectionDef.descriptions) || {};
    for (const [tokenName, description] of Object.entries(descriptions)) {
      if (typeof description !== 'string' || !description.trim()) continue;
      const variable = allVariablesByPath.get(`${collectionName}/${tokenName}`);
      if (!variable) continue;
      if (variable.description !== description) {
        variable.description = description;
        describedCount += 1;
      }
    }
  }
  if (describedCount > 0) {
    pushLog(logs, 'info', `Applied ${describedCount} variable description(s).`);
  }

  if (options.removeStaleVariables) {
    for (const [collectionName, desiredNames] of desiredTokenNamesByCollection.entries()) {
      const collection = collectionByName.get(collectionName);
      await removeStaleVariables(collection, desiredNames, logs);
    }
  } else {
    pushLog(logs, 'info', 'Skipped stale variable cleanup.');
  }

  pushLog(logs, 'info', 'Variables import finished.');
}

async function createTypographyStyles(bundle, logs) {
  const typography = bundle.collections['Typography'];
  if (!typography) {
    pushLog(logs, 'info', 'Skipped text styles: Typography collection not found.');
    return;
  }

  const modeName = Object.keys(typography.modes || {})[0];
  const tokens = typography.modes[modeName] || {};
  const variableMap = await getVariableMap('Typography');
  const localTextStyles = removeLegacyTypographyStyles(await figma.getLocalTextStylesAsync(), logs);
  const sizeKeys = Object.keys(tokens)
    .filter((key) => key.startsWith('Font size/'))
    .map((key) => key.replace('Font size/', ''))
    .sort(compareTypographySizes);
  const weightKeys = ['regular', 'medium', 'semibold', 'bold'].filter(
    (weight) => tokens[`Font weight/${weight}`] !== undefined,
  );
  pushLog(logs, 'info', `Creating typography styles from ${sizeKeys.length} sizes and ${weightKeys.length} weights.`);

  for (const sizeKey of sizeKeys) {
    const familyKey = sizeKey.startsWith('code-') ? 'mono' : 'body';
    const familyValue = tokens[`Font family/${familyKey}`];
    const fontSizeValue = tokens[`Font size/${sizeKey}`];
    const lineHeightValue = tokens[`Line height/${sizeKey}`];
    const letterSpacingValue = tokens[`Letter spacing/${sizeKey}`];

    for (const weightKey of weightKeys) {
      const fontStyleValue = tokens[`Font weight/${weightKey}`];
      const styleName = `${formatTypographyGroupName(sizeKey)}/${formatTypographyWeightName(weightKey)}`;

      let style = findStyleByName(localTextStyles, styleName);
      if (!style) {
        style = figma.createTextStyle();
        style.name = styleName;
        localTextStyles.push(style);
      }

      const family = typeof familyValue === 'string' ? familyValue : 'Montserrat';
      const requestedFontStyle = typeof fontStyleValue === 'string' ? fontStyleValue : 'Regular';
      const resolvedFontStyle = getSafeFontStyleForFamily(family, requestedFontStyle);
      await figma.loadFontAsync({ family, style: resolvedFontStyle });

      style.fontName = { family, style: resolvedFontStyle };
      if (typeof fontSizeValue === 'number') style.fontSize = fontSizeValue;
      if (typeof lineHeightValue === 'number') {
        style.lineHeight = { unit: 'PIXELS', value: lineHeightValue };
      }
      if (typeof letterSpacingValue === 'number') {
        style.letterSpacing = { unit: 'PIXELS', value: letterSpacingValue };
      }

      bindTextStyleVariable(style, 'fontFamily', variableMap.get(`Font family/${familyKey}`), logs, styleName);
      if (supportsFontStyleBinding(family)) {
        bindTextStyleVariable(style, 'fontStyle', variableMap.get(`Font weight/${weightKey}`), logs, styleName);
      } else {
        pushLog(logs, 'warn', `Skipped fontStyle variable binding for "${styleName}" because "${family}" does not expose the full weight matrix.`);
      }
      bindTextStyleVariable(style, 'fontSize', variableMap.get(`Font size/${sizeKey}`), logs, styleName);
      bindTextStyleVariable(style, 'lineHeight', variableMap.get(`Line height/${sizeKey}`), logs, styleName);

      const letterSpacingVariable = variableMap.get(`Letter spacing/${sizeKey}`);
      if (letterSpacingVariable) {
        bindTextStyleVariable(style, 'letterSpacing', letterSpacingVariable, logs, styleName);
      }

      pushLog(logs, 'info', `Created/updated text style "${styleName}".`);
    }
  }
}

function removeLegacyTypographyStyles(localTextStyles, logs) {
  let count = 0;
  const retainedStyles = [];

  for (const style of localTextStyles) {
    const styleName = getStyleName(style, logs);
    if (!styleName) continue;

    if (styleName.startsWith('Typography/')) {
      style.remove();
      count += 1;
    } else {
      retainedStyles.push(style);
    }
  }

  if (count > 0) {
    pushLog(logs, 'info', `Removed ${count} legacy Typography/* text style(s).`);
  }

  return retainedStyles;
}

async function createShadowEffectStyles(bundle, logs) {
  const shadows = bundle.effects && bundle.effects.shadows && bundle.effects.shadows.Shadows;
  if (!shadows) {
    pushLog(logs, 'info', 'Skipped shadow effect styles: effects.shadows not found.');
    return;
  }

  const localEffectStyles = removeLegacyShadowEffectStyles(await figma.getLocalEffectStylesAsync(), logs);
  let count = 0;

  for (const [modeName, tokens] of Object.entries(shadows)) {
    if (modeName.toLowerCase() !== 'light') {
      pushLog(logs, 'info', `Skipped shadow effect styles for ${modeName} mode.`);
      continue;
    }

    for (const [tokenName, effects] of Object.entries(tokens || {})) {
      const styleName = `Shadows/${tokenName}`;
      const normalizedEffects = normalizeShadowEffects(effects, logs, styleName);
      if (!normalizedEffects.length) continue;

      let style = findStyleByName(localEffectStyles, styleName);
      if (!style) {
        style = figma.createEffectStyle();
        style.name = styleName;
        localEffectStyles.push(style);
      }

      style.effects = normalizedEffects;
      count += 1;
      pushLog(logs, 'info', `Created/updated effect style "${styleName}".`);
    }
  }

  pushLog(logs, 'info', `Shadow effect styles finished. Updated ${count} style(s).`);
}

function removeLegacyShadowEffectStyles(localEffectStyles, logs) {
  let count = 0;
  const retainedStyles = [];

  for (const style of localEffectStyles) {
    const styleName = getStyleName(style, logs);
    if (!styleName) continue;

    if (styleName.startsWith('Shadows dark/')) {
      style.remove();
      count += 1;
    } else {
      retainedStyles.push(style);
    }
  }

  if (count > 0) {
    pushLog(logs, 'info', `Removed ${count} legacy Shadows dark/* effect style(s).`);
  }

  return retainedStyles;
}

function findStyleByName(styles, name) {
  return styles.find((style) => {
    try {
      return style.name === name;
    } catch (_error) {
      return false;
    }
  });
}

function getStyleName(style, logs) {
  try {
    return style.name;
  } catch (error) {
    pushLog(logs, 'warn', `Skipped an unavailable local style reference: ${error.message || error}`);
    return null;
  }
}

function normalizeShadowEffects(effects, logs, styleName) {
  if (!Array.isArray(effects)) {
    pushLog(logs, 'warn', `Skipped effect style "${styleName}" because its value is not an array.`);
    return [];
  }

  return effects
    .filter((effect) => effect && effect.type === 'DROP_SHADOW')
    .map((effect) => ({
      type: 'DROP_SHADOW',
      visible: effect.visible !== false,
      color: hexToRgba(effect.color || '#000000'),
      offset: {
        x: Number(effect.x || 0),
        y: Number(effect.y || 0),
      },
      radius: Number(effect.blur || 0),
      spread: Number(effect.spread || 0),
      blendMode: 'NORMAL',
    }));
}

async function getOrCreateCollection(name, logs) {
  const localCollections = await figma.variables.getLocalVariableCollectionsAsync();
  const existing = localCollections.find((c) => c.name === name);
  if (existing) return existing;
  const created = figma.variables.createVariableCollection(name);
  pushLog(logs, 'info', `Created collection "${name}".`);
  return created;
}

async function syncModes(collection, desiredModeNames, logs, removeStaleModes = false) {
  if (desiredModeNames.length > 0 && collection.modes.length > 0 && collection.modes[0].name !== desiredModeNames[0]) {
    collection.renameMode(collection.modes[0].modeId, desiredModeNames[0]);
    pushLog(logs, 'info', `Renamed the first mode in "${collection.name}" to "${desiredModeNames[0]}".`);
  }
  const refreshedNames = collection.modes.map((m) => m.name);
  for (const modeName of desiredModeNames) {
    if (!refreshedNames.includes(modeName)) {
      collection.addMode(modeName);
      pushLog(logs, 'info', `Added mode "${modeName}" to "${collection.name}".`);
    }
  }

  if (removeStaleModes) {
    const desired = new Set(desiredModeNames);
    const staleModes = collection.modes.filter((mode) => !desired.has(mode.name));
    for (const mode of staleModes) {
      collection.removeMode(mode.modeId);
      pushLog(logs, 'warn', `Removed stale mode "${mode.name}" from "${collection.name}".`);
    }
  }
}

function getModeNameToId(collection) {
  const map = new Map();
  for (const mode of collection.modes) map.set(mode.name, mode.modeId);
  return map;
}

async function getOrCreateVariable(collection, name, type, logs, options = {}) {
  const localVariables = await figma.variables.getLocalVariablesAsync();
  const existing = localVariables.find((v) => v.variableCollectionId === collection.id && v.name === name);
  if (existing && existing.resolvedType === type) return existing;

  if (existing && !options.recreateWrongTypes) {
    throw new Error(
      `Variable "${collection.name}/${name}" is ${existing.resolvedType}, but the bundle requires ${type}. ` +
      'Enable "Recreate wrong-type variables" after reviewing the ID-change warning.',
    );
  }

  if (existing) {
    const oldId = existing.id;
    existing.remove();
    pushLog(logs, 'warn', `Removed wrong-type variable "${collection.name}/${name}" (${existing.resolvedType}, id ${oldId}).`);
  }

  const created = figma.variables.createVariable(name, collection, type);
  pushLog(logs, 'info', `Created variable "${collection.name}/${name}".`);
  return created;
}

async function removeStaleVariables(collection, desiredNames, logs) {
  const allVariables = await figma.variables.getLocalVariablesAsync();
  const stale = allVariables.filter((variable) => {
    return variable.variableCollectionId === collection.id && !desiredNames.has(variable.name);
  });

  if (!stale.length) {
    pushLog(logs, 'info', `No stale variables to remove in "${collection.name}".`);
    return;
  }

  pushLog(logs, 'warn', `Removing ${stale.length} stale variable(s) from "${collection.name}".`);

  const pending = [...stale].sort((a, b) => b.name.split('/').length - a.name.split('/').length);
  let pass = 0;
  while (pending.length && pass < 6) {
    pass += 1;
    let removedInPass = 0;

    for (let index = pending.length - 1; index >= 0; index -= 1) {
      const variable = pending[index];
      try {
        variable.remove();
        pending.splice(index, 1);
        removedInPass += 1;
        pushLog(logs, 'info', `Removed stale variable "${collection.name}/${variable.name}".`);
      } catch (error) {
        // Keep for next pass. Some stale variables may still depend on other stale aliases.
      }
    }

    if (removedInPass === 0) break;
  }

  for (const variable of pending) {
    pushLog(logs, 'warn', `Could not remove stale variable "${collection.name}/${variable.name}". Remove it manually if it is no longer needed.`);
  }
}

function normalizeValue(type, value) {
  if (type === 'COLOR') return colorToRgba(value);
  return value;
}

function isAlias(value) {
  return typeof value === 'string' && /^\{[^}]+\}$/.test(value.trim());
}

function parseAliasPath(bundle, currentCollectionName, value) {
  const inner = value.trim().slice(1, -1).trim();

  if (inner.includes('/')) {
    const firstSlash = inner.indexOf('/');
    const maybeCollection = inner.slice(0, firstSlash);
    if (bundle.collections[maybeCollection]) return inner;
  }

  if (inner.includes('.')) {
    const slashPath = inner.replace(/\./g, '/');
    const defaults = (bundle.aliasDefaults || {});
    const defaultCollection = defaults[currentCollectionName];
    if (defaultCollection) return `${defaultCollection}/${slashPath}`;
  }

  const defaults = (bundle.aliasDefaults || {});
  const defaultCollection = defaults[currentCollectionName];
  if (defaultCollection && !inner.includes('/') && !inner.includes('.')) {
    return `${defaultCollection}/${inner}`;
  }

  return `${currentCollectionName}/${inner}`;
}

function isColor(value) {
  if (typeof value !== 'string') return false;
  const normalized = value.trim();
  return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(normalized) ||
    /^rgba?\(\s*\d+(?:\.\d+)?\s*,\s*\d+(?:\.\d+)?\s*,\s*\d+(?:\.\d+)?(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/.test(normalized) ||
    normalized === 'transparent';
}

function colorToRgba(value) {
  const normalized = value.trim();
  if (normalized === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  if (normalized.startsWith('#')) return hexToRgba(normalized);

  const match = /^rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/.exec(normalized);
  if (!match) throw new Error(`Unsupported color literal: ${value}`);
  return {
    r: Number(match[1]) / 255,
    g: Number(match[2]) / 255,
    b: Number(match[3]) / 255,
    a: match[4] === undefined ? 1 : Number(match[4]),
  };
}

function hexToRgba(hex) {
  const raw = hex.replace('#', '');
  const hasAlpha = raw.length === 8;
  const r = parseInt(raw.slice(0, 2), 16) / 255;
  const g = parseInt(raw.slice(2, 4), 16) / 255;
  const b = parseInt(raw.slice(4, 6), 16) / 255;
  const a = hasAlpha ? parseInt(raw.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

function formatTypographyGroupName(sizeKey) {
  const [prefix, suffix] = sizeKey.split('-');
  return `${capitalize(prefix)} ${suffix}`;
}

function formatTypographyWeightName(weightKey) {
  return weightKey
    .split('-')
    .map((part) => capitalize(part))
    .join(' ');
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function compareTypographySizes(a, b) {
  return typographySortIndex(a) - typographySortIndex(b);
}

function typographySortIndex(sizeKey) {
  const order = [
    'heading-2xl',
    'heading-xl',
    'heading-lg',
    'heading-md',
    'heading-sm',
    'heading-xs',
    'text-lg',
    'text-md',
    'text-sm',
    'caption-sm',
    'caption-xs',
  ];
  const index = order.indexOf(sizeKey);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

async function getVariableMap(collectionName) {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const collection = collections.find((item) => item.name === collectionName);
  if (!collection) return new Map();

  const variables = await figma.variables.getLocalVariablesAsync();
  const map = new Map();
  for (const variable of variables) {
    if (variable.variableCollectionId === collection.id) {
      map.set(variable.name, variable);
    }
  }
  return map;
}

function bindTextStyleVariable(style, field, variable, logs, styleName) {
  if (!variable) {
    pushLog(logs, 'warn', `Skipped variable binding "${field}" for text style "${styleName}" because the variable was not found.`);
    return;
  }
  style.setBoundVariable(field, variable);
}

function pushLog(logs, level, text) {
  const entry = { level, text };
  logs.push(entry);
  figma.ui.postMessage({ type: 'import-progress', entry });
}

function supportsFontStyleBinding(family) {
  return true;
}

function getSafeFontStyleForFamily(family, requestedStyle) {
  if (!supportsFontStyleBinding(family)) return 'Regular';
  return requestedStyle;
}
