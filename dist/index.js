"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  FlowBoard: () => FlowBoard
});
module.exports = __toCommonJS(src_exports);

// src/context/workspace/provider.tsx
var import_react = __toESM(require("react"));

// src/context/workspace/reducer/global.ts
var globalReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_PROJECT":
      if (action.payload.project && action.payload.project.type === "project") {
        const alreadyExist = state.workspace.content.some((el) => {
          var _a;
          return el.id === ((_a = action.payload.project) == null ? void 0 : _a.id);
        });
        if (alreadyExist)
          return __spreadProps(__spreadValues({}, state), {
            updatedAt: /* @__PURE__ */ new Date(),
            workspace: __spreadProps(__spreadValues({}, state.workspace), {
              content: state.workspace.content.map((pro) => pro.id === action.payload.project.id ? action.payload.project : pro),
              updatedAt: /* @__PURE__ */ new Date()
            })
          });
        return __spreadProps(__spreadValues({}, state), {
          workspace: __spreadProps(__spreadValues({}, state.workspace), {
            content: [...state.workspace.content, action.payload.project],
            updatedAt: /* @__PURE__ */ new Date()
          }),
          updatedAt: /* @__PURE__ */ new Date()
        });
      }
      return state;
    case "LOAD_WORKSPACE":
      return __spreadProps(__spreadValues(__spreadValues({}, state), action.payload.data), {
        updatedAt: /* @__PURE__ */ new Date()
      });
    case "RENAME_WORKSPACE":
      return __spreadProps(__spreadValues({}, state), {
        workspaceName: action.payload.value,
        updatedAt: /* @__PURE__ */ new Date(),
        workspace: __spreadProps(__spreadValues({}, state.workspace), {
          title: action.payload.value
        })
      });
    case "SET_CONFIG_MODE":
      return __spreadProps(__spreadValues({}, state), {
        configMode: action.payload.value
      });
    case "ADD_ELEMENT":
      return __spreadProps(__spreadValues({}, state), {
        workspace: addElement([state.workspace], action)[0]
      });
    case "UPDATE_ELEMENT":
      return __spreadProps(__spreadValues({}, state), {
        workspace: updateElement([state.workspace], action)[0]
      });
    case "DELETE_ELEMENT":
      return __spreadProps(__spreadValues({}, state), {
        workspace: deleteElement([state.workspace], action)[0]
      });
    case "MIGRATE_ELEMENT":
      return __spreadProps(__spreadValues({}, state), {
        workspace: migrateElement([state.workspace], action)[0]
      });
    case "CHANGE_STATUS":
      return __spreadProps(__spreadValues({}, state), {
        workspace: changeElementStatus([state.workspace], action)[0]
      });
    default:
      return state;
  }
};

// src/context/workspace/reducer/utils.ts
var import_system = require("@pytsx/system");
function recursiveUpdate(elements, id, callback) {
  if (id === null)
    return elements.map((el) => {
      callback(el);
      return __spreadProps(__spreadValues({}, el), {
        content: recursiveUpdate(el.content, id, callback)
      });
    });
  return elements.map((el) => {
    if (el.id === id) {
      return __spreadValues({}, (0, import_system.deepMerge)(el, callback(el)));
    } else {
      return __spreadProps(__spreadValues({}, el), {
        content: recursiveUpdate(el.content, id, callback)
      });
    }
  });
}
function addElement(elements, action) {
  if (action.type !== "ADD_ELEMENT")
    throw new Error("wrong action type pass to AddElement");
  return recursiveUpdate(elements, action.payload.parentId, (element) => {
    var _a, _b;
    const isDuplicate = element.content.some(
      (element2) => element2.id === action.payload.element.id
    );
    if (isDuplicate)
      return element;
    const newElement = __spreadProps(__spreadValues({}, action.payload.element), {
      parent: element.id,
      summary: __spreadProps(__spreadValues({}, action.payload.element.summary), {
        parents: [...(element == null ? void 0 : element.summary.parents) || [], element.id]
      })
    });
    const newParent = __spreadProps(__spreadValues({}, element), {
      content: [...element.content, newElement],
      metadata: __spreadProps(__spreadValues({}, element.metadata), {
        ETA: (((_a = element.metadata) == null ? void 0 : _a.ETA) || 0) + (((_b = action.payload.element.metadata) == null ? void 0 : _b.ETA) || 0)
      })
    });
    return newParent;
  });
}
function updateElement(elements, action) {
  if (action.type !== "UPDATE_ELEMENT")
    throw new Error("wrong action type pass to updateElement");
  if (action.payload.oldElement.parent === "root") {
    return recursiveUpdate(elements, action.payload.oldElement.id, (element) => {
      return __spreadProps(__spreadValues({}, (0, import_system.deepMerge)(element, action.payload.newElement)), {
        updatedAt: /* @__PURE__ */ new Date()
      });
    });
  }
  return recursiveUpdate(elements, action.payload.oldElement.parent, (element) => {
    return __spreadProps(__spreadValues({}, element), {
      content: element.content.map((item) => {
        if (item.id === action.payload.oldElement.id) {
          return __spreadProps(__spreadValues(__spreadValues({}, item), action.payload.newElement), {
            updatedAt: /* @__PURE__ */ new Date()
          });
        }
        return item;
      })
    });
  });
}
function changeElementStatus(elements, action) {
  if (action.type !== "CHANGE_STATUS")
    throw new Error("wrong action type pass to StartElement");
  return recursiveUpdate(elements, action.payload.element.id, (element) => {
    return __spreadProps(__spreadValues({}, element), {
      metadata: __spreadProps(__spreadValues({}, element.metadata), {
        status: action.payload.status,
        timer: {
          [action.payload.status]: /* @__PURE__ */ new Date()
        }
      })
    });
  });
}
function migrateElement(elements, action) {
  if (action.type !== "MIGRATE_ELEMENT")
    throw new Error("wrong action type pass to StartElement");
  const newElements = deleteElement(elements, {
    type: "DELETE_ELEMENT",
    payload: {
      elementId: action.payload.element.id,
      parentId: action.payload.element.parent
    }
  });
  return addElement(
    newElements,
    {
      type: "ADD_ELEMENT",
      payload: {
        element: __spreadProps(__spreadValues({}, action.payload.element), {
          metadata: __spreadProps(__spreadValues({}, action.payload.element.metadata), {
            whenFinish: void 0
          })
        }),
        parentId: action.payload.to
      }
    }
  );
}
function deleteElement(elements, action) {
  if (action.type !== "DELETE_ELEMENT")
    throw new Error("wrong action type pass to deleteElement");
  if (action.payload.parentId === "root") {
    return elements.filter((item) => {
      if (item.id === action.payload.elementId) {
        return false;
      } else if (item.content && Array.isArray(item.content)) {
        item.content = deleteElement(item.content, action);
      }
      return true;
    });
  }
  return elements == null ? void 0 : elements.map((element) => {
    if (element.id === action.payload.parentId) {
      return __spreadProps(__spreadValues({}, element), {
        content: element.content.filter((item) => {
          if (item.id === action.payload.elementId) {
            return false;
          } else if (item.content && Array.isArray(item.content)) {
            item.content = deleteElement(item.content, action);
          }
          return true;
        }),
        updatedAt: /* @__PURE__ */ new Date()
      });
    } else {
      element.content = deleteElement(element.content, action);
    }
    return element;
  });
}

