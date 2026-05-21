figma.showUI(__html__, { width: 560, height: 760 });

const MIGRATIONS = {
  variables: {
    'Color modes/bg/secondary': 'Color modes/bg/surface',
    'Color modes/bg/inset': 'Color modes/bg/muted',
    'Color modes/bg-success-solid': 'Color modes/bg-success-strong',
    'Color modes/bg-error-solid': 'Color modes/bg-error-strong',
    'Color modes/bg-warning-solid': 'Color modes/bg-warning-strong',
    'Color modes/bg-info-solid': 'Color modes/bg-info-strong',
  },
  textStyles: {},
  effectStyles: {},
};

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
      };
      pushLog(logs, 'info', `Bundle parsed. Collections: ${Object.keys(bundle.collections).length}.`);
      if (options.removeStaleVariables) {
        pushLog(logs, 'warn', 'Stale variable cleanup is enabled. Variables missing from the bundle will be removed from imported collections.');
      } else {
        pushLog(logs, 'info', 'Stale variable cleanup is disabled. Existing variables missing from the bundle will be kept.');
      }
      await applyMigrations(MIGRATIONS, logs);
      await importBundle(bundle, logs, options);
      await createTypographyStyles(bundle, logs);
      await createShadowEffectStyles(bundle, logs);
      pushLog(logs, 'success', 'Import finished successfully.');
      figma.ui.postMessage({ type: 'import-result', ok: true, logs });
    } catch (error) {
      pushLog(logs, 'error', error && error.message ? error.message : String(error));
      figma.ui.postMessage({ type: 'import-result', ok: false, logs });
    }
  }

  if (msg.type === 'close-plugin') {
    figma.closePlugin();
  }
};

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
  const allVariablesByPath = new Map();
  const desiredTokenNamesByCollection = new Map();

  for (const [collectionName, collectionDef] of Object.entries(bundle.collections)) {
    const modeNames = Object.keys((collectionDef && collectionDef.modes) || {});
    if (modeNames.length === 0) continue;

    const collection = await getOrCreateCollection(collectionName, logs);
    await syncModes(collection, modeNames, logs);

    const firstModeName = modeNames[0];
    const firstModeTokens = collectionDef.modes[firstModeName] || {};
    desiredTokenNamesByCollection.set(collectionName, new Set(Object.keys(firstModeTokens)));
    pushLog(logs, 'info', `Importing base values for "${collectionName}".`);

    for (const [tokenName, tokenValue] of Object.entries(firstModeTokens)) {
      if (isAlias(tokenValue)) continue;

      const resolvedType = inferVariableType(tokenValue);
      if (!resolvedType) {
        pushLog(logs, 'warn', `Skipped unsupported token "${collectionName}/${tokenName}".`);
        continue;
      }

      const variable = await getOrCreateVariable(collection, tokenName, resolvedType, logs);
      const modeMap = getModeNameToId(collection);

      for (const [modeName, modeTokens] of Object.entries(collectionDef.modes)) {
        const modeId = modeMap.get(modeName);
        if (!modeId) continue;
        const value = modeTokens[tokenName];
        if (value === undefined || isAlias(value)) continue;
        variable.setValueForMode(modeId, normalizeValue(resolvedType, value));
      }

      allVariablesByPath.set(`${collectionName}/${tokenName}`, variable);
    }
  }

  for (const [collectionName, collectionDef] of Object.entries(bundle.collections)) {
    const modeNames = Object.keys((collectionDef && collectionDef.modes) || {});
    if (modeNames.length === 0) continue;

    const collection = await getOrCreateCollection(collectionName, logs);
    const firstModeTokens = collectionDef.modes[modeNames[0]] || {};
    pushLog(logs, 'info', `Resolving aliases for "${collectionName}".`);

    for (const [tokenName, tokenValue] of Object.entries(firstModeTokens)) {
      if (!isAlias(tokenValue)) continue;

      const variableTargetPath = parseAliasPath(bundle, collectionName, tokenValue);
      const target = allVariablesByPath.get(variableTargetPath);

      if (!target) {
        pushLog(logs, 'error', `Alias target not found for "${collectionName}/${tokenName}" -> "${tokenValue}"`);
        continue;
      }

      const variable = await getOrCreateVariable(collection, tokenName, target.resolvedType, logs);
      const modeMap = getModeNameToId(collection);

      for (const [modeName, modeTokens] of Object.entries(collectionDef.modes)) {
        const modeId = modeMap.get(modeName);
        if (!modeId) continue;

        const rawValue = modeTokens[tokenName];
        if (!isAlias(rawValue)) continue;

        const modeAliasPath = parseAliasPath(bundle, collectionName, rawValue);
        const modeTarget = allVariablesByPath.get(modeAliasPath);
        if (!modeTarget) {
          pushLog(logs, 'error', `Alias target not found for "${collectionName}/${tokenName}" in mode "${modeName}" -> "${rawValue}"`);
          continue;
        }

        variable.setValueForMode(modeId, figma.variables.createVariableAlias(modeTarget));
      }

      allVariablesByPath.set(`${collectionName}/${tokenName}`, variable);
    }
  }

  if (options.removeStaleVariables) {
    for (const [collectionName, desiredNames] of desiredTokenNamesByCollection.entries()) {
      const collection = await getOrCreateCollection(collectionName, logs);
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

async function syncModes(collection, desiredModeNames, logs) {
  if (desiredModeNames.length > 0 && collection.modes.length > 0 && collection.modes[0].name !== desiredModeNames[0]) {
    collection.renameMode(collection.modes[0].modeId, desiredModeNames[0]);
  }
  const refreshedNames = collection.modes.map((m) => m.name);
  for (const modeName of desiredModeNames) {
    if (!refreshedNames.includes(modeName)) collection.addMode(modeName);
  }
}

function getModeNameToId(collection) {
  const map = new Map();
  for (const mode of collection.modes) map.set(mode.name, mode.modeId);
  return map;
}

async function getOrCreateVariable(collection, name, type, logs) {
  const localVariables = await figma.variables.getLocalVariablesAsync(type);
  const existing = localVariables.find((v) => v.variableCollectionId === collection.id && v.name === name);
  if (existing) return existing;
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

function inferVariableType(value) {
  if (typeof value === 'number') return 'FLOAT';
  if (typeof value === 'boolean') return 'BOOLEAN';
  if (typeof value === 'string') {
    if (isColor(value)) return 'COLOR';
    return 'STRING';
  }
  return null;
}

function normalizeValue(type, value) {
  if (type === 'COLOR') return hexToRgba(value);
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
  return typeof value === 'string' && /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value.trim());
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
