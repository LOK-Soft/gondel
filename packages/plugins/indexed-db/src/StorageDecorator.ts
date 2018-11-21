import { GondelComponent } from "@gondel/core";

/**
 * The @storage prop decorator will sync the selected value into a components index cache
 */
export function storage(version?: number) {
  return function<T extends GondelComponent>(target: T, propertyKey: string): void {
    const { _namespace, _componentName } = target;

    console.log(
      "storage binding to table %s_%s and item %s @v%s",
      _namespace,
      _componentName,
      propertyKey,
      version
    );
  };
}