// src/context/workspace/reducer/project.ts
function projectReducer(state, action) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
  switch (action.type) {
    case "LOAD_DATA":
      if (!action.payload.element) {
        return {
          openedElement: void 0,
          project: void 0,
          refElement: void 0,
          selectedElement: void 0,
          startedElement: void 0,
          configMode: false
        };
      }
      return __spreadProps(__spreadValues({}, state), {
        project: action.payload.element
      });
    case "ADD_ELEMENT":
      if (!state.project)
        return state;
      return __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadProps(__spreadValues({}, state), {
        project: addElement([state.project], action)[0]
      }), action.payload.parentId === ((_a = state.openedElement) == null ? void 0 : _a.id) && { openedElement: __spreadProps(__spreadValues({}, state.openedElement), { content: addElement(state.openedElement.content, action) }) }), action.payload.parentId === ((_b = state.refElement) == null ? void 0 : _b.id) && { refElement: __spreadProps(__spreadValues({}, state.refElement), { content: addElement([state.refElement], action) }) }), action.payload.parentId === ((_c = state.selectedElement) == null ? void 0 : _c.id) && { selectedElement: __spreadProps(__spreadValues({}, state.selectedElement), { content: addElement([state.selectedElement], action) }) }), action.payload.parentId === ((_d = state.startedElement) == null ? void 0 : _d.id) && { startedElement: __spreadProps(__spreadValues({}, state.startedElement), { content: addElement([state.startedElement], action) }) }), action.payload.parentId === ((_e = state.configElement) == null ? void 0 : _e.id) && { configElement: __spreadProps(__spreadValues({}, state.configElement), { content: addElement([state.configElement], action) }) });
    case "UPDATE_ELEMENT":
      if (!state.project)
        return state;
      return __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadProps(__spreadValues({}, state), {
        project: updateElement([state.project], action)[0]
      }), action.payload.oldElement.id === ((_f = state.openedElement) == null ? void 0 : _f.id) && { openedElement: __spreadValues(__spreadValues({}, state.openedElement), action.payload.newElement) }), action.payload.oldElement.id === ((_g = state.refElement) == null ? void 0 : _g.id) && { refElement: __spreadValues(__spreadValues({}, state.refElement), action.payload.newElement) }), action.payload.oldElement.id === ((_h = state.selectedElement) == null ? void 0 : _h.id) && { selectedElement: __spreadValues(__spreadValues({}, state.selectedElement), action.payload.newElement) }), action.payload.oldElement.id === ((_i = state.startedElement) == null ? void 0 : _i.id) && { startedElement: __spreadValues(__spreadValues({}, state.startedElement), action.payload.newElement) }), action.payload.oldElement.id === ((_j = state.configElement) == null ? void 0 : _j.id) && { configElement: __spreadValues(__spreadValues({}, state.configElement), action.payload.newElement) });
    case "DELETE_ELEMENT":
      if (!state.project)
        return state;
      return __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadProps(__spreadValues({}, state), {
        project: deleteElement([state.project], action)[0]
      }), action.payload.elementId === ((_k = state.openedElement) == null ? void 0 : _k.id) && { openedElement: void 0 }), action.payload.elementId === ((_l = state.refElement) == null ? void 0 : _l.id) && { refElement: void 0 }), action.payload.elementId === ((_m = state.selectedElement) == null ? void 0 : _m.id) && { selectedElement: void 0 }), action.payload.elementId === ((_n = state.startedElement) == null ? void 0 : _n.id) && { startedElement: void 0 }), action.payload.elementId === ((_o = state.configElement) == null ? void 0 : _o.id) && { configElement: void 0 });
    case "MIGRATE_ELEMENT":
      if (!state.project)
        return state;
      if (state.startedElement) {
      }
      return __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadProps(__spreadValues({}, state), {
        project: migrateElement([state.project], action)[0]
      }), action.payload.element.id === ((_p = state.openedElement) == null ? void 0 : _p.id) && { openedElement: __spreadProps(__spreadValues(__spreadValues({}, state.openedElement), action.payload.element), { parent: action.payload.to }) }), action.payload.element.id === ((_q = state.refElement) == null ? void 0 : _q.id) && { refElement: __spreadProps(__spreadValues(__spreadValues({}, state.refElement), action.payload.element), { parent: action.payload.to }) }), action.payload.element.id === ((_r = state.selectedElement) == null ? void 0 : _r.id) && { selectedElement: __spreadProps(__spreadValues(__spreadValues({}, state.selectedElement), action.payload.element), { parent: action.payload.to }) }), action.payload.element.id === ((_s = state.startedElement) == null ? void 0 : _s.id) && { startedElement: __spreadProps(__spreadValues(__spreadValues({}, state.startedElement), action.payload.element), { parent: action.payload.to }) }), action.payload.element.id === ((_t = state.configElement) == null ? void 0 : _t.id) && { configElement: __spreadProps(__spreadValues(__spreadValues({}, state.configElement), action.payload.element), { parent: action.payload.to }) });
    case "CHANGE_STATUS":
      if (!state.project)
        return state;
      return __spreadProps(__spreadValues({}, state), {
        project: changeElementStatus([state.project], action)[0]
      });
    case "START_ELEMENT":
      if (!state.project)
        return state;
      return __spreadProps(__spreadValues({}, state), {
        project: changeElementStatus(
          [state.project],
          {
            type: "CHANGE_STATUS",
            payload: __spreadProps(__spreadValues({}, action.payload), {
              status: "ACTIVE"
            })
          }
        )[0],
        startedElement: action.payload.element
      });
    case "OPEN_ELEMENT":
      return __spreadProps(__spreadValues({}, state), {
        openedElement: action.payload.element
      });
    case "SELECT_ELEMENT":
      return __spreadProps(__spreadValues({}, state), {
        selectedElement: action.payload.element
      });
    case "SET_REF_ELEMENT":
      return __spreadProps(__spreadValues({}, state), {
        refElement: action.payload.element
      });
    case "SET_CONFIG_MODE":
      return __spreadProps(__spreadValues({}, state), {
        configMode: action.payload.value
      });
    case "REMOVE_REF_ELEMENT":
      return __spreadProps(__spreadValues({}, state), {
        refElement: void 0
      });
    case "REMOVE_OPEN_ELEMENT":
      return __spreadProps(__spreadValues({}, state), {
        openedElement: void 0
      });
    case "DESELECT_ELEMENT":
      return __spreadProps(__spreadValues({}, state), {
        selectedElement: void 0
      });
    case "REMOVE_STARTED_ELEMENT":
      return __spreadProps(__spreadValues({}, state), {
        startedElement: void 0
      });
    default:
      return state;
  }
}

// node_modules/uuid/dist/esm-node/rng.js
var import_crypto = __toESM(require("crypto"));
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// node_modules/uuid/dist/esm-node/regex.js
var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

// node_modules/uuid/dist/esm-node/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default = validate;

// node_modules/uuid/dist/esm-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr, offset = 0) {
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var stringify_default = stringify;

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default = v4;

// src/lib/colors.ts
function randomNumber(min = 0, max = 255) {
  if (min > max)
    throw new Error("Invalid range: min must be less than or equal to max");
  const range = max - min;
  return Math.floor(min + Math.random() * range);
}
function generateRGB() {
  const r2 = randomNumber(10, 50);
  const g = randomNumber(90, 180);
  const b = randomNumber(180, 205);
  const a = randomNumber(60, 90) / 100;
  return [r2, g, b, a];
}
function getMiddleColor(color1, color2) {
  const [r1, g1, b1, a1] = color1;
  const [r2, g2, b2, a2] = color2;
  const color3 = [Math.floor(r1 * r2 / 2), Math.floor(g1 * g2 / 2), Math.floor(b1 * b2 / 2), Math.floor(a1 * a2 / 2)];
  return color3;
}
function generateGradient() {
  const color1 = generateRGB();
  const color3 = generateRGB();
  const color2 = getMiddleColor(color1, color3);
  const degree = randomNumber(0, 180);
  return `linear-gradient(${degree}deg, rgba(${color1.join(",")}) 0%, rgba(${color3.join(",")}) 50%, rgba(${color2.join(",")}) 100%)`;
}

// src/context/workspace/provider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var initialState = {
  workspaceName: "new workspace",
  configMode: false,
  updatedAt: /* @__PURE__ */ new Date(),
  workspace: {
    position: 0,
    parent: "root",
    summary: {
      parents: ["root"],
      child: []
    },
    type: "workspace",
    id: v4_default(),
    content: [],
    style: {
      background: generateGradient()
    },
    updatedAt: /* @__PURE__ */ new Date(),
    project: "root"
  }
};
var initialProjectState = {
  configMode: false
};
var WorkspaceContext = import_react.default.createContext({
  globalDispatch: () => {
  },
  globalState: initialState,
  projectDispatch: () => {
  },
  projectState: initialProjectState,
  deselectProject: () => {
  },
  selectProject: () => {
  },
  deleteElement: () => {
  },
  updateElement: () => {
  },
  addElement: () => {
  },
  sync: () => {
  },
  completeElementCycle: () => {
  },
  setConfigMode: () => {
  }
});
var WorkspaceProvider = ({ children }) => {
  const [globalState, globalDispatch] = import_react.default.useReducer(globalReducer, initialState);
  const [projectState, projectDispatch] = import_react.default.useReducer(projectReducer, initialProjectState);
  function deselectProject() {
    if (projectState.project) {
      sync();
    }
    projectDispatch({
      type: "LOAD_DATA",
      payload: {
        element: void 0
      }
    });
  }
  function setConfigMode(value) {
    if (projectState.project) {
      projectDispatch({
        type: "SET_CONFIG_MODE",
        payload: { value }
      });
    } else {
      globalDispatch({
        type: "SET_CONFIG_MODE",
        payload: { value }
      });
    }
  }
  function completeElementCycle() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    projectDispatch({
      type: "MIGRATE_ELEMENT",
      payload: {
        element: __spreadProps(__spreadValues({}, projectState.startedElement), {
          metadata: __spreadProps(__spreadValues({}, (_a = projectState.startedElement) == null ? void 0 : _a.metadata), {
            status: "FINISHED"
          })
        }),
        to: (_d = (_c = (_b = projectState.startedElement) == null ? void 0 : _b.metadata) == null ? void 0 : _c.whenFinish) == null ? void 0 : _d.migrateTo
      }
    });
    if (projectState.project) {
      globalDispatch({
        type: "MIGRATE_ELEMENT",
        payload: {
          element: __spreadProps(__spreadValues({}, projectState.startedElement), {
            metadata: __spreadProps(__spreadValues({}, (_e = projectState.startedElement) == null ? void 0 : _e.metadata), {
              status: "FINISHED"
            })
          }),
          to: (_h = (_g = (_f = projectState.startedElement) == null ? void 0 : _f.metadata) == null ? void 0 : _g.whenFinish) == null ? void 0 : _h.migrateTo
        }
      });
    }
    projectDispatch({
      type: "REMOVE_STARTED_ELEMENT"
    });
  }
  function selectProject(element) {
    if (projectState.project) {
      sync();
    }
    globalDispatch({
      type: "LOAD_PROJECT",
      payload: {
        project: element
      }
    });
    projectDispatch({
      type: "LOAD_DATA",
      payload: {
        element
      }
    });
  }
  function deleteElement2(element) {
    projectDispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementId: element.id,
        parentId: element.parent
      }
    });
    globalDispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementId: element.id,
        parentId: element.parent
      }
    });
  }
  function updateElement2(element, newElement) {
    projectDispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        oldElement: element,
        newElement
      }
    });
    globalDispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        oldElement: element,
        newElement
      }
    });
  }
  function addElement2(element) {
    projectDispatch({
      type: "ADD_ELEMENT",
      payload: {
        parentId: element.parent,
        element
      }
    });
    globalDispatch({
      type: "ADD_ELEMENT",
      payload: {
        parentId: element.parent,
        element
      }
    });
  }
  function sync() {
    if (projectState.project) {
      globalDispatch({
        type: "LOAD_PROJECT",
        payload: {
          project: projectState.project
        }
      });
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceContext.Provider, { value: {
    globalState,
    globalDispatch,
    projectState,
    projectDispatch,
    selectProject,
    deselectProject,
    deleteElement: deleteElement2,
    updateElement: updateElement2,
    addElement: addElement2,
    sync,
    completeElementCycle,
    setConfigMode
  }, children });
};
var useWorkspace = () => {
  const context = import_react.default.useContext(WorkspaceContext);
  if (!context)
    throw new Error("you must define Board context before use Board hooks");
  return context;
};

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else
      for (f in e)
        e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// src/components/workspace-io/export.button.tsx
var import_react2 = __toESM(require("react"));

// src/components/ui/button.tsx
var React2 = __toESM(require("react"));
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority = require("class-variance-authority");

// src/lib/utils.ts
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)(clsx(inputs));
}
function getMinutes(seconds) {
  return Math.floor(seconds / 60);
}
function getSeconds(seconds) {
  return seconds % 60;
}
function convertToSeconds(minutes, seconds) {
  if (minutes < 0)
    minutes = 0;
  if (seconds < 0)
    seconds = 0;
  return (minutes || 0) * 60 + seconds || 0;
}

