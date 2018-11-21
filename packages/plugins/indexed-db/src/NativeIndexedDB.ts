interface VendorWindowSpec extends Window {
  indexdDB: IDBDatabase;
  mozIndexedDB: IDBDatabase;
  webkitIndexedDB: IDBDatabase;
  msIndexedDB: IDBDatabase;
  IDBTransaction: IDBTransaction;
  webkitIDBTransaction: IDBTransaction;
  msIDBTransaction: IDBTransaction;
  IDBKeyRange: IDBKeyRange;
  webkitIDBKeyRange: IDBKeyRange;
  msIDBKeyRange: IDBKeyRange;
}

export const IndexedDB =
  window.indexedDB ||
  (window as VendorWindowSpec).mozIndexedDB ||
  (window as VendorWindowSpec).webkitIndexedDB ||
  (window as VendorWindowSpec).msIndexedDB;

export const Transaction =
  (window as VendorWindowSpec).IDBTransaction ||
  (window as VendorWindowSpec).webkitIDBTransaction ||
  (window as VendorWindowSpec).msIDBTransaction;

export const KeyRange =
  (window as VendorWindowSpec).IDBKeyRange ||
  (window as VendorWindowSpec).webkitIDBKeyRange ||
  (window as VendorWindowSpec).msIDBKeyRange;

// needed for internal ref, see MDN docs
Object.defineProperties(window, {
  indexedDB: {
    value: IndexedDB,
    writable: false
  },
  IDBTransaction: {
    value: Transaction,
    writable: false
  },
  IDBKeyRange: {
    value: KeyRange,
    writable: false
  }
});
