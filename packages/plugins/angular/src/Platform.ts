import { PlatformRef, StaticProvider, NgModuleRef } from "@angular/core/";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { NgModuleFactory } from "@angular/core/src/render3";

enum PlatformDefs {
  Dynamic
}

interface NgWindow {
  ngRef: NgModuleRef<any>;
}

export const hot = (boot: Promise<NgModuleFactory<any>>) => {
  boot.then((ref: NgModuleFactory<any>) => {
    // Ensure Angular destroys itself on hot reloads.
    const ngRef: NgModuleRef<any> | undefined = (window as any).ngRef;
    if (ngRef) {
      (ngRef as NgModuleRef<any>).destroy();
    }
    (window as any)["ngRef"] = ref;
  });
};

export const Platform: {
  [key in PlatformDefs]: (providers: StaticProvider[] | undefined) => PlatformRef
} = {
  [PlatformDefs.Dynamic]: platformBrowserDynamic
};