// src/components/ui/button.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority.cva)(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-sm px-3",
        lg: "h-11 rounded-sm px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant, size, asChild = false } = _b, props = __objRest(_b, ["className", "variant", "size", "asChild"]);
    const Comp = asChild ? import_react_slot.Slot : "button";
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      Comp,
      __spreadValues({
        className: cn(buttonVariants({ variant, size, className })),
        ref
      }, props)
    );
  }
);
Button.displayName = "Button";

// src/components/workspace-io/export.button.tsx
var import_lucide_react = require("lucide-react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var ExportButton = import_react2.default.forwardRef((_a, ref) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "button",
    __spreadProps(__spreadValues({
      ref,
      className: clsx_default(
        buttonVariants({ variant: "outline", className: "!px-2" }),
        "select-none rounded-sm leading-none bg-transparent  text-neutral-950 !capitalize text-sm  ",
        "transition-all ",
        "active:shadow-none active:opacity-60",
        "h-fit md:h-8"
      )
    }, props), {
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.Download, { className: "w-4 h-4" })
    })
  );
});
ExportButton.displayName = "ExportButton";
var export_button_default = ExportButton;

// src/lib/download.ts
function download(data, title) {
  if (!data)
    return null;
  const jsonData = JSON.stringify(data);
  const blob = new Blob([jsonData], { type: "application/json" });
  const downloadURL = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = downloadURL;
  downloadLink.download = `${title}.json`;
  downloadLink.click();
  URL.revokeObjectURL(downloadURL);
}

// src/components/workspace-io/export.project.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function ExportBoard() {
  const { projectState, globalState } = useWorkspace();
  function exportProject() {
    if (!projectState.project)
      return null;
    download(projectState.project, `[${globalState.workspaceName}] ${projectState.project.title}`);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    export_button_default,
    {
      onClick: exportProject
    }
  );
}
ExportBoard.displayName = "ExportBoard";
var export_project_default = ExportBoard;

// src/components/elements/text.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function TextElement({ element, dense, className }) {
  const { projectDispatch } = useWorkspace();
  function updateElement2(value) {
    projectDispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        oldElement: element,
        newElement: __spreadProps(__spreadValues({}, element), {
          title: value
        })
      }
    });
  }
  return element.title && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(RawEditableText, { callback: updateElement2, className: className || "", text: element.title, dense });
}
function RawEditableText({ callback, text, dense, className }) {
  function onBlur(e) {
    const value = e.target.innerText === "" ? text : e.target.innerText;
    callback(value || "");
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "p",
    {
      contentEditable: !dense,
      dangerouslySetInnerHTML: { __html: text },
      suppressContentEditableWarning: true,
      onBlur,
      className: clsx_default("text-sm line-clamp-2 px-1 py-1", [dense && "line-clamp-4 text-xs"], className),
      autoFocus: true
    }
  );
}

// src/components/workspace-io/export.workspace.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function ExportWorkspace() {
  const { globalState } = useWorkspace();
  function exportWorkspace() {
    if (!globalState)
      return null;
    download(globalState, globalState.workspaceName);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(export_button_default, { onClick: exportWorkspace });
}
ExportWorkspace.displayName = "ExportWorkspace";
var export_workspace_default = ExportWorkspace;

// src/components/automation/localStorage.sync.tsx
var import_lucide_react2 = require("lucide-react");
var import_react3 = __toESM(require("react"));

// src/components/ui/use-toast.ts
var React4 = __toESM(require("react"));
var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1e6;
var count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
var toastTimeouts = /* @__PURE__ */ new Map();
var addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
var reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return __spreadProps(__spreadValues({}, state), {
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      });
    case "UPDATE_TOAST":
      return __spreadProps(__spreadValues({}, state), {
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? __spreadValues(__spreadValues({}, t), action.toast) : t
        )
      });
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return __spreadProps(__spreadValues({}, state), {
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? __spreadProps(__spreadValues({}, t), {
            open: false
          }) : t
        )
      });
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return __spreadProps(__spreadValues({}, state), {
          toasts: []
        });
      }
      return __spreadProps(__spreadValues({}, state), {
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      });
  }
};
var listeners = [];
var memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast(_a) {
  var props = __objRest(_a, []);
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: __spreadProps(__spreadValues({}, props2), { id })
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: __spreadProps(__spreadValues({}, props), {
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open)
          dismiss();
      }
    })
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React4.useState(memoryState);
  React4.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return __spreadProps(__spreadValues({}, state), {
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  });
}

// src/components/automation/localStorage.sync.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function LocalStorageSync() {
  const { globalState, globalDispatch, projectState } = useWorkspace();
  const [date, setDate] = import_react3.default.useState(/* @__PURE__ */ new Date());
  const [autoSave, setAutoSave] = import_react3.default.useState(true);
  const [sync, setSync] = import_react3.default.useState(false);
  const { toast: toast2 } = useToast();
  import_react3.default.useEffect(() => {
    getLocally();
  }, []);
  import_react3.default.useEffect(() => {
    if (autoSave) {
      setDate(/* @__PURE__ */ new Date());
      if (globalState.workspace.content.length > 0)
        syncLocally();
    }
  }, [globalState.workspace.content, globalState.workspaceName, autoSave]);
  function saveLocally(title = "flowboard", data) {
    window.localStorage.setItem(title, JSON.stringify(data || globalState));
  }
  function getLocally() {
    const data = window.localStorage.getItem("flowboard");
    if (data) {
      const state = JSON.parse(data);
      globalDispatch({
        type: "LOAD_WORKSPACE",
        payload: {
          data: state
        }
      });
    }
  }
  function syncLocally() {
    setSync(true);
    saveLocally();
    if (!projectState.project) {
      toast2({
        title: "Data synced locally"
      });
    }
    if (!autoSave) {
      getLocally();
    }
    setTimeout(() => setSync(false), 500);
  }
  function clearLocalstorage() {
    window.localStorage.clear();
  }
  function onClick() {
    setAutoSave((prev) => {
      const newState = !prev;
      if (newState) {
        syncLocally();
      } else {
        clearLocalstorage();
      }
      toast2({
        title: `auto save ${newState ? "enabled" : "disabled"}`,
        duration: 2e3,
        variant: newState ? "default" : "destructive"
      });
      return newState;
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "div",
    {
      contentEditable: false,
      className: "select-none flex items-center gap-1 cursor-pointer",
      onClick,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-xs font-semibold opacity-50 hidden md:inline", children: "sync at:" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react3.Suspense, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "span",
          {
            dangerouslySetInnerHTML: { __html: (date || /* @__PURE__ */ new Date()).toLocaleString() },
            className: "text-[10px] md:text-xs uppercase"
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          import_lucide_react2.RefreshCcw,
          {
            className: clsx_default(
              "w-3 h-3 opacity-60",
              sync && "animate-spin",
              autoSave && "!opacity-100 text-blue-800/60",
              !autoSave && "!text-red-800/40"
            )
          }
        )
      ]
    }
  );
}
LocalStorageSync.displayName = "LocalStorageSync";
var localStorage_sync_default = LocalStorageSync;

// src/components/automation/timer.tsx
var import_lucide_react3 = require("lucide-react");
var import_react5 = __toESM(require("react"));

// src/context/countdown/provider.tsx
var import_react4 = __toESM(require("react"));
var import_jsx_runtime8 = require("react/jsx-runtime");
var Context = import_react4.default.createContext({});
var maxMinutes = 25;
var countdownTimeout;
var CountdownProvider = ({ children }) => {
  var _a, _b;
  const { projectState, updateElement: updateElement2, completeElementCycle } = useWorkspace();
  const [time, setTime] = import_react4.default.useState(((_b = (_a = projectState.startedElement) == null ? void 0 : _a.metadata) == null ? void 0 : _b.duration) || maxMinutes);
  const [isActive, setIsActive] = import_react4.default.useState(false);
  const [hasFinished, setHasFinished] = import_react4.default.useState(false);
  const [minutes, setMinutes] = import_react4.default.useState(getMinutes(time));
  const [seconds, setSeconds] = import_react4.default.useState(getSeconds(time));
  function startCountdown(_time = maxMinutes) {
    clearTimeout(countdownTimeout);
    setTime(_time);
    setMinutes(getMinutes(_time));
    setSeconds(getSeconds(_time));
    setIsActive(true);
  }
  function resetCountdown() {
    var _a2, _b2;
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(((_b2 = (_a2 = projectState.startedElement) == null ? void 0 : _a2.metadata) == null ? void 0 : _b2.duration) || maxMinutes);
    setHasFinished(false);
  }
  import_react4.default.useEffect(() => {
    var _a2, _b2, _c, _d;
    if (projectState.startedElement && ((_b2 = (_a2 = projectState.startedElement.metadata) == null ? void 0 : _a2.whenFinish) == null ? void 0 : _b2.migrateTo)) {
      if (isActive && time > 0) {
        countdownTimeout = setTimeout(() => {
          const newTime = time - 1;
          setTime(newTime);
          setMinutes(Math.floor(newTime / 60));
          setSeconds(newTime % 60);
          if (projectState.startedElement && newTime % 4 === 0) {
            updateElement2(projectState.startedElement, __spreadProps(__spreadValues({}, projectState.startedElement), {
              metadata: __spreadProps(__spreadValues({}, projectState.startedElement.metadata), {
                ETA: time
              })
            }));
          }
        }, 1e3);
      } else if (isActive && time === 0) {
        setHasFinished(true);
        setIsActive(false);
        resetCountdown();
        if (projectState.startedElement && ((_d = (_c = projectState.startedElement.metadata) == null ? void 0 : _c.whenFinish) == null ? void 0 : _d.migrateTo)) {
          completeElementCycle();
        }
      }
    } else {
      resetCountdown();
    }
    return () => clearTimeout(countdownTimeout);
  }, [isActive, time]);
  function pauseCountdown() {
    setIsActive(false);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Context.Provider, { value: {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown,
    pauseCountdown,
    time
  }, children });
};
var useCountdown = () => {
  const context = import_react4.default.useContext(Context);
  if (!context)
    throw new Error("you must define Board context before use Board hooks");
  return context;
};

