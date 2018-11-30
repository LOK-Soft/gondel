import { GondelComponent } from "@gondel/core";
import { Adapter, ISerializer, localStorageAdapter } from "./Adapter";

type GondelComponentWithStorage = GondelComponent & {
  __gondelStoragePlugin?: boolean;
};

type GondelComponentDecorator<T> = (target: T, propertyKey: string) => void;

type CreateStoreBindingsArgs<T> = {
  target: T;
  propertyKey: string;
  storeKey?: string;
  storageAdapter?: Adapter;
  serializer?: ISerializer;
};

function createStorageBindings<T extends GondelComponentWithStorage>({
  target,
  propertyKey,
  storeKey = propertyKey,
  storageAdapter = localStorageAdapter,
  serializer
}: CreateStoreBindingsArgs<T>): void {
  // TODO: should we use the component class name as prefix or sth?
  // const componentKey = target.constructor.name;
  Object.defineProperty(target, propertyKey, {
    get() {
      return storageAdapter.get(storeKey, serializer);
    },
    set(value: any) {
      storageAdapter.set(storeKey, value, serializer);
    }
  });
}

export function storage<T extends GondelComponentWithStorage>(target: T, propertyKey: string): void;
export function storage<T extends GondelComponentWithStorage>(
  customAttributeKey: string,
  serializer?: ISerializer,
  storageAdapter?: Adapter
): GondelComponentDecorator<T>;
export function storage<T extends GondelComponentWithStorage>(
  targetOrStoreKey: T | string,
  propertyKeyOrSerializer: string | ISerializer | undefined,
  storageAdapter?: Adapter
): void | GondelComponentDecorator<T> {
  // First case will be used if we have a custom attribute and a valid serializer (which is typeof Serializer)
  if (typeof targetOrStoreKey === "string" && typeof propertyKeyOrSerializer !== "string") {
    const storeKey = targetOrStoreKey;
    const serializer = propertyKeyOrSerializer;

    return function<T extends GondelComponentWithStorage>(target: T, propertyKey: string): void {
      target.__gondelStoragePlugin = true;
      createStorageBindings({
        target,
        storageAdapter,
        storeKey,
        propertyKey,
        serializer
      });
    };
  }

  if (typeof targetOrStoreKey === "string" || typeof propertyKeyOrSerializer !== "string") {
    // this case should not occur, the only case could be a respec of the decorators
    throw new Error("Unexpected usage of @storage");
  }

  const target = targetOrStoreKey;
  const propertyKey = propertyKeyOrSerializer;

  target.__gondelStoragePlugin = true;

  // create simple bindings for @storage
  createStorageBindings({
    target,
    propertyKey
  });
}
