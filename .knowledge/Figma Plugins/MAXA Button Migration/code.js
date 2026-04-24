figma.showUI(__html__, { width: 900, height: 920 });

const PREVIEW_PLUGIN_KEY = 'maxa-button-migration-preview';
const PREVIEW_TOKEN_COLORS = {
  'Button/primary/bg': { r: 2 / 255, g: 101 / 255, b: 220 / 255 },
  'Button/primary/bg-hover': { r: 0 / 255, g: 84 / 255, b: 182 / 255 },
  'Button/primary/bg-active': { r: 0 / 255, g: 64 / 255, b: 138 / 255 },
  'Button/primary/text': { r: 1, g: 1, b: 1 },
  'Button/primary/border': { r: 2 / 255, g: 101 / 255, b: 220 / 255 },
  'Button/primary/border-hover': { r: 0 / 255, g: 84 / 255, b: 182 / 255 },
  'Button/primary/border-focus': { r: 2 / 255, g: 101 / 255, b: 220 / 255 },
  'Button/secondary/bg': { r: 228 / 255, g: 228 / 255, b: 228 / 255 },
  'Button/secondary/bg-hover': { r: 215 / 255, g: 213 / 255, b: 213 / 255 },
  'Button/secondary/bg-active': { r: 161 / 255, g: 161 / 255, b: 164 / 255 },
  'Button/secondary/text': { r: 27 / 255, g: 26 / 255, b: 26 / 255 },
  'Button/secondary/border': { r: 228 / 255, g: 228 / 255, b: 228 / 255 },
  'Button/secondary/border-hover': { r: 215 / 255, g: 213 / 255, b: 213 / 255 },
  'Button/secondary/border-focus': { r: 2 / 255, g: 101 / 255, b: 220 / 255 },
  'Button/outline/bg': { r: 252 / 255, g: 252 / 255, b: 252 / 255 },
  'Button/outline/bg-hover': { r: 233 / 255, g: 234 / 255, b: 239 / 255 },
  'Button/outline/bg-active': { r: 228 / 255, g: 228 / 255, b: 228 / 255 },
  'Button/outline/text': { r: 27 / 255, g: 26 / 255, b: 26 / 255 },
  'Button/outline/border': { r: 228 / 255, g: 228 / 255, b: 228 / 255 },
  'Button/outline/border-hover': { r: 215 / 255, g: 213 / 255, b: 213 / 255 },
  'Button/outline/border-focus': { r: 2 / 255, g: 101 / 255, b: 220 / 255 },
  'Button/ghost/bg': { r: 1, g: 1, b: 1, a: 0 },
  'Button/ghost/bg-hover': { r: 233 / 255, g: 234 / 255, b: 239 / 255 },
  'Button/ghost/bg-active': { r: 228 / 255, g: 228 / 255, b: 228 / 255 },
  'Button/ghost/text': { r: 68 / 255, g: 68 / 255, b: 69 / 255 },
  'Button/ghost/border': { r: 1, g: 1, b: 1, a: 0 },
  'Button/ghost/border-hover': { r: 1, g: 1, b: 1, a: 0 },
  'Button/ghost/border-focus': { r: 2 / 255, g: 101 / 255, b: 220 / 255 },
  'Button/link/bg': { r: 1, g: 1, b: 1, a: 0 },
  'Button/link/bg-hover': { r: 1, g: 1, b: 1, a: 0 },
  'Button/link/bg-active': { r: 1, g: 1, b: 1, a: 0 },
  'Button/link/text': { r: 2 / 255, g: 101 / 255, b: 220 / 255 },
  'Button/link/text-hover': { r: 0 / 255, g: 84 / 255, b: 182 / 255 },
  'Button/link/text-active': { r: 0 / 255, g: 64 / 255, b: 138 / 255 },
  'Button/link/border': { r: 1, g: 1, b: 1, a: 0 },
  'Button/link/border-hover': { r: 1, g: 1, b: 1, a: 0 },
  'Button/link/border-focus': { r: 2 / 255, g: 101 / 255, b: 220 / 255 },
  'Button/danger/bg': { r: 239 / 255, g: 68 / 255, b: 68 / 255 },
  'Button/danger/bg-hover': { r: 220 / 255, g: 38 / 255, b: 38 / 255 },
  'Button/danger/bg-active': { r: 185 / 255, g: 28 / 255, b: 28 / 255 },
  'Button/danger/text': { r: 1, g: 1, b: 1 },
  'Button/danger/border': { r: 239 / 255, g: 68 / 255, b: 68 / 255 },
  'Button/danger/border-hover': { r: 220 / 255, g: 38 / 255, b: 38 / 255 },
  'Button/danger/border-focus': { r: 2 / 255, g: 101 / 255, b: 220 / 255 },
};

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'analyze-selection') {
    try {
      const result = await analyzeSelection(msg.options || {});
      figma.ui.postMessage({ type: 'analysis-result', ok: true, result });
    } catch (error) {
      figma.ui.postMessage({
        type: 'analysis-result',
        ok: false,
        error: error && error.message ? error.message : String(error),
      });
    }
  }

  if (msg.type === 'apply-mapping') {
    try {
      const result = await applyMapping(msg.options || {}, msg.selectionMap || {});
      figma.ui.postMessage({
        type: 'apply-result',
        ok: true,
        result: result,
      });
    } catch (error) {
      figma.ui.postMessage({
        type: 'apply-result',
        ok: false,
        error: error && error.message ? error.message : String(error),
      });
    }
  }

  if (msg.type === 'close-plugin') {
    figma.closePlugin();
  }

  if (msg.type === 'resize-ui') {
    const width = clampNumber(msg.width, 620, 1280, 900);
    const height = clampNumber(msg.height, 700, 1200, 920);
    figma.ui.resize(width, height);
  }

  if (msg.type === 'preview-canvas') {
    try {
      const result = await analyzeSelection(msg.options || {});
      const preview = await createCanvasPreview(result, msg.selectionMap || {});
      figma.ui.postMessage({
        type: 'preview-result',
        ok: true,
        result: preview,
      });
    } catch (error) {
      figma.ui.postMessage({
        type: 'preview-result',
        ok: false,
        error: error && error.message ? error.message : String(error),
      });
    }
  }
};

async function analyzeSelection(options) {
  const selection = figma.currentPage.selection || [];
  if (!selection.length) {
    throw new Error('Nothing selected. Select one or more Button components or component sets.');
  }

  const targets = collectTargets(selection);
  if (!targets.length) {
    throw new Error('No supported targets found. Select COMPONENT or COMPONENT_SET nodes.');
  }

  const analyses = [];
  const flatComponentAnalyses = [];

  for (const target of targets) {
    if (target.type === 'COMPONENT_SET') {
      analyses.push(analyzeComponentSet(target, options));
      for (const child of (target.children || [])) {
        if (child.type === 'COMPONENT') {
          flatComponentAnalyses.push(analyzeComponent(child, options));
        }
      }
      continue;
    }
    const componentAnalysis = analyzeComponent(target, options);
    analyses.push(componentAnalysis);
    flatComponentAnalyses.push(componentAnalysis);
  }

  const libraryResolution = await resolveLibraryTokensForAnalyses(flatComponentAnalyses);

  return {
    selectionCount: selection.length,
    targetCount: targets.length,
    targetFamily: options.targetFamily || 'auto-detect',
    libraryResolution,
    analyses,
    flatComponentAnalyses,
  };
}

function collectTargets(nodes) {
  const results = [];
  for (const node of nodes) {
    if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
      results.push(node);
    }
  }
  return results;
}