// src/components/automation/timer.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function Timer({ element }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const { projectDispatch, projectState } = useWorkspace();
  const { startCountdown, resetCountdown, pauseCountdown } = useCountdown();
  import_react5.default.useEffect(() => {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    if (projectState.startedElement && ((_c2 = (_b2 = (_a2 = projectState.startedElement) == null ? void 0 : _a2.metadata) == null ? void 0 : _b2.whenFinish) == null ? void 0 : _c2.migrateTo) !== void 0 && ((_e2 = (_d2 = projectState.startedElement) == null ? void 0 : _d2.metadata) == null ? void 0 : _e2.status) === "ACTIVE") {
      startCountdown((_f2 = projectState.startedElement) == null ? void 0 : _f2.metadata.ETA);
    }
  }, [(_c = (_b = (_a = projectState.startedElement) == null ? void 0 : _a.metadata) == null ? void 0 : _b.whenFinish) == null ? void 0 : _c.migrateTo, (_e = (_d = projectState.startedElement) == null ? void 0 : _d.metadata) == null ? void 0 : _e.status]);
  function changeStatus(status) {
    var _a2, _b2, _c2;
    const newElement = __spreadProps(__spreadValues({}, element), {
      metadata: __spreadProps(__spreadValues({}, element.metadata), {
        status,
        ETA: status == "IDLE" ? (_a2 = element.metadata) == null ? void 0 : _a2.duration : (_b2 = element.metadata) == null ? void 0 : _b2.ETA,
        whenFinish: status == "IDLE" ? void 0 : (_c2 = element.metadata) == null ? void 0 : _c2.whenFinish
      })
    });
    projectDispatch({
      type: "START_ELEMENT",
      payload: {
        element: newElement
      }
    });
    projectDispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        oldElement: element,
        newElement
      }
    });
  }
  function active() {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    if (((_c2 = (_b2 = (_a2 = projectState.startedElement) == null ? void 0 : _a2.metadata) == null ? void 0 : _b2.whenFinish) == null ? void 0 : _c2.migrateTo) !== void 0) {
      changeStatus("ACTIVE");
      const el = projectState.project;
      if (el) {
        if (((_d2 = el.metadata) == null ? void 0 : _d2.status) === "IDLE") {
          startCountdown((_e2 = el.metadata) == null ? void 0 : _e2.duration);
        } else {
          startCountdown((_f2 = el.metadata) == null ? void 0 : _f2.ETA);
        }
      }
    } else {
      changeStatus("LINK");
      pauseCountdown();
    }
  }
  function pause() {
    changeStatus("PAUSED");
    pauseCountdown();
  }
  function reset() {
    var _a2;
    if (((_a2 = projectState.startedElement) == null ? void 0 : _a2.id) === element.id) {
      resetCountdown();
    }
    changeStatus("IDLE");
  }
  return ((_f = element.metadata) == null ? void 0 : _f.status) !== "FINISHED" && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center", children: [
    ((_g = element.metadata) == null ? void 0 : _g.status) === "LINK" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TimerButton, { onClick: pause, icon: import_lucide_react3.Loader, className: "animate-spin" }),
    ((_h = element.metadata) == null ? void 0 : _h.status) !== "IDLE" && ((_i = element.metadata) == null ? void 0 : _i.status) !== "LINK" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TimerButton, { onClick: reset, icon: import_lucide_react3.RefreshCcw }),
    ((_j = element.metadata) == null ? void 0 : _j.status) !== "ACTIVE" && ((_k = element.metadata) == null ? void 0 : _k.status) !== "LINK" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TimerButton, { onClick: active, icon: import_lucide_react3.Play }),
    ((_l = element.metadata) == null ? void 0 : _l.status) === "ACTIVE" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TimerButton, { onClick: pause, icon: import_lucide_react3.Pause })
  ] });
}
function TimerButton({ icon: Icon, onClick, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { onClick, className: clsx_default("p-2 hover:bg-neutral-400/20 rounded-full", className), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { className: "w-4 h-4" }) });
}
Timer.displayName = "Timer";
var timer_default = Timer;

// src/components/ui/badge.tsx
var import_class_variance_authority2 = require("class-variance-authority");
var import_jsx_runtime10 = require("react/jsx-runtime");
var badgeVariants = (0, import_class_variance_authority2.cva)(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge(_a) {
  var _b = _a, { className, variant } = _b, props = __objRest(_b, ["className", "variant"]);
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", __spreadValues({ className: cn(badgeVariants({ variant }), className) }, props));
}

// src/components/ui/roll.tsx
var import_react6 = __toESM(require("react"));
var import_jsx_runtime11 = require("react/jsx-runtime");
var numbers = {
  "0": "-translate-y-0",
  "1": "-translate-y-8",
  "2": "-translate-y-16",
  "3": "-translate-y-24",
  "4": "-translate-y-32",
  "5": "-translate-y-40",
  "6": "-translate-y-48",
  "7": "-translate-y-56",
  "8": "-translate-y-64",
  "9": "-translate-y-72"
};
var Roll = import_react6.default.memo(({ value }) => {
  let [a, b] = value.toString();
  if (!b) {
    b = a;
    a = `0`;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "rounded-sm max-h-7 overflow-hidden text-neutral-950/80 flex text-lg font-mono ", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: clsx_default("flex flex-col gap-1 transition-all delay-0", numbers[a || "0"]), children: Object.keys(numbers).map((number, index) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: number }, number + 100 + value + index + v4_default())) }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: clsx_default("flex flex-col gap-1 transition-all delay-0", numbers[b]), children: Object.keys(numbers).map((number, index) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: number }, number + index + value + v4_default())) })
  ] });
});
Roll.displayName = "Roll";
var roll_default = Roll;

// src/components/elements/utils/countdown.tsx
var import_react7 = __toESM(require("react"));
var import_jsx_runtime12 = require("react/jsx-runtime");
var Counterdown = ({ element }) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const { minutes, seconds } = useCountdown();
  const { projectState, updateElement: updateElement2 } = useWorkspace();
  const [newTime, setNewTime] = import_react7.default.useState({
    minutes: getMinutes(((_b = (_a = projectState.startedElement) == null ? void 0 : _a.metadata) == null ? void 0 : _b.duration) || 0) || 0,
    seconds: getSeconds(((_d = (_c = projectState.startedElement) == null ? void 0 : _c.metadata) == null ? void 0 : _d.duration) || 0) || 0
  });
  function updateDuration(type, value) {
    setNewTime((prev) => {
      const newTime2 = convertToSeconds(type == "minutes" ? value : prev.minutes, type == "seconds" ? value : prev.seconds);
      projectState.startedElement && updateElement2(projectState.startedElement, __spreadProps(__spreadValues({}, projectState.startedElement), {
        metadata: __spreadProps(__spreadValues({}, projectState.startedElement.metadata), {
          duration: newTime2,
          ETA: newTime2
        })
      }));
      return __spreadValues(__spreadValues(__spreadValues({}, prev), type == "minutes" && { minutes: value }), type == "seconds" && { seconds: value });
    });
  }
  switch ((_e = element.metadata) == null ? void 0 : _e.status) {
    case "ACTIVE":
      if (element.id !== ((_f = projectState.startedElement) == null ? void 0 : _f.id))
        return null;
      return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(roll_default, { value: minutes }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: ":" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(roll_default, { value: seconds })
      ] });
    case "LINK":
      if (element.id !== ((_g = projectState.startedElement) == null ? void 0 : _g.id))
        return null;
      return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center gap-1 select-none", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "input",
          {
            className: "border rounded-sm max-w-14 text-center",
            type: "number",
            value: newTime.minutes,
            onChange: (e) => updateDuration("minutes", Number(e.target.value))
          }
        ),
        ":",
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "input",
          {
            className: "border rounded-sm  max-w-14 text-center",
            type: "number",
            value: newTime.seconds,
            onChange: (e) => updateDuration("seconds", Number(e.target.value))
          }
        )
      ] });
    default:
      return null;
  }
};
Counterdown.displayName = "Counterdown";
var countdown_default = Counterdown;

// src/components/appbar/toolbar.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
function ElementToolbar({ element }) {
  var _a;
  const { projectState, updateElement: updateElement2 } = useWorkspace();
  function renameElement(name) {
    if (projectState.openedElement) {
      updateElement2(projectState.openedElement, __spreadProps(__spreadValues({}, projectState.openedElement), { title: name }));
    }
  }
  return projectState.project && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("section", { className: "flex flex-col w-full justify-between", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex px-2 border rounded-sm mx-2  shadow items-stretch ", children: [
    projectState.openedElement && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_jsx_runtime13.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      RawEditableText,
      {
        text: projectState.openedElement.title || "",
        callback: renameElement,
        className: "min-w-32 max-w-32 transition-all delay-75 my-1  px-2 !text-base  border border-dashed border-transparent group-hover/appbar:border-neutral-950/10 rounded-sm  whitespace-nowrap"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "flex items-center w-full select-none gap-1" }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center border-l pl-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(countdown_default, { element }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(timer_default, { element }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Badge, { variant: "outline", className: "h-6 rounded-sm opacity-80", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "!text-[10px]  select-none ", children: (_a = element.metadata) == null ? void 0 : _a.status }) })
    ] })
  ] }) });
}
ElementToolbar.displayName = "ElementToolbar";
var toolbar_default = ElementToolbar;

// src/components/ui/progress.tsx
var React10 = __toESM(require("react"));
var ProgressPrimitive = __toESM(require("@radix-ui/react-progress"));
var import_jsx_runtime14 = require("react/jsx-runtime");
var Progress = React10.forwardRef((_a, ref) => {
  var _b = _a, { className, value } = _b, props = __objRest(_b, ["className", "value"]);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    ProgressPrimitive.Root,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "relative h-2 w-full overflow-hidden bg-secondary",
        className
      )
    }, props), {
      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        ProgressPrimitive.Indicator,
        {
          className: "h-full w-full flex-1 bg-primary transition-all animate-pulse",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    })
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

// src/components/ui/avatar.tsx
var import_react8 = __toESM(require("react"));

