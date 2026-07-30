import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import vm from "node:vm"

const source = await readFile(new URL("./code.js", import.meta.url), "utf8")
const repositoryBundle = JSON.parse(
  await readFile(new URL("../../../packages/tokens/figma/import-bundle.json", import.meta.url), "utf8"),
)

function loadPlugin() {
  const variables = []
  const collections = []
  let nextId = 1

  const figma = {
    showUI() {},
    ui: { onmessage: null, postMessage() {} },
    variables: {
      async getLocalVariableCollectionsAsync() { return collections },
      async getLocalVariablesAsync() { return variables },
      createVariableCollection(name) {
        const mode = { modeId: `mode-${nextId++}`, name: "Mode 1" }
        const collection = {
          id: `collection-${nextId++}`,
          name,
          modes: [mode],
          renameMode(modeId, modeName) {
            this.modes.find((item) => item.modeId === modeId).name = modeName
          },
          addMode(modeName) {
            this.modes.push({ modeId: `mode-${nextId++}`, name: modeName })
          },
        }
        collections.push(collection)
        return collection
      },
      createVariable(name, collection, resolvedType) {
        const variable = {
          id: `variable-${nextId++}`,
          name,
          variableCollectionId: collection.id,
          resolvedType,
          valuesByMode: {},
          description: "",
          setValueForMode(modeId, value) { this.valuesByMode[modeId] = value },
          remove() {
            const index = variables.indexOf(this)
            if (index !== -1) variables.splice(index, 1)
          },
        }
        variables.push(variable)
        return variable
      },
      createVariableAlias(target) { return { type: "VARIABLE_ALIAS", id: target.id } },
    },
  }

  const context = vm.createContext({ __html__: "", console, figma })
  vm.runInContext(`${source}\n;globalThis.__testExports = { validateBundle, validateExistingVariableState, importBundle };`, context)
  return { ...context.__testExports, variables, collections }
}

const validBundle = {
  aliasDefaults: { Primitives: "Primitives", "Component-based": "Primitives" },
  collections: {
    Primitives: {
      modes: { Value: { "Colors/Base/White": "#FFFFFF" } },
      types: { "Colors/Base/White": "COLOR" },
      scopes: { "Colors/Base/White": [] },
    },
    "Component-based": {
      modes: {
        Light: {
          "Forward/source": "{Component-based/Forward/target}",
          "Forward/target": "{Colors.Base.White}",
        },
        Dark: {
          "Forward/source": "{Component-based/Forward/target}",
          "Forward/target": "{Colors.Base.White}",
        },
      },
      types: { "Forward/source": "COLOR", "Forward/target": "COLOR" },
      scopes: { "Forward/source": ["ALL_FILLS"], "Forward/target": ["ALL_FILLS"] },
    },
  },
}

test("preflight accepts a typed bundle with resolvable aliases", () => {
  const { validateBundle } = loadPlugin()
  assert.doesNotThrow(() => validateBundle(validBundle))
})

test("preflight accepts the generated repository bundle", () => {
  const { validateBundle } = loadPlugin()
  const result = validateBundle(repositoryBundle)
  assert.ok(result.variableCount > 1000)
  assert.ok(result.aliasCount > 1000)
})

test("preflight rejects CSS expressions before import", () => {
  const { validateBundle } = loadPlugin()
  const invalid = structuredClone(validBundle)
  invalid.collections["Component-based"].modes.Light["Forward/source"] = "var(--input-bg)"
  assert.throws(() => validateBundle(invalid), /CSS expression/)
})

test("preflight rejects missing alias targets", () => {
  const { validateBundle } = loadPlugin()
  const invalid = structuredClone(validBundle)
  invalid.collections["Component-based"].modes.Light["Forward/source"] = "{Component-based/Missing/token}"
  assert.throws(() => validateBundle(invalid), /Alias target not found/)
})

test("preflight rejects mode token drift and missing explicit types", () => {
  const { validateBundle } = loadPlugin()
  const drift = structuredClone(validBundle)
  delete drift.collections["Component-based"].modes.Dark["Forward/source"]
  assert.throws(() => validateBundle(drift), /different token set/)

  const untyped = structuredClone(validBundle)
  delete untyped.collections["Component-based"].types["Forward/source"]
  assert.throws(() => validateBundle(untyped), /Missing resolved type/)
})

test("import creates forward alias variables before assigning their values", async () => {
  const { validateBundle, importBundle, variables, collections } = loadPlugin()
  validateBundle(validBundle)
  await importBundle(validBundle, [])

  const componentCollection = collections.find((item) => item.name === "Component-based")
  const lightMode = componentCollection.modes.find((item) => item.name === "Light")
  const source = variables.find((item) => item.name === "Forward/source")
  const target = variables.find((item) => item.name === "Forward/target")

  assert.equal(source.resolvedType, "COLOR")
  assert.equal(JSON.stringify(source.scopes), JSON.stringify(["ALL_FILLS"]))
  assert.deepEqual(source.valuesByMode[lightMode.modeId], { type: "VARIABLE_ALIAS", id: target.id })
})

test("existing-state preflight rejects wrong types before import unless recreation is explicit", async () => {
  const { validateBundle, validateExistingVariableState, importBundle, variables } = loadPlugin()
  const staleBundle = {
    aliasDefaults: {},
    collections: {
      Demo: {
        modes: { Value: { Token: "var(--stale-token)" } },
        types: { Token: "STRING" },
        scopes: { Token: [] },
      },
    },
  }
  const repairedBundle = {
    aliasDefaults: {},
    collections: {
      Demo: {
        modes: { Value: { Token: "#FFFFFF" } },
        types: { Token: "COLOR" },
        scopes: { Token: ["ALL_FILLS"] },
      },
    },
  }

  await importBundle(staleBundle, [])
  validateBundle(repairedBundle)

  await assert.rejects(
    () => validateExistingVariableState(repairedBundle),
    /Existing-state preflight: 1 variable\(s\) have the wrong type/,
  )
  assert.equal(variables.length, 1)
  assert.equal(variables[0].resolvedType, "STRING")

  const state = await validateExistingVariableState(repairedBundle, { recreateWrongTypes: true })
  assert.equal(state.wrongTypeCount, 1)
  await importBundle(repairedBundle, [], { recreateWrongTypes: true, existingStateValidated: true })
  assert.equal(variables.length, 1)
  assert.equal(variables[0].resolvedType, "COLOR")
})