function analyzeComponentSet(componentSet, options) {
  const variants = componentSet.children.filter((child) => child.type === 'COMPONENT');
  const variantAnalyses = variants.map((variant) => analyzeComponent(variant, options));
  const familyVotes = tallyVotes(variantAnalyses.map((item) => item.familyCandidate).filter(Boolean));
  const confidenceVotes = tallyVotes(variantAnalyses.map((item) => item.confidence).filter(Boolean));
  const sizeVotes = tallyVotes(variantAnalyses.map((item) => item.sizeCandidate).filter((value) => value && value !== 'unknown'));
  const stateVotes = tallyVotes(variantAnalyses.map((item) => item.stateCandidate).filter(Boolean));
  const variantVotes = tallyVotes(variantAnalyses.map((item) => item.variantCandidate).filter((value) => value && value !== 'unknown'));
  const lowConfidenceVariants = variantAnalyses.filter((item) => item.confidence === 'low');

  return {
    kind: 'COMPONENT_SET',
    id: componentSet.id,
    name: componentSet.name,
    familyCandidate: options.targetFamily && options.targetFamily !== 'auto-detect' ? options.targetFamily : getTopVote(familyVotes) || 'unknown',
    confidence: getTopVote(confidenceVotes) || 'low',
    childCount: variants.length,
    warnings: collectSetWarnings(variantAnalyses),
    summary: {
      families: votesToSummary(familyVotes),
      variants: votesToSummary(variantVotes),
      sizes: votesToSummary(sizeVotes),
      states: votesToSummary(stateVotes),
      confidence: votesToSummary(confidenceVotes),
      lowConfidenceCount: lowConfidenceVariants.length,
    },
    sampleVariants: variantAnalyses.slice(0, 8),
    lowConfidenceSamples: lowConfidenceVariants.slice(0, 8),
  };
}

function analyzeComponent(component, options) {
  const parsedProperties = parseVariantProperties(component.name);
  const textLayers = findNodes(component, (node) => node.type === 'TEXT' && isVisibleNode(node));
  const visibleTextLayers = textLayers.filter((node) => normalizeText(node.characters || '').length > 0);
  const iconCandidates = findIconCandidates(component);
  const surfaceLayer = detectSurfaceLayer(component);
  const borderLayer = detectBorderLayer(component, surfaceLayer);
  const sizeCandidate = detectSize(component, parsedProperties);
  const stateCandidate = detectState(component.name, parsedProperties);
  const familyCandidate = detectFamily(component, visibleTextLayers, iconCandidates, parsedProperties, options);
  const variantCandidate = detectVariant(component.name, surfaceLayer, parsedProperties);
  const legacyDependencies = detectLegacyDependencies(component, surfaceLayer, visibleTextLayers);
  const warnings = [];

  if (!surfaceLayer) warnings.push('No clear surface layer found.');
  if (familyCandidate !== 'Buttons/Icon button' && visibleTextLayers.length === 0) warnings.push('No clear label layer found.');
  if (visibleTextLayers.length > 1) warnings.push('Multiple text layers found.');
  if (iconCandidates.length > 2) warnings.push('Multiple icon candidates found.');
  if (!sizeCandidate) warnings.push('Size does not match sm, md, or lg.');
  if (familyCandidate === 'Buttons/Icon button' && visibleTextLayers.length > 0) warnings.push('Icon-only candidate still contains visible text.');

  const confidence = scoreConfidence({
    familyCandidate,
    surfaceLayer,
    visibleTextLayers,
    sizeCandidate,
    warnings,
  });
  const mappingPreview = buildMappingPreview({
    familyCandidate,
    variantCandidate,
    sizeCandidate: sizeCandidate || 'unknown',
    stateCandidate,
    surfaceLayer,
    borderLayer,
    labelLayer: visibleTextLayers[0] || null,
    leadingIconLayer: iconCandidates[0] || null,
    trailingIconLayer: iconCandidates[1] || null,
  });
  const currentPreview = buildCurrentVisualPreview(component, surfaceLayer, borderLayer, visibleTextLayers[0] || null, familyCandidate);
  const targetPreview = buildTargetVisualPreview(mappingPreview, currentPreview);

  return {
    kind: 'COMPONENT',
    id: component.id,
    name: component.name,
    parsedProperties,
    targetFamily: options.targetFamily || 'auto-detect',
    familyCandidate,
    variantCandidate,
    sizeCandidate: sizeCandidate || 'unknown',
    stateCandidate,
    confidence,
    anatomy: {
      surfaceLayer: surfaceLayer ? describeNode(surfaceLayer) : null,
      labelLayers: visibleTextLayers.map(describeNode),
      borderLayer: borderLayer ? describeNode(borderLayer) : null,
      leadingIconLayer: iconCandidates[0] ? describeNode(iconCandidates[0]) : null,
      trailingIconLayer: iconCandidates[1] ? describeNode(iconCandidates[1]) : null,
    },
    currentPreview,
    targetPreview,
    mappingPreview,
    legacyDependencies,
    warnings,
  };
}

function detectFamily(component, textLayers, iconCandidates, parsedProperties, options) {
  const manualTarget = normalizeTargetFamily(options.targetFamily);
  if (manualTarget) return manualTarget;

  const name = component.name.toLowerCase();
  const hasText = textLayers.length > 0;
  const isSquare = Math.abs(component.width - component.height) <= 4;
  const justIcon = isTruthyVariantValue(getVariantProperty(parsedProperties, ['just icon', 'icon only', 'icon-only']));

  if (name.includes('danger') || name.includes('destructive') || name.includes('error')) {
    return 'Buttons/Button destructive';
  }
  if (justIcon) {
    return 'Buttons/Icon button';
  }
  if (!hasText && isSquare) {
    return 'Buttons/Icon button';
  }
  if (hasText) {
    return 'Buttons/Button';
  }
  if (!hasText && iconCandidates.length === 1) {
    return 'Buttons/Icon button';
  }
  return 'unknown';
}

function detectVariant(name, surfaceLayer, parsedProperties) {
  const propertyVariant = normalizeVariant(getVariantProperty(parsedProperties, ['type', 'variant', 'style']));
  if (propertyVariant) return propertyVariant;

  const source = `${name} ${getPaintKeywords(surfaceLayer)}`.toLowerCase();
  if (source.includes('primary')) return 'primary';
  if (source.includes('secondary')) return 'secondary';
  if (source.includes('outline')) return 'outline';
  if (source.includes('ghost')) return 'ghost';
  if (source.includes('link')) return 'link';
  if (source.includes('danger') || source.includes('destructive') || source.includes('error')) return 'danger';
  if (source.includes('success') || source.includes('positive')) return 'success';
  return 'unknown';
}

function detectSize(component, parsedProperties) {
  const propertySize = normalizeSize(getVariantProperty(parsedProperties, ['size']));
  if (propertySize) return propertySize;

  const height = Math.round(component.height);
  if (height === 32) return 'sm';
  if (height === 40) return 'md';
  if (height === 48) return 'lg';
  return null;
}

function detectState(name, parsedProperties) {
  const propertyState = normalizeState(getVariantProperty(parsedProperties, ['state']));
  if (propertyState) return propertyState;

  const source = name.toLowerCase();
  if (source.includes('disabled')) return 'disabled';
  if (source.includes('loading')) return 'loading';
  if (source.includes('hover')) return 'hover';
  if (source.includes('active') || source.includes('pressed')) return 'active';
  if (source.includes('focus') || source.includes('focused')) return 'focus';
  return 'default';
}

function detectSurfaceLayer(component) {
  const candidates = [];
  if (isSurfaceCandidate(component)) {
    candidates.push({ node: component, depth: 0 });
  }
  collectSurfaceCandidates(component, 0, candidates);
  if (!candidates.length) return null;

  candidates.sort((a, b) => scoreSurfaceCandidate(b.node, component, b.depth) - scoreSurfaceCandidate(a.node, component, a.depth));
  return candidates[0].node || null;
}

function detectBorderLayer(component, surfaceLayer) {
  if (surfaceLayer && hasStrokes(surfaceLayer)) return surfaceLayer;
  const candidates = findNodes(component, (node) => node !== surfaceLayer && hasStrokes(node));
  return candidates[0] || null;
}

function detectLegacyDependencies(component, surfaceLayer, textLayers) {
  const nodes = [component, ...(surfaceLayer ? [surfaceLayer] : []), ...textLayers];
  const styleIds = new Set();
  let hasHardcodedPaints = false;
  let hasHardcodedStrokes = false;
  let hasHardcodedTextColor = false;

  for (const node of nodes) {
    if ('fillStyleId' in node && node.fillStyleId) styleIds.add(`fill:${node.fillStyleId}`);
    if ('strokeStyleId' in node && node.strokeStyleId) styleIds.add(`stroke:${node.strokeStyleId}`);
    if (node.type === 'TEXT' && node.textStyleId) styleIds.add(`text:${node.textStyleId}`);

    if ('fills' in node && Array.isArray(node.fills) && node.fills.some(isSolidPaint)) {
      if (!hasBoundVariable(node, 'fills') && !('fillStyleId' in node && node.fillStyleId)) hasHardcodedPaints = true;
    }
    if ('strokes' in node && Array.isArray(node.strokes) && node.strokes.some(isSolidPaint)) {
      if (!hasBoundVariable(node, 'strokes') && !('strokeStyleId' in node && node.strokeStyleId)) hasHardcodedStrokes = true;
    }
    if (node.type === 'TEXT' && Array.isArray(node.fills) && node.fills.some(isSolidPaint)) {
      if (!hasBoundVariable(node, 'fills') && !node.textStyleId) hasHardcodedTextColor = true;
    }
  }

  return {
    localStyles: Array.from(styleIds),
    hasHardcodedPaints,
    hasHardcodedStrokes,
    hasHardcodedTextColor,
  };
}

