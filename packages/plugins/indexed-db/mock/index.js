const { IDBFactory, IDBKeyRange } = require("shelving-mock-indexeddb");
window = window || global.window || global;
global = window;

// Create an IDBFactory at window.indexedDB so your code can use IndexedDB.
window.indexedDB = new IDBFactory();

// Make IDBKeyRange global so your code can create key ranges.
window.IDBKeyRange = IDBKeyRange;
