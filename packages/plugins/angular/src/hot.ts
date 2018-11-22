import { NgModuleRef } from "@angular/core";
import { NgModuleFactory } from "@angular/core/src/render3";

export const hot = (ref: NgModuleFactory<any>) => {
  // ensure Angular destroys itself on hot reloads.
  const ngRef: NgModuleRef<any> | undefined = (window as any).ngRef;
  if (ngRef) {
    (ngRef as NgModuleRef<any>).destroy();
  }
  (window as any)["ngRef"] = ref;
};