function scoreConfidence(input) {
  let score = 0;
  if (input.familyCandidate !== 'unknown') score += 1;
  if (input.surfaceLayer) score += 1;
  if (input.familyCandidate === 'Buttons/Icon button' || input.visibleTextLayers.length === 1) score += 1;
  if (input.sizeCandidate) score += 1;
  score -= Math.min(input.warnings.length, 2);

  if (score >= 4) return 'high';
  if (score >= 2) return 'medium';
  return 'low';
}

function collectSetWarnings(variantAnalyses) {
  const warnings = [];
  if (!variantAnalyses.length) warnings.push('Component set has no component variants.');
  const lowConfidenceCount = variantAnalyses.filter((item) => item.confidence === 'low').length;
  if (lowConfidenceCount) warnings.push(`${lowConfidenceCount} variant(s) analyzed with low confidence.`);
  const unknownSizeCount = variantAnalyses.filter((item) => item.sizeCandidate === 'unknown').length;
  if (unknownSizeCount) warnings.push(`${unknownSizeCount} variant(s) still have unknown size mapping.`);
  return warnings;
}

function tallyVotes(values) {
  const map = new Map();
  for (const value of values) {
    map.set(value, (map.get(value) || 0) + 1);
  }
  return map;
}

function getTopVote(voteMap) {
  let topKey = null;
  let topValue = -1;
  for (const [key, value] of voteMap.entries()) {
    if (value > topValue) {
      topKey = key;
      topValue = value;
    }
  }
  return topKey;
}

function findNearestInstanceAncestor(node, stopAtId) {
  let current = node;
  while (current && current.id !== stopAtId) {
    if (current.type === 'INSTANCE') return current;
    current = current.parent;
  }
  return null;
}

function findFirstColoredDescendant(node) {
  if (!('children' in node) || !Array.isArray(node.children)) return null;
  for (const child of node.children) {
    if (hasFills(child)) return child;
    const nested = findFirstColoredDescendant(child);
    if (nested) return nested;
  }
  return null;
}

function findIconCandidates(root) {
  const results = [];
  if ('children' in root && Array.isArray(root.children)) {
    for (const child of root.children) {
      collectIconsShallow(child, results);
    }
  }
  return results;
}

function collectIconsShallow(node, results) {
  if (!isVisibleNode(node)) return;
  if (isLikelyIconNode(node)) {
    results.push(node);
    return;
  }
  if (node.type === 'INSTANCE') return;
  if ('children' in node && Array.isArray(node.children)) {
    for (const child of node.children) {
      collectIconsShallow(child, results);
    }
  }
}

function findNodes(root, predicate) {
  const results = [];
  walk(root, (node) => {
    if (node !== root && predicate(node)) results.push(node);
  });
  return results;
}

function walk(node, visitor) {
  visitor(node);
  if ('children' in node && Array.isArray(node.children)) {
    for (const child of node.children) walk(child, visitor);
  }
}

function collectSurfaceCandidates(node, depth, results) {
  if ('children' in node && Array.isArray(node.children)) {
    for (const child of node.children) {
      if (isVisibleNode(child) && isSurfaceCandidate(child)) {
        results.push({ node: child, depth: depth + 1 });
      }
      collectSurfaceCandidates(child, depth + 1, results);
    }
  }
}

function isVisibleNode(node) {
  return node.visible !== false;
}

function hasVisualSurface(node) {
  return hasFills(node) || hasStrokes(node);
}

function isSurfaceCandidate(node) {
  if (!node || node.type === 'TEXT') return false;
  if (isLikelyIconNode(node)) return false;
  return hasVisualSurface(node);
}

function scoreSurfaceCandidate(node, component, depth) {
  let score = 0;
  const componentArea = Math.max(component.width * component.height, 1);
  const nodeArea = Math.max(node.width * node.height, 1);
  const areaRatio = nodeArea / componentArea;

  if (node.type === 'COMPONENT') score += 4;
  if (node.type === 'FRAME') score += 5;
  if (node.type === 'INSTANCE') score += 4;
  if (node.type === 'RECTANGLE') score += 3;
  if (node.type === 'GROUP') score += 1;

  if (areaRatio >= 0.6 && areaRatio <= 1.15) score += 5;
  else if (areaRatio >= 0.35) score += 3;
  else if (areaRatio >= 0.2) score += 1;

  if (hasFills(node)) score += 2;
  if (hasStrokes(node)) score += 1;

  score -= depth * 0.35;

  return score;
}

function hasFills(node) {
  return 'fills' in node && Array.isArray(node.fills) && node.fills.some(isVisiblePaint);
}

function hasStrokes(node) {
  return 'strokes' in node && Array.isArray(node.strokes) && node.strokes.some(isVisiblePaint) && ('strokeWeight' in node ? node.strokeWeight > 0 : true);
}

function isVisiblePaint(paint) {
  return paint && paint.visible !== false && paint.opacity !== 0;
}

function isSolidPaint(paint) {
  return paint && paint.type === 'SOLID' && paint.visible !== false && paint.opacity !== 0;
}

function hasBoundVariable(node, key) {
  return Boolean(node.boundVariables && node.boundVariables[key]);
}

function isLikelyIconNode(node) {
  if (!isVisibleNode(node)) return false;
  if (node.type === 'INSTANCE' || node.type === 'VECTOR' || node.type === 'BOOLEAN_OPERATION' || node.type === 'ELLIPSE' || node.type === 'POLYGON' || node.type === 'STAR' || node.type === 'LINE') {
    return node.width <= 32 && node.height <= 32;
  }
  if ((node.type === 'FRAME' || node.type === 'GROUP') && node.width <= 32 && node.height <= 32) {
    const textChildren = 'children' in node ? node.children.filter((child) => child.type === 'TEXT') : [];
    return textChildren.length === 0;
  }
  return false;
}

function describeNode(node) {
  return {
    id: node.id,
    name: node.name,
    type: node.type,
  };
}

function getNodeFillColor(node) {
  if (!node || !('fills' in node) || !Array.isArray(node.fills)) return null;
  for (const paint of node.fills) {
    if (paint && paint.type === 'SOLID' && paint.visible !== false && paint.color) {
      return {
        r: paint.color.r,
        g: paint.color.g,
        b: paint.color.b,
        a: paint.opacity === undefined ? 1 : paint.opacity,
      };
    }
  }
  return null;
}

function getNodeStrokeColor(node) {
  if (!node || !('strokes' in node) || !Array.isArray(node.strokes)) return null;
  for (const paint of node.strokes) {
    if (paint && paint.type === 'SOLID' && paint.visible !== false && paint.color) {
      return {
        r: paint.color.r,
        g: paint.color.g,
        b: paint.color.b,
        a: paint.opacity === undefined ? 1 : paint.opacity,
      };
    }
  }
  return null;
}

function getNodeRadius(node) {
  if (!node) return 8;
  if (typeof node.cornerRadius === 'number') return Math.round(node.cornerRadius);
  if (typeof node.topLeftRadius === 'number') return Math.round(node.topLeftRadius);
  return 8;
}