// src/components/ui/dialog.tsx
var React11 = __toESM(require("react"));
var DialogPrimitive = __toESM(require("@radix-ui/react-dialog"));
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime15 = require("react/jsx-runtime");
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogClose = DialogPrimitive.Close;
var DialogOverlay = React11.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    DialogPrimitive.Overlay,
    __spreadValues({
      ref,
      className: cn(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )
    }, props)
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React11.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(DialogPortal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(DialogOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
      DialogPrimitive.Content,
      __spreadProps(__spreadValues({
        ref,
        className: cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )
      }, props), {
        children: [
          children,
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react4.X, { className: "h-4 w-4" }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      })
    )
  ] });
});
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )
    }, props)
  );
};
DialogHeader.displayName = "DialogHeader";
var DialogFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )
    }, props)
  );
};
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React11.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    DialogPrimitive.Title,
    __spreadValues({
      ref,
      className: cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )
    }, props)
  );
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React11.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    DialogPrimitive.Description,
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// src/components/ui/avatar.tsx
var import_react_color = require("react-color");
var import_jsx_runtime16 = require("react/jsx-runtime");
var AvatarRaw = import_react8.default.forwardRef((_a, ref) => {
  var _b = _a, { style, editable, callback } = _b, props = __objRest(_b, ["style", "editable", "callback"]);
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "select-none w-fit h-fit overflow-hidden rounded-full ", ref, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "div",
    __spreadProps(__spreadValues({}, props), {
      className: clsx_default(" w-8 h-8 rounded-full  border", props.className),
      style: __spreadValues({
        background: (style == null ? void 0 : style.background) || "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"
      }, style)
    })
  ) });
});
AvatarRaw.displayName = "AvatarRaw";
var emptyColor = { hex: "", hsl: { h: 0, l: 0, s: 0, a: 0 }, rgb: { b: 0, g: 0, r: 0, a: 0 } };
var AvatarEditor = import_react8.default.forwardRef((_a, ref) => {
  var props = __objRest(_a, []);
  var _a2, _b;
  const [color, setColor] = import_react8.default.useState(emptyColor);
  const handleChangeComplete = (color2) => {
    setColor(color2);
    props.callback && props.callback(color2);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_jsx_runtime16.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "w-full flex items-center justify-center ", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      AvatarRaw,
      {
        ref,
        style: { background: color.hex || ((_a2 = props.style) == null ? void 0 : _a2.background) },
        className: "!w-16 !h-16 border-2",
        editable: props.editable ? props.editable : true
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      import_react_color.SliderPicker,
      {
        color: color.hex || String((_b = props.style) == null ? void 0 : _b.background),
        className: "select-none p-2",
        onChangeComplete: handleChangeComplete
      }
    )
  ] });
});
AvatarEditor.displayName = "AvatarEditor";
var AvatarEditable = import_react8.default.forwardRef((_a, ref) => {
  var props = __objRest(_a, []);
  const [color, setColor] = import_react8.default.useState(void 0);
  const handleChangeComplete = (color2) => {
    setColor(color2);
  };
  const submit = () => props.callback && color && props.callback(color);
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(Dialog, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(DialogTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(AvatarRaw, __spreadValues({ editable: props.editable ? props.editable : true, ref }, props)) }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(DialogPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(DialogContent, { className: "min-h-40", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(DialogTitle, { className: "select-none" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(AvatarEditor, __spreadValues({ editable: props.editable ? props.editable : true, callback: handleChangeComplete }, props)),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(DialogClose, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        Button,
        {
          className: clsx_default("select-none "),
          variant: "outline",
          onClick: submit,
          children: "salvar"
        }
      ) })
    ] }) })
  ] });
});
AvatarEditable.displayName = "AvatarEditable";
var Avatar = import_react8.default.forwardRef((_a, ref) => {
  var props = __objRest(_a, []);
  return props.editable ? /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(AvatarEditable, __spreadProps(__spreadValues({ ref }, props), { editable: props.editable ? props.editable : true })) : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(AvatarRaw, __spreadProps(__spreadValues({ ref }, props), { editable: props.editable ? props.editable : true }));
});
Avatar.displayName = "Avatar";
var avatar_default = Avatar;

// src/components/appbar/index.tsx
var import_lucide_react5 = require("lucide-react");
var import_jsx_runtime17 = require("react/jsx-runtime");
function calculateProgress(currentValue, maxValue) {
  if (maxValue <= 0) {
    throw new Error("Maximum value must be greater than 0");
  }
  const progressPercentage = Math.min(
    100,
    currentValue / maxValue * 100
  );
  return progressPercentage;
}
function Appbar() {
  var _a, _b;
  const { globalState, globalDispatch, setConfigMode, projectState, deselectProject, updateElement: updateElement2 } = useWorkspace();
  const { time } = useCountdown();
  function renameWordspace(value) {
    globalDispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        oldElement: globalState.workspace,
        newElement: __spreadProps(__spreadValues({}, globalState.workspace), {
          title: value
        })
      }
    });
  }
  function renameProject(value) {
    if (projectState.project) {
      updateElement2(projectState.project, __spreadProps(__spreadValues({}, projectState.project), {
        title: value
      }));
    }
  }
  function openProjectSettings() {
    if (projectState.configMode || globalState.configMode) {
      setConfigMode(false);
    } else {
      setConfigMode(true);
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    "header",
    {
      className: clsx_default(
        "group/appbar min-h-28 max-h-28 h-28 w-full ",
        !projectState.openedElement && "!h-14 !min-h-14",
        [projectState.project && !projectState.openedElement && "transition-all"]
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
          "nav",
          {
            className: clsx_default(
              "px-2  w-full flex items-center justify-between h-1/2  ",
              !projectState.openedElement && "!h-full"
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "flex", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
                  "button",
                  {
                    onClick: projectState.project ? deselectProject : () => {
                    },
                    className: "rounded-full flex",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                        avatar_default,
                        {
                          editable: false,
                          style: {
                            background: globalState.workspace.style.background
                          },
                          className: "!blur-md"
                        }
                      ),
                      projectState.project && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "-ml-4", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                        avatar_default,
                        {
                          editable: false,
                          className: "!blur-md ",
                          style: {
                            background: projectState.project.style.background
                          }
                        }
                      ) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                  RawEditableText,
                  {
                    text: projectState.project ? projectState.project.title || "insira um nome" : globalState.workspace.title || "insira um nome",
                    callback: projectState.project ? renameProject : renameWordspace,
                    className: "transition-all delay-75  px-2 h-8 !text-base  border border-dashed border-transparent group-hover/appbar:border-neutral-950/10 rounded-sm  whitespace-nowrap max-w-40 min-w-20"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("button", { onClick: openProjectSettings, className: "opacity-0 group-hover/appbar:opacity-80 p-2  rounded-full hover:bg-neutral-500/10 hover:shadow transition-all", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react5.Settings, { className: "w-4 h-4" }) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex gap-2  whitespace-nowrap items-center flex-row", children: [
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(localStorage_sync_default, {}),
                projectState.project && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(export_project_default, {}),
                !projectState.project && globalState.workspace.content.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(export_workspace_default, {})
              ] })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: clsx_default(" h-1/2  flex flex-col justify-between", !projectState.openedElement && "!h-0"), children: [
          projectState.openedElement && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(toolbar_default, { element: projectState.openedElement }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Progress, { className: "h-1 z-50", value: 100 - calculateProgress(time, ((_b = (_a = projectState.startedElement) == null ? void 0 : _a.metadata) == null ? void 0 : _b.duration) || 20) })
        ] })
      ]
    }
  );
}
Appbar.displayName = "Appbar";
var appbar_default = Appbar;

// src/components/elements/utils/createProject.tsx
var import_lucide_react8 = require("lucide-react");

// src/components/workspace-io/import.project.tsx
var import_lucide_react6 = require("lucide-react");

// src/components/ui/dashed-container.tsx
var import_react9 = __toESM(require("react"));
var import_jsx_runtime18 = require("react/jsx-runtime");
var DashedContainer = import_react9.default.forwardRef((_a, ref) => {
  var _b = _a, { dense, type = "default", childClassName } = _b, props = __objRest(_b, ["dense", "type", "childClassName"]);
  const { className, children } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "div",
    __spreadProps(__spreadValues({
      ref
    }, props), {
      className: clsx_default(
        "transition-all  group/dashedContainer py-12 cursor-pointer w-full h-full rounded-sm border-2 border-dashed",
        [type == "default" && "border-blue-200 bg-blue-200/10 hover:bg-blue-200/30"],
        [type == "shadow" && "border-slate-200 bg-slate-200/10 hover:bg-slate-200/30"],
        [dense && "!p-0"],
        "text-xs uppercase  ",
        [dense && "!capitalize !border"],
        [
          props.disabled && type == "default" ? "hover:!bg-blue-200/10 !cursor-default" : "hover:!bg-slate-200/10 !cursor-default"
        ],
        className
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: cn("select-none w-full h-full flex items-center justify-center flex-col gap-1 opacity-70 text-slate-700 group-hover/dashedContainer:opacity-100 transition-all px-1", childClassName), children })
    })
  );
});
DashedContainer.displayName = "DashedContainer";
var dashed_container_default = DashedContainer;

// src/lib/upload.tsx
function upload(file, callback) {
  if (!file)
    return null;
  const reader = new FileReader();
  reader.onload = () => {
    const data = JSON.parse(reader.result);
    callback(data);
  };
  reader.readAsText(file);
}

// src/components/workspace-io/import.project.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
function ImportProject({ dense = false }) {
  const { globalDispatch } = useWorkspace();
  const handleImport = (e) => {
    const file = (e.target.files || [])[0];
    if (!file)
      return null;
    upload(file, (data) => {
      if (data.type) {
        globalDispatch({
          type: "LOAD_PROJECT",
          payload: {
            project: data
          }
        });
      }
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(dashed_container_default, { dense, type: dense ? "default" : "shadow", className: "relative overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
    "label",
    {
      htmlFor: "dropzone-file",
      className: " flex flex-col gap-1 items-center justify-center !cursor-pointer",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_lucide_react6.File, { className: "opacity-60" }),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("p", { className: "text-center px-1", children: "import project" }),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("input", { onChange: handleImport, id: "dropzone-file", type: "file", className: "cursor-pointer absolute opacity-0 h-[250%]" })
      ]
    }
  ) });
}
ImportProject.displayName = "ImportProject";
var import_project_default = ImportProject;

