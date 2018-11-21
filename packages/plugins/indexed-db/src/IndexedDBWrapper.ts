import { IndexedDB, Transaction } from "./NativeIndexedDB";
import { VERSION } from "./Configuration";

export interface IIndexedDBEntry {
  id: string;
}

class IndexedDBWrapperError extends Error {
  constructor(method: string, message?: string) {
    super(`Transaction:${method}: ${message || "unknown error occured"}`);
  }
}

const throwOnInvalidConnection = (
  database: IDBDatabase | undefined,
  method: string,
  reject: (err: IndexedDBWrapperError) => void
) => {
  if (!database) {
    reject(
      new IndexedDBWrapperError(
        method,
        `connection is not established, probably connect() call missing`
      )
    );
  }
};

export class IndexedDBWrapper {
  private database: IDBDatabase;

  constructor(private name: string, private version: number = VERSION) {}

  public async connect(): Promise<any> {
    return this.establishInternalConnection();
  }

  public get<T extends Object>(idOrEntry: string | IIndexedDBEntry): Promise<T & IIndexedDBEntry> {
    return new Promise((resolve, reject) => {
      console.log("get", this.database);
      throwOnInvalidConnection(this.database, "get", reject);

      const transaction: IDBRequest = this.database
        .transaction([this.name])
        .objectStore(this.name)
        .get(typeof idOrEntry === "string" ? idOrEntry : idOrEntry.id);

      transaction.onerror = () => {
        reject(
          new IndexedDBWrapperError(
            "get",
            transaction.error ? transaction.error.message : undefined
          )
        );
      };

      transaction.onsuccess = () => {
        resolve(transaction.result as T & IIndexedDBEntry);
      };
    });
  }

  public set<T extends IIndexedDBEntry>(data: T): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log("set", this.database);
      throwOnInvalidConnection(this.database, "set", reject);

      const transaction = this.database
        .transaction([this.name], "readwrite")
        .objectStore(this.name)
        .add(data);

      transaction.onsuccess = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(
          new IndexedDBWrapperError(
            "set",
            transaction.error ? transaction.error.message : undefined
          )
        );
      };
    });
  }

  public delete(idOrEntry: string | IIndexedDBEntry): Promise<void> {
    return new Promise((resolve, reject) => {
      throwOnInvalidConnection(this.database, "delete", reject);
      const transaction = this.database
        .transaction([this.name], "readwrite")
        .objectStore(this.name)
        .delete(typeof idOrEntry === "string" ? idOrEntry : idOrEntry.id);

      transaction.onsuccess = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(
          new IndexedDBWrapperError(
            "delete",
            transaction.error ? transaction.error.message : undefined
          )
        );
      };
    });
  }

  public __dangerouslyAccessInternalDatabase(): IDBDatabase {
    return this.database;
  }

  private establishInternalConnection(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const self = this;
      const transaction = IndexedDB.open(this.name, this.version);

      transaction.onerror = () => {
        reject(
          new IndexedDBWrapperError(
            "connect",
            transaction.error ? transaction.error.message : undefined
          )
        );
      };

      transaction.onsuccess = (event: Event) => {
        this.database = transaction.result;

        resolve(this.database);
      };

      transaction.onupgradeneeded = function(event: IDBVersionChangeEvent) {
        if (event.newVersion && event.oldVersion < event.newVersion) {
          ((event.target as any).result as IDBDatabase).createObjectStore(self.name, {
            keyPath: "id"
          });
        }
      };
    });
  }
}