function rgbaFromColor(color) {
  if (!color) return 'rgba(240, 240, 244, 1)';
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a === undefined ? 1 : color.a;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function normalizeText(text) {
  return String(text || '').trim();
}

function parseVariantProperties(name) {
  const properties = {};
  const source = String(name || '');
  const parts = source.split(',');

  for (const part of parts) {
    const trimmed = part.trim();
    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;
    const rawKey = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    if (!rawKey) continue;
    properties[normalizePropertyKey(rawKey)] = rawValue;
  }

  return properties;
}

function normalizePropertyKey(key) {
  return String(key || '')
    .toLowerCase()
    .replace(/^[^a-z]+/i, '')
    .replace(/[^a-z\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getVariantProperty(map, keys) {
  for (const key of keys) {
    const normalizedKey = normalizePropertyKey(key);
    if (normalizedKey in map) return map[normalizedKey];
  }
  return '';
}

function normalizeVariant(value) {
  const source = String(value || '').toLowerCase();
  if (!source) return '';
  if (source.includes('primary')) return 'primary';
  if (source.includes('secondary')) return 'secondary';
  if (source.includes('outline')) return 'outline';
  if (source.includes('ghost')) return 'ghost';
  if (source.includes('link')) return 'link';
  if (source.includes('danger') || source.includes('destructive') || source.includes('error')) return 'danger';
  if (source.includes('success') || source.includes('positive')) return 'success';
  return '';
}

function normalizeSize(value) {
  const source = String(value || '').toLowerCase();
  if (!source) return '';
  if (source === 's' || source.includes('small')) return 'sm';
  if (source === 'm' || source.includes('medium')) return 'md';
  if (source === 'l' || source.includes('large')) return 'lg';
  if (source.includes('sm')) return 'sm';
  if (source.includes('md')) return 'md';
  if (source.includes('lg')) return 'lg';
  return '';
}

function normalizeState(value) {
  const source = String(value || '').toLowerCase();
  if (!source) return '';
  if (source.includes('disabled')) return 'disabled';
  if (source.includes('loading')) return 'loading';
  if (source.includes('hover')) return 'hover';
  if (source.includes('active') || source.includes('pressed')) return 'active';
  if (source.includes('focus')) return 'focus';
  if (source.includes('default')) return 'default';
  return '';
}

function isTruthyVariantValue(value) {
  const source = String(value || '').toLowerCase().trim();
  return source === 'true' || source === 'yes';
}

function normalizeTargetFamily(value) {
  switch (String(value || '').toLowerCase()) {
    case 'primary':
    case 'secondary':
    case 'outline':
    case 'ghost':
    case 'link':
      return 'Buttons/Button';
    case 'destructive':
      return 'Buttons/Button destructive';
    case 'icon-button':
      return 'Buttons/Icon button';
    default:
      return '';
  }
}

function votesToSummary(voteMap) {
  return Array.from(voteMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => ({ key, count }));
}

function buildMappingPreview(input) {
  const variant = normalizePreviewVariant(input.familyCandidate, input.variantCandidate);
  const stateSuffix = getStateSuffix(input.stateCandidate);
  const size = input.sizeCandidate;
  const isIconFamily = input.familyCandidate === 'Buttons/Icon button';
  const result = {
    targetVariant: variant || 'unknown',
    targetState: input.stateCandidate || 'default',
    targetSize: size || 'unknown',
    assignments: [],
    notes: [],
  };

  if (!variant) {
    result.notes.push('Variant mapping is not available yet.');
    return result;
  }

  if (input.labelLayer) {
    result.assignments.push({
      id: 'label-text',
      role: 'label',
      sourceNode: describeNode(input.labelLayer),
      token: `Button/${variant}/text`,
    });
    result.assignments.push({
      id: 'label-font-family',
      role: 'font-family',
      sourceNode: describeNode(input.labelLayer),
      token: 'Button/font-family',
    });
  }

  result.assignments.push({
    id: 'surface-bg',
    role: 'surface',
    sourceNode: describeNode(input.surfaceLayer),
    token: `Button/${variant}/bg${stateSuffix}`,
  });

  if (input.borderLayer) {
    result.assignments.push({
      id: 'surface-border',
      role: 'border',
      sourceNode: describeNode(input.borderLayer),
      token: `Button/${variant}/border${stateSuffix === '-focus' ? '-focus' : stateSuffix}`,
    });
  } else {
    result.notes.push('No border layer detected.');
  }

  if (input.stateCandidate === 'disabled') {
    result.assignments.push({
      id: 'disabled-opacity',
      role: 'disabled',
      sourceNode: describeNode(input.surfaceLayer),
      token: 'Button/disabled/opacity',
    });
  }

  if (size && size !== 'unknown') {
    if (isIconFamily) {
      result.assignments.push({
        id: `size-${size}-icon-only`,
        role: 'size',
        sourceNode: describeNode(input.surfaceLayer),
        token: `Button/icon-only/${size}/size`,
      });
    } else {
      result.assignments.push({ id: `size-${size}-height`, role: 'height', sourceNode: describeNode(input.surfaceLayer), token: `Button/size/${size}/height` });
      result.assignments.push({ id: `size-${size}-padding-x`, role: 'padding-x', sourceNode: describeNode(input.surfaceLayer), token: `Button/size/${size}/padding-x` });
      result.assignments.push({ id: `size-${size}-gap`, role: 'gap', sourceNode: describeNode(input.surfaceLayer), token: `Button/size/${size}/gap` });
      result.assignments.push({ id: `size-${size}-radius`, role: 'radius', sourceNode: describeNode(input.surfaceLayer), token: `Button/size/${size}/radius` });
      if (input.labelLayer) {
        result.assignments.push({ id: `size-${size}-text`, role: 'text-size', sourceNode: describeNode(input.labelLayer), token: `Button/size/${size}/text` });
        result.assignments.push({ id: `size-${size}-line-height`, role: 'line-height', sourceNode: describeNode(input.labelLayer), token: `Button/size/${size}/line-height` });
        result.assignments.push({ id: `size-${size}-weight`, role: 'weight', sourceNode: describeNode(input.labelLayer), token: `Button/size/${size}/weight` });
      }
      if (input.leadingIconLayer || input.trailingIconLayer) {
        result.assignments.push({ id: `size-${size}-icon-size`, role: 'icon-size', sourceNode: describeNode(input.leadingIconLayer || input.trailingIconLayer), token: `Button/size/${size}/icon-size` });
      }
    }
  } else {
    result.notes.push('Size mapping is not available yet.');
  }

  if (input.leadingIconLayer || input.trailingIconLayer) {
    if (input.leadingIconLayer) {
      result.assignments.push({
        id: 'leading-icon-color',
        role: 'leading-icon',
        sourceNode: describeNode(input.leadingIconLayer),
        token: `Button/${variant}/text`,
      });
    }
    if (input.trailingIconLayer) {
      result.assignments.push({
        id: 'trailing-icon-color',
        role: 'trailing-icon',
        sourceNode: describeNode(input.trailingIconLayer),
        token: `Button/${variant}/text`,
      });
    }
    result.notes.push('Icon layers are detected and should use the same semantic foreground as the button label unless a dedicated icon token is introduced later.');
  }

  return result;
}

function buildCurrentVisualPreview(component, surfaceLayer, borderLayer, labelLayer, familyCandidate) {
  const label = labelLayer && normalizeText(labelLayer.characters || '')
    ? normalizeText(labelLayer.characters || '')
    : familyCandidate === 'Buttons/Icon button'
      ? 'Icon'
      : 'Button';
  const surfaceColor = getNodeFillColor(surfaceLayer || component) || { r: 0.95, g: 0.95, b: 0.97, a: 1 };
  const borderColor = getNodeStrokeColor(borderLayer || surfaceLayer || component) || { r: 0.85, g: 0.85, b: 0.88, a: 1 };
  const textColor = getNodeFillColor(labelLayer) || { r: 0.1, g: 0.1, b: 0.12, a: 1 };
  const radius = getNodeRadius(surfaceLayer || component);
  const height = Math.round(component.height);

  return {
    label,
    bg: rgbaFromColor(surfaceColor),
    border: rgbaFromColor(borderColor),
    text: rgbaFromColor(textColor),
    radius,
    height,
    opacity: component.opacity === undefined ? 1 : component.opacity,
    family: familyCandidate,
  };
}

function buildTargetVisualPreview(mappingPreview, currentPreview) {
  const surfaceAssignment = getAssignmentByRole(mappingPreview, 'surface');
  const labelAssignment = getAssignmentByRole(mappingPreview, 'label');
  const borderAssignment = getAssignmentByRole(mappingPreview, 'border');
  const disabledAssignment = getAssignmentByRole(mappingPreview, 'disabled');

  const surfaceColor = getPreviewTokenColor(surfaceAssignment ? surfaceAssignment.token : '');
  const labelColor = getPreviewTokenColor(labelAssignment ? labelAssignment.token : '');
  const borderColor = getPreviewTokenColor(borderAssignment ? borderAssignment.token : '');

  return {
    label: currentPreview.label,
    bg: rgbaFromColor(surfaceColor || { r: 0.92, g: 0.92, b: 0.94, a: 1 }),
    border: rgbaFromColor(borderColor || surfaceColor || { r: 0.84, g: 0.84, b: 0.88, a: 1 }),
    text: rgbaFromColor(labelColor || { r: 0.08, g: 0.08, b: 0.1, a: 1 }),
    radius: currentPreview.radius,
    height: currentPreview.height,
    opacity: disabledAssignment ? 0.5 : 1,
    family: currentPreview.family,
  };
}

function getAssignmentByRole(mappingPreview, role) {
  const assignments = mappingPreview && mappingPreview.assignments ? mappingPreview.assignments : [];
  for (const assignment of assignments) {
    if (assignment.role === role) return assignment;
  }
  return null;
}

function getPreviewTokenColor(token) {
  if (!token) return null;
  return PREVIEW_TOKEN_COLORS[token] || null;
}

async function resolveLibraryTokensForAnalyses(analyses) {
  const tokens = collectUniqueTargetTokens(analyses);
  const emptyResult = {
    available: false,
    collections: [],
    resolvedCount: 0,
    unresolvedCount: tokens.length,
    tokenMap: {},
    reason: '',
  };

  if (!tokens.length) {
    return {
      available: true,
      collections: [],
      resolvedCount: 0,
      unresolvedCount: 0,
      tokenMap: {},
      reason: '',
    };
  }

  try {
    const tokenMap = {};
    const remaining = new Set(tokens);
    const collections = [];

    if (figma.variables && typeof figma.variables.getLocalVariablesAsync === 'function') {
      const localVariables = await figma.variables.getLocalVariablesAsync();
      const localVariablesByNormalizedName = new Map();
      const localSampleNames = [];

      for (const variable of localVariables) {
        const normalizedName = normalizeLibraryTokenName(variable.name);
        if (!localVariablesByNormalizedName.has(normalizedName)) {
          localVariablesByNormalizedName.set(normalizedName, variable);
        }
        if (localSampleNames.length < 8) localSampleNames.push(variable.name);
      }

      collections.push({
        key: 'local-file',
        name: 'Current file variables',
        variableCount: localVariables.length,
        sampleNames: localSampleNames,
      });

      for (const token of Array.from(remaining)) {
        const variable = findMatchingLibraryVariable(token, localVariables, localVariablesByNormalizedName);
        if (!variable) continue;
        tokenMap[token] = {
          status: 'resolved',
          collectionName: 'Current file variables',
          collectionKey: 'local-file',
          variableName: variable.name,
          variableId: variable.id,
          variableKey: variable.key,
          resolvedType: variable.resolvedType,
          matchType: classifyLibraryMatch(token, variable.name),
          source: 'local',
        };
        remaining.delete(token);
      }
    }

    if (figma.teamLibrary && typeof figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync === 'function') {
      const libraryCollections = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
      for (const collection of libraryCollections) {
        let variables = [];
        let collectionError = null;
        try {
          variables = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(collection.key);
        } catch (error) {
          collectionError = error && error.message ? error.message : String(error);
        }

        const variablesByNormalizedName = new Map();
        const debugSampleNames = [];
        for (const variable of variables) {
          const normalizedName = normalizeLibraryTokenName(variable.name);
          if (!variablesByNormalizedName.has(normalizedName)) {
            variablesByNormalizedName.set(normalizedName, variable);
          }
          if (debugSampleNames.length < 8) debugSampleNames.push(variable.name);
        }

        collections.push({
          key: collection.key,
          name: collection.name,
          variableCount: variables.length,
          sampleNames: debugSampleNames,
          error: collectionError || undefined,
        });

        if (collectionError) continue;

        for (const token of Array.from(remaining)) {
          const variable = findMatchingLibraryVariable(token, variables, variablesByNormalizedName);
          if (!variable) continue;
          tokenMap[token] = {
            status: 'resolved',
            collectionName: collection.name,
            collectionKey: collection.key,
            variableName: variable.name,
            variableKey: variable.key,
            resolvedType: variable.resolvedType,
            matchType: classifyLibraryMatch(token, variable.name),
            source: 'library',
          };
          remaining.delete(token);
        }
        if (!remaining.size) break;
      }
    }

    for (const token of Array.from(remaining)) {
      tokenMap[token] = {
        status: 'missing',
      };
    }

    return {
      available: true,
      collections: collections,
      resolvedCount: tokens.length - remaining.size,
      unresolvedCount: remaining.size,
      tokenMap,
      reason: collections.length ? '' : 'No local or enabled library variable collections were found in this file.',
    };
  } catch (error) {
    emptyResult.reason = error && error.message ? error.message : String(error);
    return emptyResult;
  }
}

function collectUniqueTargetTokens(analyses) {
  const tokens = new Set();
  for (const analysis of analyses || []) {
    if (analysis.kind !== 'COMPONENT') continue;
    const assignments = analysis.mappingPreview && analysis.mappingPreview.assignments
      ? analysis.mappingPreview.assignments
      : [];
    for (const assignment of assignments) {
      if (assignment.token) tokens.add(assignment.token);
    }
  }
  return Array.from(tokens);
}

function normalizeLibraryTokenName(name) {
  return String(name || '')
    .trim()
    .replaceAll('\\', '/')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function classifyLibraryMatch(expectedToken, actualName) {
  const expected = normalizeLibraryTokenName(expectedToken);
  const actual = normalizeLibraryTokenName(actualName);
  if (expected === actual) return 'exact';
  if (actual.endsWith('/' + expected) || actual.endsWith(expected)) return 'suffix';
  return 'normalized';
}

function findMatchingLibraryVariable(expectedToken, variables, variablesByNormalizedName) {
  const normalizedExpected = normalizeLibraryTokenName(expectedToken);
  if (variablesByNormalizedName.has(normalizedExpected)) {
    return variablesByNormalizedName.get(normalizedExpected);
  }

  for (const variable of variables) {
    const normalizedActual = normalizeLibraryTokenName(variable.name);
    if (normalizedActual.endsWith('/' + normalizedExpected)) {
      return variable;
    }
    if (normalizedExpected.endsWith('/' + normalizedActual)) {
      return variable;
    }
  }

  return null;
}

async function createCanvasPreview(result, selectionMap) {
  const items = collectPreviewItems(result, selectionMap);
  if (!items.length) {
    throw new Error('No previewable Button components found. Select component variants or keep at least one mapping assignment checked.');
  }

  await ensurePreviewFonts();
  removeExistingPreviewFrames();

  const root = figma.createFrame();
  root.name = 'MAXA Migration Preview';
  root.setPluginData(PREVIEW_PLUGIN_KEY, 'true');
  root.layoutMode = 'VERTICAL';
  root.counterAxisSizingMode = 'AUTO';
  root.primaryAxisSizingMode = 'AUTO';
  root.itemSpacing = 20;
  root.paddingTop = 24;
  root.paddingRight = 24;
  root.paddingBottom = 24;
  root.paddingLeft = 24;
  root.cornerRadius = 16;
  root.fills = [solidPaint({ r: 0.98, g: 0.98, b: 0.99 })];
  root.strokes = [solidPaint({ r: 0.9, g: 0.9, b: 0.93 })];
  root.strokeWeight = 1;

  root.appendChild(createPreviewHeader(result, items.length));

  const grid = figma.createFrame();
  grid.name = 'Preview rows';
  grid.layoutMode = 'VERTICAL';
  grid.counterAxisSizingMode = 'AUTO';
  grid.primaryAxisSizingMode = 'AUTO';
  grid.itemSpacing = 16;
  grid.fills = [];
  root.appendChild(grid);

  const maxItems = 12;
  const visibleItems = items.slice(0, maxItems);
  for (const item of visibleItems) {
    grid.appendChild(createPreviewRow(item));
  }

  if (items.length > maxItems) {
    grid.appendChild(createNoteBlock(`Showing ${maxItems} of ${items.length} previewable items to keep the canvas review manageable.`));
  }

  const viewportCenter = figma.viewport.center;
  root.x = viewportCenter.x - root.width / 2;
  root.y = viewportCenter.y - root.height / 2;
  figma.currentPage.appendChild(root);
  figma.currentPage.selection = [root];
  figma.viewport.scrollAndZoomIntoView([root]);

  return {
    frameId: root.id,
    itemCount: visibleItems.length,
    omittedCount: Math.max(items.length - visibleItems.length, 0),
    frameName: root.name,
  };
}

function collectPreviewItems(result, selectionMap) {
  const sourceNodes = new Map();
  for (const node of figma.currentPage.selection || []) {
    collectComponentNodes(node, sourceNodes);
  }

  const items = [];
  const flatAnalyses = result.flatComponentAnalyses
    || (result.analyses || []).filter((a) => a.kind === 'COMPONENT');

  for (const analysis of flatAnalyses) {
    if (analysis.kind !== 'COMPONENT') continue;
    const sourceNode = sourceNodes.get(analysis.id);
    if (!sourceNode || sourceNode.type !== 'COMPONENT') continue;
    const previewAssignments = analysis.mappingPreview && analysis.mappingPreview.assignments
      ? analysis.mappingPreview.assignments
      : [];
    const selectedAssignments = previewAssignments.filter((assignment) => {
      const componentSelection = selectionMap && selectionMap[analysis.id]
        ? selectionMap[analysis.id]
        : null;
      if (!componentSelection) return true;
      return componentSelection[assignment.id] !== false;
    });
    if (!selectedAssignments.length) continue;
    items.push({
      analysis,
      sourceNode,
      selectedAssignments,
    });
  }

  return items;
}

function collectComponentNodes(node, results) {
  if (node.type === 'COMPONENT') {
    results.set(node.id, node);
    return;
  }
  if (node.type === 'COMPONENT_SET') {
    for (const child of node.children) {
      if (child.type === 'COMPONENT') results.set(child.id, child);
    }
  }
}

async function applyMapping(options, selectionMap) {
  const analysisResult = await analyzeSelection(options || {});
  const sourceNodes = new Map();
  for (const node of figma.currentPage.selection || []) {
    collectComponentNodes(node, sourceNodes);
  }

  let appliedComponents = 0;
  let appliedAssignments = 0;
  let importedLibraryVariables = 0;
  const missingTokens = new Set();
  const bindingErrors = [];

  const componentAnalyses = analysisResult.flatComponentAnalyses
    || (analysisResult.analyses || []).filter((a) => a.kind === 'COMPONENT');

  for (const analysis of componentAnalyses) {
    if (analysis.kind !== 'COMPONENT') continue;
    const sourceNode = sourceNodes.get(analysis.id);
    if (!sourceNode || sourceNode.type !== 'COMPONENT') continue;

    const allAssignments = analysis.mappingPreview && analysis.mappingPreview.assignments
      ? analysis.mappingPreview.assignments
      : [];
    const selectedAssignments = allAssignments.filter((assignment) => {
      const componentSelection = selectionMap && selectionMap[analysis.id]
        ? selectionMap[analysis.id]
        : null;
      if (!componentSelection) return true;
      return componentSelection[assignment.id] !== false;
    });

    if (!selectedAssignments.length) continue;

    const counters = {
      importedLibraryVariables: 0,
      missingTokens: missingTokens,
      bindingErrors: bindingErrors,
    };
    const changedCount = await applyAssignmentsToNode(sourceNode, analysis, selectedAssignments, analysisResult.libraryResolution, counters);
    if (changedCount > 0) {
      appliedComponents += 1;
      appliedAssignments += changedCount;
      importedLibraryVariables += counters.importedLibraryVariables;
    }
  }

  if (!appliedAssignments) {
    const missingList = Array.from(missingTokens);
    const details = missingList.length
      ? ` Missing external tokens: ${missingList.slice(0, 10).join(', ')}${missingList.length > 10 ? '…' : ''}.`
      : '';
    throw new Error(`Nothing was applied. External library variables could not be resolved or imported for the current selection.${details}`);
  }

  const missingList = Array.from(missingTokens);
  return {
    appliedComponents: appliedComponents,
    appliedAssignments: appliedAssignments,
    importedLibraryVariables: importedLibraryVariables,
    missingTokens: missingList,
    bindingErrors: bindingErrors,
  };
}

async function applyAssignmentsToNode(node, analysis, assignments, libraryResolution, counters) {
  const surface = detectSurfaceLayer(node);
  const border = detectBorderLayer(node, surface);
  const labels = findNodes(node, (candidate) => candidate.type === 'TEXT' && isVisibleNode(candidate));
  const icons = findIconCandidates(node);
  const labelNode = labels.length ? labels[0] : null;

  if (labelNode) {
    const needsTextClear = assignments.some((a) => a.role === 'text-size' || a.role === 'line-height');
    if (needsTextClear) {
      const hadStyle = 'textStyleId' in labelNode && !!labelNode.textStyleId;
      if (hadStyle && typeof labelNode.setTextStyleIdAsync === 'function') {
        // Preserve fontName so clearing the style doesn't lose family/weight
        const savedFontName = labelNode.fontName && labelNode.fontName !== figma.mixed
          ? labelNode.fontName
          : null;
        try {
          await labelNode.setTextStyleIdAsync('');
        } catch (e) {
          counters.bindingErrors && counters.bindingErrors.push(`textStyle clear FAILED: ${e && e.message ? e.message : String(e)}`);
        }
        if (savedFontName) {
          try { labelNode.fontName = savedFontName; } catch (e) {}
        }
      }
    }
  } else {
    counters.bindingErrors && counters.bindingErrors.push('labelNode is null');
  }

  let changedCount = 0;

  for (const assignment of assignments) {
    const variable = await resolveVariableForToken(assignment.token, libraryResolution, counters);
    if (!variable) {
      counters.missingTokens.add(assignment.token);
      continue;
    }

    const didApply = await applyAssignmentBinding({
      node: node,
      analysis: analysis,
      assignment: assignment,
      variable: variable,
      surface: surface,
      border: border,
      labelNode: labelNode,
      leadingIcon: icons.length ? icons[0] : null,
      trailingIcon: icons.length > 1 ? icons[1] : null,
      bindingErrors: counters.bindingErrors,
    });

    if (didApply) changedCount += 1;
  }

  return changedCount;
}

async function resolveVariableForToken(token, libraryResolution, counters) {
  const resolution = libraryResolution && libraryResolution.tokenMap
    ? libraryResolution.tokenMap[token]
    : null;

  if (resolution && resolution.status === 'resolved') {
    const importedVariable = await importResolvedVariable(resolution);
    if (importedVariable) {
      if (resolution.source === 'library') counters.importedLibraryVariables += 1;
      return importedVariable;
    }
  }

  return null;
}

async function importResolvedVariable(resolution) {
  try {
    if (resolution.source === 'local') {
      if (figma.variables && typeof figma.variables.getVariableByIdAsync === 'function' && resolution.variableId) {
        return await figma.variables.getVariableByIdAsync(resolution.variableId);
      }
      return null;
    }
    if (resolution.source === 'library' && figma.variables && typeof figma.variables.importVariableByKeyAsync === 'function' && resolution.variableKey) {
      return await figma.variables.importVariableByKeyAsync(resolution.variableKey);
    }
  } catch (error) {
    return null;
  }
  return null;
}

async function applyAssignmentBinding(input) {
  const role = input.assignment.role;
  if (role === 'surface') {
    return await bindPaintVariable(input.surface, input.variable);
  }
  if (role === 'border') {
    return await bindStrokeVariable(input.border || input.surface, input.variable);
  }
  if (role === 'label') {
    return await bindPaintVariable(input.labelNode, input.variable);
  }
  if (role === 'leading-icon' || role === 'trailing-icon') {
    const sourceId = input.assignment.sourceNode && input.assignment.sourceNode.id;
    const iconNode = sourceId ? await figma.getNodeByIdAsync(sourceId) : null;
    if (!iconNode) return false;
    const bindTarget = findNearestInstanceAncestor(iconNode, input.node.id) || iconNode;
    if (bindTarget.type === 'INSTANCE' && !hasFills(bindTarget)) {
      const coloredChild = findFirstColoredDescendant(bindTarget);
      return coloredChild ? await bindPaintVariable(coloredChild, input.variable) : await bindPaintVariable(bindTarget, input.variable);
    }
    return await bindPaintVariable(bindTarget, input.variable);
  }
  if (role === 'disabled') {
    return bindNodeField(input.surface || input.node, 'opacity', input.variable);
  }
  if (role === 'height') {
    return bindNodeField(input.surface || input.node, 'height', input.variable);
  }
  if (role === 'padding-x') {
    return bindHorizontalPadding(input.surface || input.node, input.variable);
  }
  if (role === 'gap') {
    return bindNodeField(input.surface || input.node, 'itemSpacing', input.variable);
  }
  if (role === 'radius') {
    return bindCornerRadius(input.surface || input.node, input.variable);
  }
  if (role === 'text-size') {
    return bindTextField(input.labelNode, 'fontSize', input.variable, input.bindingErrors);
  }
  if (role === 'line-height') {
    return bindLineHeight(input.labelNode, input.variable, input.bindingErrors);
  }
  if (role === 'font-family') {
    return bindFontFamily(input.labelNode, input.variable, input.bindingErrors);
  }
  if (role === 'weight') {
    return bindFontStyle(input.labelNode, input.variable, input.bindingErrors);
  }
  if (role === 'icon-size') {
    return bindIconSize(input.leadingIcon || input.trailingIcon, input.variable);
  }
  if (role === 'size') {
    return bindIconSize(input.surface || input.node, input.variable);
  }
  return false;
}

async function bindPaintVariable(node, variable) {
  if (!node || !variable || !figma.variables || typeof figma.variables.setBoundVariableForPaint !== 'function') return false;
  if (!('fills' in node)) return false;
  if (variable.resolvedType !== 'COLOR') return false;
  const currentFills = Array.isArray(node.fills) ? node.fills.slice() : [];
  const solidIndex = findFirstSolidPaintIndex(currentFills);
  if ('fillStyleId' in node && node.fillStyleId && typeof node.setFillStyleIdAsync === 'function') {
    try { await node.setFillStyleIdAsync(''); } catch (e) {}
  }
  const fallbackPaint = solidPaint({ r: 0.8, g: 0.8, b: 0.8 });
  const nextPaint = figma.variables.setBoundVariableForPaint(solidIndex === -1 ? fallbackPaint : currentFills[solidIndex], 'color', variable);
  if (solidIndex === -1) currentFills.push(nextPaint);
  else currentFills[solidIndex] = nextPaint;
  node.fills = currentFills;
  return true;
}

async function bindStrokeVariable(node, variable) {
  if (!node || !variable || !figma.variables || typeof figma.variables.setBoundVariableForPaint !== 'function') return false;
  if (!('strokes' in node)) return false;
  if (variable.resolvedType !== 'COLOR') return false;
  if ('strokeStyleId' in node && node.strokeStyleId && typeof node.setStrokeStyleIdAsync === 'function') {
    try { await node.setStrokeStyleIdAsync(''); } catch (e) {}
  }
  const currentStrokes = Array.isArray(node.strokes) ? node.strokes.slice() : [];
  const solidIndex = findFirstSolidPaintIndex(currentStrokes);
  const fallbackPaint = solidPaint({ r: 0.8, g: 0.8, b: 0.8 });
  const nextPaint = figma.variables.setBoundVariableForPaint(solidIndex === -1 ? fallbackPaint : currentStrokes[solidIndex], 'color', variable);
  if (solidIndex === -1) currentStrokes.push(nextPaint);
  else currentStrokes[solidIndex] = nextPaint;
  node.strokes = currentStrokes;
  if ('strokeWeight' in node && (!node.strokeWeight || node.strokeWeight < 1)) node.strokeWeight = 1;
  return true;
}

function bindNodeField(node, field, variable) {
  if (!node || !variable || typeof node.setBoundVariable !== 'function') return false;
  try {
    node.setBoundVariable(field, variable);
    return true;
  } catch (error) {
    return false;
  }
}

function bindLineHeight(node, variable, errors) {
  if (!node || !variable || typeof node.setBoundVariable !== 'function') {
    errors && errors.push(`bindLineHeight: no node or variable (node=${node ? node.type : 'null'})`);
    return false;
  }
  if (variable.resolvedType !== 'NUMBER' && variable.resolvedType !== 'FLOAT') {
    errors && errors.push(`bindLineHeight: expected NUMBER/FLOAT, got ${variable.resolvedType}`);
    return false;
  }
  // Figma won't bind a variable to lineHeight if unit is AUTO — normalize first
  try {
    if (node.lineHeight && node.lineHeight.unit === 'AUTO') {
      node.lineHeight = { unit: 'PIXELS', value: 20 };
    }
  } catch (e) {
    errors && errors.push(`bindLineHeight: normalizing lineHeight failed: ${e && e.message ? e.message : String(e)}`);
  }
  try {
    node.setBoundVariable('lineHeight', variable);
    return true;
  } catch (error) {
    errors && errors.push(`bindLineHeight: ${error && error.message ? error.message : String(error)}`);
    return false;
  }
}

function bindFontFamily(node, variable, errors) {
  if (!node || !variable || typeof node.setBoundVariable !== 'function') {
    errors && errors.push(`bindFontFamily: no node or variable`);
    return false;
  }
  if (variable.resolvedType !== 'STRING') {
    errors && errors.push(`bindFontFamily: expected STRING, got ${variable.resolvedType}`);
    return false;
  }
  try {
    node.setBoundVariable('fontFamily', variable);
    return true;
  } catch (error) {
    errors && errors.push(`bindFontFamily: ${error && error.message ? error.message : String(error)}`);
    return false;
  }
}

function bindFontStyle(node, variable, errors) {
  if (!node || !variable || typeof node.setBoundVariable !== 'function') {
    errors && errors.push(`bindFontStyle: no node or variable`);
    return false;
  }
  if (variable.resolvedType !== 'STRING') {
    errors && errors.push(`bindFontStyle: expected STRING, got ${variable.resolvedType}`);
    return false;
  }
  try {
    node.setBoundVariable('fontStyle', variable);
    return true;
  } catch (error) {
    errors && errors.push(`bindFontStyle: ${error && error.message ? error.message : String(error)}`);
    return false;
  }
}

function bindTextField(node, field, variable, errors) {
  if (!node || !variable || typeof node.setBoundVariable !== 'function') {
    errors && errors.push(`bindTextField(${field}): no node or variable (node=${node ? node.type : 'null'})`);
    return false;
  }
  if (variable.resolvedType === 'STRING') {
    errors && errors.push(`bindTextField(${field}): skipped STRING variable`);
    return false;
  }
  try {
    node.setBoundVariable(field, variable);
    return true;
  } catch (error) {
    errors && errors.push(`bindTextField(${field}): ${error && error.message ? error.message : String(error)}`);
    return false;
  }
}

function bindHorizontalPadding(node, variable) {
  if (!node || !variable || typeof node.setBoundVariable !== 'function') return false;
  let applied = false;
  try {
    node.setBoundVariable('paddingLeft', variable);
    applied = true;
  } catch (error) {}
  try {
    node.setBoundVariable('paddingRight', variable);
    applied = true;
  } catch (error) {}
  return applied;
}

function bindCornerRadius(node, variable) {
  if (!node || !variable || typeof node.setBoundVariable !== 'function') return false;
  let applied = false;
  const fields = ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'];
  for (const field of fields) {
    try {
      node.setBoundVariable(field, variable);
      applied = true;
    } catch (error) {}
  }
  return applied;
}

function bindIconSize(node, variable) {
  if (!node || !variable || typeof node.setBoundVariable !== 'function') return false;
  let applied = false;
  try {
    node.setBoundVariable('width', variable);
    applied = true;
  } catch (error) {}
  try {
    node.setBoundVariable('height', variable);
    applied = true;
  } catch (error) {}
  return applied;
}

function findFirstSolidPaintIndex(paints) {
  for (let index = 0; index < paints.length; index += 1) {
    if (paints[index] && paints[index].type === 'SOLID') return index;
  }
  return -1;
}

function createPreviewHeader(result, count) {
  const wrapper = figma.createFrame();
  wrapper.name = 'Header';
  wrapper.layoutMode = 'VERTICAL';
  wrapper.counterAxisSizingMode = 'AUTO';
  wrapper.primaryAxisSizingMode = 'AUTO';
  wrapper.itemSpacing = 8;
  wrapper.fills = [];

  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'Semi Bold' };
  title.characters = 'Button Migration Preview';
  title.fontSize = 24;
  title.fills = [solidPaint({ r: 0.07, g: 0.07, b: 0.09 })];
  wrapper.appendChild(title);

  const subtitle = figma.createText();
  subtitle.fontName = { family: 'Inter', style: 'Regular' };
  subtitle.characters = `Target family: ${result.targetFamily}. Showing ${count} preview item(s). Originals are untouched; the After column uses light-mode token approximations plus your checked mapping rows.`;
  subtitle.fontSize = 13;
  subtitle.lineHeight = { unit: 'PIXELS', value: 20 };
  subtitle.fills = [solidPaint({ r: 0.34, g: 0.34, b: 0.38 })];
  wrapper.appendChild(subtitle);

  return wrapper;
}

function createPreviewRow(item) {
  const row = figma.createFrame();
  row.name = item.analysis.name;
  row.layoutMode = 'HORIZONTAL';
  row.counterAxisSizingMode = 'AUTO';
  row.primaryAxisSizingMode = 'AUTO';
  row.itemSpacing = 16;
  row.paddingTop = 16;
  row.paddingRight = 16;
  row.paddingBottom = 16;
  row.paddingLeft = 16;
  row.cornerRadius = 12;
  row.fills = [solidPaint({ r: 1, g: 1, b: 1 })];
  row.strokes = [solidPaint({ r: 0.9, g: 0.9, b: 0.93 })];
  row.strokeWeight = 1;

  row.appendChild(createSideCard('Before', item.sourceNode.clone(), item.analysis));

  const afterClone = item.sourceNode.clone();
  applyAssignmentsToClone(afterClone, item.analysis, item.selectedAssignments);
  row.appendChild(createSideCard('After', afterClone, item.analysis, item.selectedAssignments));

  return row;
}

function createSideCard(titleText, previewNode, analysis, selectedAssignments) {
  const card = figma.createFrame();
  card.name = titleText;
  card.layoutMode = 'VERTICAL';
  card.counterAxisSizingMode = 'AUTO';
  card.primaryAxisSizingMode = 'AUTO';
  card.itemSpacing = 10;
  card.paddingTop = 12;
  card.paddingRight = 12;
  card.paddingBottom = 12;
  card.paddingLeft = 12;
  card.cornerRadius = 12;
  card.fills = [solidPaint({ r: 0.985, g: 0.985, b: 0.99 })];
  card.strokes = [solidPaint({ r: 0.92, g: 0.92, b: 0.95 })];
  card.strokeWeight = 1;

  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'Semi Bold' };
  title.characters = titleText;
  title.fontSize = 14;
  title.fills = [solidPaint({ r: 0.07, g: 0.07, b: 0.09 })];
  card.appendChild(title);

  const meta = figma.createText();
  meta.fontName = { family: 'Inter', style: 'Regular' };
  meta.characters = `${analysis.variantCandidate} • ${analysis.sizeCandidate} • ${analysis.stateCandidate}`;
  meta.fontSize = 12;
  meta.fills = [solidPaint({ r: 0.4, g: 0.4, b: 0.44 })];
  card.appendChild(meta);

  const canvas = figma.createFrame();
  canvas.name = `${titleText} canvas`;
  canvas.layoutMode = 'VERTICAL';
  canvas.counterAxisSizingMode = 'AUTO';
  canvas.primaryAxisSizingMode = 'AUTO';
  canvas.paddingTop = 20;
  canvas.paddingRight = 20;
  canvas.paddingBottom = 20;
  canvas.paddingLeft = 20;
  canvas.cornerRadius = 10;
  canvas.fills = [solidPaint({ r: 1, g: 1, b: 1 })];
  canvas.strokes = [solidPaint({ r: 0.95, g: 0.95, b: 0.97 })];
  canvas.strokeWeight = 1;
  previewNode.x = 0;
  previewNode.y = 0;
  canvas.appendChild(previewNode);
  card.appendChild(canvas);

  if (selectedAssignments && selectedAssignments.length) {
    const notes = figma.createText();
    notes.fontName = { family: 'Inter', style: 'Regular' };
    notes.characters = selectedAssignments.map((assignment) => `${assignment.role} -> ${assignment.token}`).join('\n');
    notes.fontSize = 11;
    notes.lineHeight = { unit: 'PIXELS', value: 16 };
    notes.fills = [solidPaint({ r: 0.42, g: 0.42, b: 0.47 })];
    card.appendChild(notes);
  }

  return card;
}

function createNoteBlock(text) {
  const note = figma.createText();
  note.fontName = { family: 'Inter', style: 'Regular' };
  note.characters = text;
  note.fontSize = 12;
  note.lineHeight = { unit: 'PIXELS', value: 18 };
  note.fills = [solidPaint({ r: 0.45, g: 0.45, b: 0.49 })];
  return note;
}

function applyAssignmentsToClone(clone, analysis, assignments) {
  const surface = detectSurfaceLayer(clone);
  const border = detectBorderLayer(clone, surface);
  const labels = findNodes(clone, (node) => node.type === 'TEXT' && isVisibleNode(node));
  const icons = findNodes(clone, isLikelyIconNode);

  for (const assignment of assignments) {
    if (assignment.role === 'surface' && surface) {
      setNodePaint(surface, PREVIEW_TOKEN_COLORS[assignment.token]);
    }
    if (assignment.role === 'border' && border) {
      setNodeStroke(border, PREVIEW_TOKEN_COLORS[assignment.token]);
    }
    if (assignment.role === 'label' && labels[0]) {
      setNodePaint(labels[0], PREVIEW_TOKEN_COLORS[assignment.token]);
    }
    if (assignment.role === 'leading-icon' && icons[0]) {
      setNodePaint(icons[0], PREVIEW_TOKEN_COLORS[assignment.token]);
    }
    if (assignment.role === 'trailing-icon' && icons[1]) {
      setNodePaint(icons[1], PREVIEW_TOKEN_COLORS[assignment.token]);
    }
    if (assignment.role === 'disabled' && surface) {
      surface.opacity = 0.5;
    }
  }

  if (analysis.stateCandidate === 'focus' && border) {
    border.effects = [
      {
        type: 'DROP_SHADOW',
        visible: true,
        blendMode: 'NORMAL',
        color: { r: 2 / 255, g: 101 / 255, b: 220 / 255, a: 0.2 },
        offset: { x: 0, y: 0 },
        radius: 0,
        spread: 4,
      },
    ];
  }
}

function setNodePaint(node, color) {
  if (!color || !('fills' in node)) return;
  node.fills = [solidPaint(color)];
}

function setNodeStroke(node, color) {
  if (!color || !('strokes' in node)) return;
  node.strokes = [solidPaint(color)];
  if ('strokeWeight' in node && (!node.strokeWeight || node.strokeWeight < 1)) {
    node.strokeWeight = 1;
  }
}

function solidPaint(color) {
  const paint = {
    type: 'SOLID',
    color: {
      r: color.r,
      g: color.g,
      b: color.b,
    },
    opacity: color.a === undefined ? 1 : color.a,
  };
  return paint;
}

function removeExistingPreviewFrames() {
  for (const node of figma.currentPage.children.slice()) {
    if ('getPluginData' in node && node.getPluginData(PREVIEW_PLUGIN_KEY) === 'true') {
      node.remove();
    }
  }
}

async function ensurePreviewFonts() {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
}

function normalizePreviewVariant(familyCandidate, variantCandidate) {
  if (familyCandidate === 'Buttons/Button destructive') return 'danger';
  if (variantCandidate && variantCandidate !== 'unknown') return variantCandidate;
  if (familyCandidate === 'Buttons/Icon button') return 'secondary';
  return '';
}

function getStateSuffix(state) {
  switch (state) {
    case 'hover':
      return '-hover';
    case 'active':
      return '-active';
    case 'focus':
      return '-focus';
    default:
      return '';
  }
}

function countSelectedAssignments(selectionMap) {
  let count = 0;
  for (const componentId of Object.keys(selectionMap || {})) {
    const assignmentMap = selectionMap[componentId] || {};
    for (const assignmentId of Object.keys(assignmentMap)) {
      if (assignmentMap[assignmentId]) count += 1;
    }
  }
  return count;
}

function clampNumber(value, min, max, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(min, Math.min(max, Math.round(numeric)));
}

function getPaintKeywords(node) {
  if (!node || !('fills' in node) || !Array.isArray(node.fills)) return '';
  const fills = node.fills.filter(isSolidPaint);
  if (!fills.length) return '';
  const colors = fills.map((paint) => rgbToKeyword(paint.color)).filter(Boolean);
  return colors.join(' ');
}

function rgbToKeyword(color) {
  if (!color) return '';
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  if (r > 180 && g < 120 && b < 120) return 'danger';
  if (b > 180 && r < 120) return 'primary';
  if (g > 150 && r < 160) return 'success';
  if (Math.abs(r - g) < 10 && Math.abs(g - b) < 10) return 'secondary';
  return '';
}