// src/components/workspace-io/import.workspace.tsx
var import_lucide_react7 = require("lucide-react");
var import_jsx_runtime20 = require("react/jsx-runtime");
function ImportWorkspace({ dense = false }) {
  const { globalDispatch } = useWorkspace();
  const handleImport = (e) => {
    const file = (e.target.files || [])[0];
    if (!file)
      return null;
    upload(file, (data) => {
      if (data.projects) {
        globalDispatch({
          type: "LOAD_WORKSPACE",
          payload: {
            data
          }
        });
      }
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(dashed_container_default, { dense, type: dense ? "default" : "shadow", className: "relative !overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
    "label",
    {
      htmlFor: "dropzone-workspace",
      className: "flex flex-col gap-1 items-center justify-center !cursor-pointer ",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_lucide_react7.Folder, { className: "opacity-60" }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-center", children: "import workspace" }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("input", { onChange: handleImport, id: "dropzone-workspace", type: "file", className: "cursor-pointer absolute opacity-0 h-[250%]" })
      ]
    }
  ) });
}
ImportWorkspace.displayName = "ImportWorkspace";
var import_workspace_default = ImportWorkspace;

// src/components/elements/utils/createProject.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
var AddProjectBtn = ({ dense = false }) => {
  const { globalState, selectProject } = useWorkspace();
  function addBoard() {
    const id = v4_default();
    const title = "projeto sem t\xEDtulo";
    const element = {
      id,
      position: globalState.workspace.content.length + 1,
      parent: "root",
      content: [],
      type: "project",
      style: {
        background: generateGradient()
      },
      updatedAt: /* @__PURE__ */ new Date(),
      title,
      summary: {
        parents: ["root"],
        child: []
      },
      project: id
    };
    selectProject(element);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(dashed_container_default, { dense, onClick: addBoard, className: "!cursor-pointer", children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_lucide_react8.Plus, { className: "opacity-60" }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("p", { className: "text-center px-1", children: "new project" })
  ] });
};
function CreateProject({ dense = false }) {
  if (dense) {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "w-full h-full grid grid-cols-2 gap-1 grid-rows-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(AddProjectBtn, { dense }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_project_default, { dense }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_workspace_default, { dense }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(dashed_container_default, { dense, disabled: true, type: "shadow" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: clsx_default("flex flex-col items-center justify-center gap-2 w-full my-auto"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(AddProjectBtn, {}),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("span", { className: "w-full h-full flex gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_project_default, {}),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_workspace_default, {})
    ] })
  ] });
}
CreateProject.displayName = "CreateProject";
var createProject_default = CreateProject;

// src/components/elements/task.tsx
var import_lucide_react10 = require("lucide-react");

// src/components/elements/utils/add.tsx
var import_lucide_react9 = require("lucide-react");
var import_jsx_runtime22 = require("react/jsx-runtime");
var defaultOpts = {
  board: true,
  feed: true,
  group: true,
  task: true,
  text: true,
  project: false,
  details: false,
  avatar: true
};
function AddElement(_a) {
  var _b = _a, { element, dense = false, board, permanent = false, opts } = _b, props = __objRest(_b, ["element", "dense", "board", "permanent", "opts"]);
  var _a2, _b2, _c;
  if (!opts) {
    opts = defaultOpts;
  } else {
    opts = __spreadValues(__spreadValues({}, defaultOpts), opts);
  }
  const { addElement: addElement2, projectState } = useWorkspace();
  function addAnElement(type) {
    var _a3;
    if (!element)
      return null;
    const title = type == "text" ? "insira um texto" : type + " sem t\xEDtulo";
    const parent = (element == null ? void 0 : element.id) || (board == null ? void 0 : board.id) || "root";
    const id = v4_default();
    const newElement = {
      id,
      position: Array.isArray(element == null ? void 0 : element.content) && element.content.length + 1 || 0,
      parent,
      content: [],
      style: {
        background: generateGradient()
      },
      type,
      title,
      summary: {
        child: [],
        parents: [...(element == null ? void 0 : element.summary.parents) || []]
      },
      updatedAt: /* @__PURE__ */ new Date(),
      metadata: {
        status: "IDLE",
        timer: {
          IDLE: /* @__PURE__ */ new Date()
        },
        ETA: 5,
        duration: 5
      },
      project: ((_a3 = projectState.project) == null ? void 0 : _a3.id) || ""
    };
    addElement2(newElement);
  }
  if (((_a2 = element == null ? void 0 : element.metadata) == null ? void 0 : _a2.status) === "FINISHED")
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", {});
  if (((_c = (_b2 = projectState.startedElement) == null ? void 0 : _b2.metadata) == null ? void 0 : _c.status) === "ACTIVE")
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "h-10 w-full min-w-[2.1rem]" });
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("span", { className: clsx_default("relative group/addElement flex justify-center w-full min-h-12", [dense && "h-fit"]), children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("button", { className: clsx_default("absolute top-0 bottom-0  min-h-8 opacity-0 group-hover/feed:opacity-10  group-hover/addElement:hidden w-full flex items-center justify-center"), children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_lucide_react9.Plus, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: clsx_default("h-full w-full flex items-center min-h-12 justify-center gap-1", dense && "!min-h-fit"), children: [
      opts.feed && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        Button2,
        {
          className: props.className,
          dense,
          permanent,
          icon: import_lucide_react9.RectangleVertical,
          onClick: () => addAnElement("feed")
        }
      ),
      opts.group && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        Button2,
        {
          className: props.className,
          permanent,
          dense,
          icon: import_lucide_react9.Group,
          onClick: () => addAnElement("group")
        }
      ),
      opts.task && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        Button2,
        {
          className: props.className,
          permanent,
          dense,
          icon: import_lucide_react9.RectangleHorizontal,
          onClick: () => addAnElement("task")
        }
      ),
      opts.text && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        Button2,
        {
          className: props.className,
          permanent,
          dense,
          icon: import_lucide_react9.Text,
          onClick: () => addAnElement("text")
        }
      ),
      opts.project && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        Button2,
        {
          className: props.className,
          permanent,
          dense,
          icon: import_lucide_react9.Folder,
          onClick: () => addAnElement("project")
        }
      ),
      opts.details && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        Button2,
        {
          className: props.className,
          permanent,
          dense,
          icon: import_lucide_react9.Ruler,
          onClick: () => addAnElement("details")
        }
      ),
      opts.avatar && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        Button2,
        {
          className: props.className,
          permanent,
          dense,
          icon: import_lucide_react9.Paintbrush,
          onClick: () => addAnElement("avatar")
        }
      )
    ] })
  ] });
}
function Button2({
  icon: Icon,
  onClick,
  permanent,
  dense,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
    "button",
    {
      onClick,
      className: clsx_default(
        "group/addElementBtn p-2 h-full border rounded-sm items-center justify-center flex",
        !permanent && "hidden group-hover/addElement:flex",
        dense && "!p-1",
        className
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Icon, { className: clsx_default(
        "w-4 h-4 group-hover/addElementBtn:scale-110 group-hover/addElementBtn:!opacity-100 opacity-50 transition-all delay-75",
        permanent && "opacity-60"
      ) })
    }
  );
}

// src/components/ui/paper.tsx
var import_react10 = __toESM(require("react"));
var import_jsx_runtime23 = require("react/jsx-runtime");
var Paper = import_react10.default.forwardRef((_a, ref) => {
  var _b = _a, { active = true, dense, className, status } = _b, props = __objRest(_b, ["active", "dense", "className", "status"]);
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
    "div",
    __spreadProps(__spreadValues({
      ref
    }, props), {
      className: cn(
        "w-full  rounded-sm shadow border border-y-0 border-x-8 border-slate-400 bg-slate-200 h-8 flex items-center",
        className,
        [!active && "opacity-50"],
        [status === "ACTIVE" && "bg-green-100 border-green-700/30 "],
        [status === "PAUSED" && "bg-orange-100 border-orange-700/30 "],
        [status === "FINISHED" && "bg-neutral-100 border-neutral-700/30 "]
      ),
      children: props.children
    })
  );
});
Paper.displayName = "Paper";
var paper_default = Paper;

// src/components/elements/task.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
function Task(_a) {
  var _b = _a, { element, type } = _b, props = __objRest(_b, ["element", "type"]);
  var _a2, _b2, _c, _d, _e, _f;
  const { dense = false } = props;
  const { globalDispatch, projectState } = useWorkspace();
  if (projectState.startedElement && projectState.startedElement.id !== element.id) {
    if (((_a2 = element.metadata) == null ? void 0 : _a2.status) === "ACTIVE") {
      globalDispatch({
        type: "CHANGE_STATUS",
        payload: {
          element,
          status: "PAUSED"
        }
      });
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
    paper_default,
    {
      status: (_b2 = element.metadata) == null ? void 0 : _b2.status,
      dense,
      className: clsx(
        "relative group/card w-full h-full flex-col  items-start p-1 transition-all delay-75 py-1",
        [projectState.startedElement && projectState.startedElement.id !== element.id && !((_d = (_c = projectState.startedElement.metadata) == null ? void 0 : _c.whenFinish) == null ? void 0 : _d.migrateTo) && ""]
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "flex items-center justify-between w-full gap-1", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(elements_default, { type: "text", element, raw: true }) }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "h-full w-full px-1 gap-1 flex flex-col py-1", children: [
          Array.isArray(element.content) && element.content.map((el) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(elements_default, __spreadValues({ type: el.type, element: el }, props), el.id)),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(AddElement, { type: "add", element })
        ] }),
        !dense && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "flex items-center justify-between w-full h-fit gap-1", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "w-full flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("button", { className: "p-2 rounded-full hover:bg-neutral-900/10 ", children: ((_f = (_e = element.metadata) == null ? void 0 : _e.whenFinish) == null ? void 0 : _f.migrateTo) && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react10.Link, { className: "w-4 h-4" }) }) }) })
      ]
    }
  );
}

// src/components/elements/group.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
function GroupElement(_a) {
  var _b = _a, { element, type } = _b, props = __objRest(_b, ["element", "type"]);
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(dashed_container_default, { dense: true, type: "shadow", className: "!py-1", childClassName: "!opacity-100 capitalize p-0 px-1", children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(elements_default, { type: "text", element, raw: true, className: "w-full" }),
    Array.isArray(element.content) && element.content.map((content) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(elements_default, __spreadValues({ type: content.type, element: content }, props), content.id)),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(AddElement, { element, dense: props.dense })
  ] });
}

