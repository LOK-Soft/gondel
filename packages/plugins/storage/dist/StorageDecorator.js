import { localStorageAdapter } from "./Adapter";
// the default storage to use, better for switching whole projects
// to another storage type e.g. from local- to sessionstorage.
var internalDefaultStorageAdapter = localStorageAdapter;
function createStorageBindings(_a) {
    var target = _a.target, propertyKey = _a.propertyKey, _b = _a.storeKey, storeKey = _b === void 0 ? propertyKey : _b, _c = _a.storageAdapter, storageAdapter = _c === void 0 ? internalDefaultStorageAdapter : _c, serializer = _a.serializer;
    // TODO: should we use the component class name as prefix or sth?
    // const componentKey = target.constructor.name;
    Object.defineProperty(target, propertyKey, {
        get: function () {
            return storageAdapter.get(storeKey, serializer);
        },
        set: function (value) {
            storageAdapter.set(storeKey, value, serializer);
        }
    });
}
export var setDefaultStorageAdapter = function (adapter) { return internalDefaultStorageAdapter = adapter; };
export function storage(targetOrStoreKey, propertyKeyOrSerializer, storageAdapter) {
    // First case will be used if we have a custom attribute and a valid serializer (which is typeof Serializer)
    if (typeof targetOrStoreKey === "string" && typeof propertyKeyOrSerializer !== "string") {
        var storeKey_1 = targetOrStoreKey;
        var serializer_1 = propertyKeyOrSerializer;
        return function (target, propertyKey) {
            createStorageBindings({
                target: target,
                storageAdapter: storageAdapter,
                storeKey: storeKey_1,
                propertyKey: propertyKey,
                serializer: serializer_1
            });
        };
    }
    if (typeof targetOrStoreKey === "string" || typeof propertyKeyOrSerializer !== "string") {
        // this case should not occur, the only case could be a respec of the decorators
        throw new Error("Unexpected usage of @storage");
    }
    var target = targetOrStoreKey;
    var propertyKey = propertyKeyOrSerializer;
    // create simple bindings for @storage
    createStorageBindings({
        target: target,
        propertyKey: propertyKey
    });
}
//# sourceMappingURL=StorageDecorator.js.map