// src/components/elements/utils/dragAndDrop.tsx
var import_react11 = __toESM(require("react"));
var import_jsx_runtime26 = require("react/jsx-runtime");
function DragAndDrop({ children, element, disabled, justDrag = false }) {
  var _a;
  const { projectDispatch, projectState } = useWorkspace();
  const [drag, setDrag] = import_react11.default.useState(false);
  function onDragOver(e) {
    if (justDrag)
      return null;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.stopPropagation();
    if (!projectState.project)
      return null;
    projectDispatch({
      type: "SET_REF_ELEMENT",
      payload: {
        element
      }
    });
  }
  function onDragStart(e) {
    e.stopPropagation();
    projectDispatch({
      type: "SELECT_ELEMENT",
      payload: {
        element
      }
    });
    setDrag(true);
  }
  function onDragEnd() {
    setDrag(false);
    if (!projectState.selectedElement)
      return null;
    if (!projectState.refElement)
      return null;
    if (projectState.selectedElement.id === element.id)
      return null;
    if (projectState.selectedElement.parent === projectState.refElement.id)
      return null;
    if (projectState.selectedElement.id === projectState.refElement.id)
      return null;
    projectDispatch({
      type: "MIGRATE_ELEMENT",
      payload: {
        to: projectState.refElement.id,
        element: __spreadProps(__spreadValues({}, projectState.selectedElement), {
          position: projectState.refElement.content.length + 1
        })
      }
    });
    projectDispatch({
      type: "DESELECT_ELEMENT"
    });
    projectDispatch({
      type: "REMOVE_REF_ELEMENT"
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    "div",
    {
      onDragOver,
      onDragStart,
      onDragEnd,
      draggable: projectState.startedElement ? ((_a = projectState.startedElement.metadata) == null ? void 0 : _a.status) !== "ACTIVE" : !disabled,
      className: clsx_default(
        "relative group/dragAndDrop cursor-pointer w-full transition-all delay-75 h-full",
        [drag || drag && (projectState == null ? void 0 : projectState.selectedElement) && (projectState == null ? void 0 : projectState.selectedElement.id) === element.id && "scale-90 opacity-50"],
        [disabled && "cursor-default h-full w-full delay-75 transition-[width]"]
      ),
      children
    }
  );
}

// src/components/elements/utils/actions.tsx
var import_react12 = __toESM(require("react"));
var import_jsx_runtime27 = require("react/jsx-runtime");
var ElementActions = import_react12.default.memo(({ element, children, opts }) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const defaultOpts2 = {
    delete: true,
    minimaze: true,
    select: true
  };
  if (!opts) {
    opts = defaultOpts2;
  } else {
    opts = __spreadValues(__spreadValues({}, defaultOpts2), opts);
  }
  const { projectState, projectDispatch, deleteElement: deleteElement2 } = useWorkspace();
  const { startCountdown } = useCountdown();
  const [select, isSelect] = import_react12.default.useState(((_a = projectState.selectedElement) == null ? void 0 : _a.id) == element.id);
  const [minimaze, setMinimaze] = import_react12.default.useState(false);
  const toogleMinimaze = () => {
    setMinimaze((prev) => !prev);
  };
  import_react12.default.useEffect(() => {
    if (projectState.selectedElement && projectState.selectedElement.id == element.id) {
      isSelect(true);
    } else {
      isSelect(false);
    }
  }, [projectState]);
  function selectElement(e) {
    e.stopPropagation();
    projectDispatch({
      type: "SELECT_ELEMENT",
      payload: {
        element
      }
    });
  }
  function deselectElement(e) {
    e.stopPropagation();
    projectDispatch({
      type: "DESELECT_ELEMENT"
    });
  }
  function setRef() {
    var _a2, _b2, _c2;
    if (projectState.startedElement && !!!((_b2 = (_a2 = projectState.startedElement.metadata) == null ? void 0 : _a2.whenFinish) == null ? void 0 : _b2.migrateTo)) {
      const newElement = __spreadProps(__spreadValues({}, projectState.startedElement), {
        metadata: __spreadProps(__spreadValues({}, projectState.startedElement.metadata), {
          status: "ACTIVE",
          whenFinish: {
            migrateTo: element.id
          }
        })
      });
      projectDispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          oldElement: projectState.startedElement,
          newElement
        }
      });
      projectDispatch({
        type: "START_ELEMENT",
        payload: {
          element: newElement
        }
      });
      startCountdown((_c2 = newElement.metadata) == null ? void 0 : _c2.duration);
    }
  }
  function openAndCloseElement(e) {
    e.stopPropagation();
    if (projectState.openedElement && projectState.openedElement.id === element.id) {
      projectDispatch({
        type: "REMOVE_OPEN_ELEMENT"
      });
      return;
    }
    projectDispatch({
      type: "OPEN_ELEMENT",
      payload: {
        element
      }
    });
  }
  const couldElementBeLinked = projectState.startedElement && projectState.startedElement.id !== element.id && ((_b = projectState.startedElement.metadata) == null ? void 0 : _b.status) === "LINK" && !element.summary.parents.includes(projectState.startedElement.id) && !((_d = (_c = projectState.startedElement.metadata) == null ? void 0 : _c.whenFinish) == null ? void 0 : _d.migrateTo) && ((_e = element.metadata) == null ? void 0 : _e.status) !== "FINISHED";
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
    "div",
    {
      className: clsx_default(" select-none relative w-full h-full flex flex-col rounded-sm transition-all delay-75"),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { onMouseEnter: selectElement, onMouseLeave: deselectElement, className: clsx_default(
          "absolute -top-2 -left-0 z-50 opacity-0 h-fit w-fit pr-4 flex items-center justify-between transition-all delay-75",
          (select || couldElementBeLinked) && "opacity-100"
        ), children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "flex ", children: couldElementBeLinked ? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(ActionButton, { color: "blue", onClick: setRef, disabled: !opts.select }) : /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_jsx_runtime27.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(ActionButton, { color: "red", onClick: () => deleteElement2(element), disabled: !opts.delete }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(ActionButton, { color: "orange", onClick: toogleMinimaze, disabled: !opts.minimaze }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(ActionButton, { color: "green", onClick: openAndCloseElement, disabled: !opts.minimaze })
        ] }) }) }),
        !minimaze && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: clsx_default(
          "w-full h-full relative",
          select && "animate-pulse ",
          [(((_h = (_g = (_f = projectState.startedElement) == null ? void 0 : _f.metadata) == null ? void 0 : _g.whenFinish) == null ? void 0 : _h.migrateTo) === element.id || ((_i = projectState.startedElement) == null ? void 0 : _i.id) === element.id) && "animate-pulse "]
        ), children }),
        minimaze && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(paper_default, { status: (_j = element.metadata) == null ? void 0 : _j.status, active: !minimaze, children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(elements_default, { className: "text-center w-full !capitalize", type: "text", element, raw: true }) })
      ]
    }
  );
});
function ActionButton({ disabled, onClick, color }) {
  const colorStyle = {
    blue: {
      button: "hover:bg-blue-900/10",
      div: "bg-blue-500"
    },
    orange: {
      button: "hover:bg-orange-900/10",
      div: "bg-orange-500"
    },
    red: {
      button: "hover:bg-red-900/10",
      div: "bg-red-500"
    },
    green: {
      button: "hover:bg-green-900/10",
      div: "bg-green-500"
    }
  }[color];
  return !disabled && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("button", { className: clsx_default("z-50 relative flex items-center justify-center p-[.125rem] rounded-full", colorStyle.button), onClick, children: [
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: clsx_default("w-3 h-3  rounded-full", colorStyle.div) }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "absolute w-2 h-2 bg-white/20 rounded-full" })
  ] });
}
ElementActions.displayName = "ElementActions";
var actions_default = ElementActions;

// src/components/ui/scroll-area.tsx
var React17 = __toESM(require("react"));
var ScrollAreaPrimitive = __toESM(require("@radix-ui/react-scroll-area"));
var import_jsx_runtime28 = require("react/jsx-runtime");
var ScrollArea = React17.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
    ScrollAreaPrimitive.Root,
    __spreadProps(__spreadValues({
      ref,
      className: cn("relative overflow-hidden", className)
    }, props), {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ScrollBar, {}),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ScrollAreaPrimitive.Corner, {})
      ]
    })
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBar = React17.forwardRef((_a, ref) => {
  var _b = _a, { className, orientation = "vertical" } = _b, props = __objRest(_b, ["className", "orientation"]);
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    __spreadProps(__spreadValues({
      ref,
      orientation,
      className: cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className
      )
    }, props), {
      children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
    })
  );
});
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

// src/components/elements/feed.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
function Feed(_a) {
  var _b = _a, { element, type } = _b, props = __objRest(_b, ["element", "type"]);
  var _a2;
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
    "section",
    {
      className: "group group/feed relative flex flex-col h-full gap-1 ",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(paper_default, { status: (_a2 = element.metadata) == null ? void 0 : _a2.status, className: clsx_default("absolute z-40 top-0"), children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          elements_default,
          __spreadProps(__spreadValues({
            raw: true,
            type: "text",
            element
          }, props), {
            className: clsx_default(
              "w-full h-full capitalize text-sm text-center leading-4 line-clamp-1 flex items-center justify-center whitespace-nowrap px-8",
              props.dense && "text-xs"
            )
          })
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(ScrollArea, { style: props.style, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("section", { className: " flex flex-col gap-1 pt-9  bg-slate-200/30 rounded-sm px-1", children: [
          (element.content || []).sort((a, b) => (a.position || 0) - (b.position || 0)).map((el) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(elements_default, __spreadValues({ type: el.type, element: el, parentName: element.id }, props), el.id)),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(AddElement, { element, parentName: element.id, dense: props.dense })
        ] }) })
      ]
    }
  );
}

// src/components/elements/board.tsx
var import_react13 = __toESM(require("react"));

// src/components/ui/resizable.tsx
var import_lucide_react11 = require("lucide-react");
var ResizablePrimitive = __toESM(require("react-resizable-panels"));
var import_jsx_runtime30 = require("react/jsx-runtime");
var ResizablePanelGroup = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    ResizablePrimitive.PanelGroup,
    __spreadValues({
      className: cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:grid",
        className
      )
    }, props)
  );
};
var ResizablePanel = ResizablePrimitive.Panel;
var ResizableHandle = (_a) => {
  var _b = _a, {
    withHandle,
    className
  } = _b, props = __objRest(_b, [
    "withHandle",
    "className"
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    ResizablePrimitive.PanelResizeHandle,
    __spreadProps(__spreadValues({
      className: cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )
    }, props), {
      children: withHandle && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_lucide_react11.GripVertical, { className: "h-2.5 w-2.5" }) })
    })
  );
};

// src/components/elements/board.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
var Board = import_react13.default.memo((_a) => {
  var _b = _a, { element } = _b, props = __objRest(_b, ["element"]);
  const { globalState, projectState } = useWorkspace();
  if (!projectState.project)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "flex flex-col w-full h-full", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: clsx_default("w-full h-full flex relative ", globalState.workspace.content.length === 0 && "hidden"), children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("section", { className: "flex  w-full px-2", children: [
    (element == null ? void 0 : element.content.length) > 0 && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
      ResizablePanelGroup,
      {
        direction: "horizontal",
        className: "items-center justify-center grid-cols-5 gap-1",
        children: element.content.slice(0, 6).filter((el) => el.title !== void 0).map((feed, index) => /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_react13.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(ResizablePanel, { minSize: 20, className: "h-full pt-2 ", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
            elements_default,
            __spreadProps(__spreadValues({}, props), {
              type: feed.type,
              element: feed,
              style: {
                maxHeight: projectState.openedElement ? `calc(100vh - 7rem - 2rem)` : `calc(100vh - 3.5rem - 2rem)`
              }
            })
          ) }),
          index <= element.content.slice(0, 6).length - 2 && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(ResizableHandle, { className: "h-full" }, feed.id + index + 100)
        ] }, feed.id + index))
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: clsx_default((element == null ? void 0 : element.content.length) > 0 ? "w-fit h-fit flex pl-1 pt-[.45rem]" : "w-full h-full px-1 flex items-center justify-center transition-all delay-75"), children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
      AddElement,
      {
        type: "add",
        element,
        permanent: true,
        dense: true,
        className: "!p-2",
        opts: {
          board: false,
          task: false,
          group: false,
          text: false,
          project: false,
          avatar: false
        }
      }
    ) })
  ] }) }) });
});
Board.displayName = "BoardFeeds";
var board_default = Board;

// src/components/elements/project.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
function ElementProject(_a) {
  var _b = _a, { element } = _b, props = __objRest(_b, ["element"]);
  const { projectDispatch } = useWorkspace();
  function onClick() {
    projectDispatch({
      type: "LOAD_DATA",
      payload: { element }
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
    "div",
    {
      onClick,
      className: "!select-none relative group/board w-full h-44 flex flex-col justify-between border rounded-sm text-sm cursor-pointer ring ring-transparent hover:ring-blue-300/30 active:shadow-none overflow-hidden",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "absolute  h-full w-full bg-blue-300/10 opacity-30 ", style: { background: element.style.background, backgroundSize: "200%" } }),
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: " py-1 w-full bg-white/20 backdrop-blur-md" }),
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "w-full h-10 bg-white/50 backdrop-blur-md flex items-center transition-all", children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("p", { className: "px-2 w-full line-clamp-2 leading-3 font-semibold select-none text-[11px] m-auto text-neutral-800/70 transition-all", children: element.title }) })
      ]
    }
  );
}
ElementProject.displayName = "ElementProject";
var project_default = ElementProject;

// src/components/elements/avatar.tsx
var import_jsx_runtime33 = require("react/jsx-runtime");
var AvatarElement = (_a) => {
  var _b = _a, { element } = _b, props = __objRest(_b, ["element"]);
  var _a2;
  const { updateElement: updateElement2 } = useWorkspace();
  function changeColor(newColor) {
    updateElement2(element, __spreadProps(__spreadValues({}, element), {
      style: __spreadProps(__spreadValues({}, element.style), {
        background: newColor.hex
      })
    }));
  }
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
    avatar_default,
    __spreadProps(__spreadValues({}, props), {
      callback: changeColor,
      editable: props.editable ? props.editable : true,
      style: {
        background: ((_a2 = element.style) == null ? void 0 : _a2.background) || "rgba(252,176,69,1)"
      }
    })
  );
};
AvatarElement.displayName = "AvatarElement";
var avatar_default2 = AvatarElement;

// src/components/elements/index.tsx
var import_jsx_runtime34 = require("react/jsx-runtime");
function Element(props) {
  switch (props.type) {
    case "avatar":
      if (props.raw)
        return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(avatar_default2, __spreadValues({}, props));
      return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DragAndDrop, { element: props.element, justDrag: true, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(actions_default, __spreadProps(__spreadValues({}, props), { opts: { minimaze: false, select: false }, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(avatar_default2, __spreadValues({}, props)) })) });
    case "board":
      return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(board_default, __spreadValues({}, props));
    case "task":
      if (props.raw)
        return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Task, __spreadValues({}, props));
      return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DragAndDrop, { element: props.element, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(actions_default, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Task, __spreadValues({}, props)) })) });
    case "add":
      return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(AddElement, __spreadValues({}, props));
    case "text":
      if (props.raw)
        return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(TextElement, __spreadValues({}, props));
      return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DragAndDrop, { element: props.element, justDrag: true, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(actions_default, __spreadProps(__spreadValues({ opts: { minimaze: false, select: false } }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(TextElement, __spreadValues({}, props)) })) });
    case "group":
      if (props.raw)
        return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(GroupElement, __spreadValues({}, props));
      return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DragAndDrop, { element: props.element, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(actions_default, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(GroupElement, __spreadValues({}, props)) })) });
    case "feed":
      if (props.raw)
        return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Feed, __spreadValues({}, props));
      return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DragAndDrop, { element: props.element, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(actions_default, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Feed, __spreadValues({}, props)) })) });
    case "project":
      return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(actions_default, __spreadProps(__spreadValues({}, props), { opts: { minimaze: false, select: false }, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(project_default, __spreadValues({}, props)) }));
    default:
      return null;
  }
}
Element.displayName = "RecursiveElement";
var elements_default = Element;

// src/components/elements/utils/config.tsx
var import_jsx_runtime35 = require("react/jsx-runtime");
function ConfigElement({ element }) {
  const { updateElement: updateElement2 } = useWorkspace();
  function changeColor(color) {
    updateElement2(element, __spreadProps(__spreadValues({}, element), {
      style: {
        background: color.hex
      }
    }));
  }
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("section", { className: "max-w-screen-lg mx-auto w-full h-full py-8", children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "w-full flex justify-center flex-col max-w-[640px] mx-auto gap-8", children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
    AvatarEditor,
    {
      callback: changeColor,
      style: {
        background: element.style.background
      }
    }
  ) }) });
}
ConfigElement.displayName = "ConfigElement";
var config_default = ConfigElement;

// src/components/flowboard.workspace.tsx
var import_jsx_runtime36 = require("react/jsx-runtime");
function Workspace() {
  const { globalState, projectState } = useWorkspace();
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("section", { className: "h-[100vh] flex flex-col justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(appbar_default, {}),
    !globalState.configMode && globalState.workspace.content.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("div", { className: clsx_default("h-full max-w-screen-xl mx-auto w-full px-2 flex flex-col", projectState.project && "hidden"), children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("span", { className: "h-1/2 w-full", children: globalState.workspace.content.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("section", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 py-6 gap-1 w-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("span", { className: "min-h-44", children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(createProject_default, { dense: true }) }),
      globalState.workspace.content.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).map((project) => project.type === "project" && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(elements_default, { element: project, type: "project" }, project.id + "root"))
    ] }) }) }),
    globalState.workspace.content.length == 0 && !globalState.configMode && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("span", { className: "h-full max-w-screen-xl mx-auto w-full px-2 flex", children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(createProject_default, {}) }),
    projectState.project && !projectState.configMode && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(elements_default, { element: projectState.project, type: "board" }),
    projectState.project && projectState.configMode && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(config_default, { element: projectState.project }),
    !projectState.project && globalState.configMode && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(config_default, { element: globalState.workspace }),
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(Footer, {})
  ] });
}
function Footer() {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("nav", { className: "select-none flex border-t text-neutral-200  items-center justify-end px-2 max-h-6 min-h-6 w-full " });
}
Workspace.displayName = "Workspace";
var flowboard_workspace_default = Workspace;

// src/components/ui/toast.tsx
var React19 = __toESM(require("react"));
var ToastPrimitives = __toESM(require("@radix-ui/react-toast"));
var import_class_variance_authority3 = require("class-variance-authority");
var import_lucide_react12 = require("lucide-react");
var import_jsx_runtime37 = require("react/jsx-runtime");
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = React19.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    ToastPrimitives.Viewport,
    __spreadValues({
      ref,
      className: cn(
        "select-none fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-2 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )
    }, props)
  );
});
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
var toastVariants = (0, import_class_variance_authority3.cva)(
  "group select-none pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border px-6 py-4 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Toast = React19.forwardRef((_a, ref) => {
  var _b = _a, { className, variant } = _b, props = __objRest(_b, ["className", "variant"]);
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    ToastPrimitives.Root,
    __spreadValues({
      ref,
      className: cn(toastVariants({ variant }), className, "select-none")
    }, props)
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = React19.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    ToastPrimitives.Action,
    __spreadValues({
      ref,
      className: cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className
      )
    }, props)
  );
});
ToastAction.displayName = ToastPrimitives.Action.displayName;
var ToastClose = React19.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    ToastPrimitives.Close,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
        className
      ),
      "toast-close": ""
    }, props), {
      children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react12.X, { className: "h-4 w-4" })
    })
  );
});
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = React19.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    ToastPrimitives.Title,
    __spreadValues({
      ref,
      className: cn("select-none text-sm", className)
    }, props)
  );
});
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = React19.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    ToastPrimitives.Description,
    __spreadValues({
      ref,
      className: cn("select-none text-sm opacity-90", className)
    }, props)
  );
});
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// src/components/ui/toaster.tsx
var import_jsx_runtime38 = require("react/jsx-runtime");
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(ToastProvider, { children: [
    toasts.map(function(_a) {
      var _b = _a, { id, title, description, action } = _b, props = __objRest(_b, ["id", "title", "description", "action"]);
      return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Toast, __spreadProps(__spreadValues({}, props), { children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "grid gap-1 !select-none", children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(ToastTitle, { children: title }),
          description && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(ToastClose, {})
      ] }), id);
    }),
    /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(ToastViewport, {})
  ] });
}

// src/components/index.tsx
var import_jsx_runtime39 = require("react/jsx-runtime");
function FlowBoard() {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(WorkspaceProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(CountdownProvider, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(flowboard_workspace_default, {}),
    /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(Toaster, {})
  ] }) });
}
FlowBoard.displayName = "FlowBoard";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FlowBoard
});
//# sourceMappingURL=index.js.map