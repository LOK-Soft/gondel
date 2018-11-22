import { GondelBaseComponent } from "@gondel/core";
import { PlatformRef, StaticProvider, Type, NgModuleRef } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { NgModuleFactory } from "@angular/core/src/render3";
import { BootstrapOptions } from "@angular/core/src/application_ref";

export class GondelAngularComponent extends GondelBaseComponent {
  public static globalPlatformRef: PlatformRef;

  protected bootstrapModuleFactory<T extends {}>(
    extraProviders: StaticProvider[] | undefined,
    moduleFactory: NgModuleFactory<{}>,
    options?: BootstrapOptions | undefined
  ): Promise<NgModuleRef<T>> {
    return new Promise((resolve, reject) => {
      platformBrowserDynamic(extraProviders)
        .bootstrapModuleFactory(moduleFactory, options)
        .then((factory: NgModuleRef<{}>) => {
          resolve(factory as NgModuleRef<any>);
        })
        .catch(reject);
    });
  }

  protected bootstrapModule<T extends {}>(
    extraProviders: StaticProvider[] | undefined,
    rawModule: Type<{}>,
    options?: BootstrapOptions | undefined
  ): Promise<NgModuleRef<T>> {
    return new Promise((resolve, reject) => {
      platformBrowserDynamic(extraProviders)
        .bootstrapModule(rawModule, options)
        .then((factory: NgModuleRef<{}>) => {
          resolve(factory as NgModuleRef<any>);
        })
        .catch(reject);
    });
  }
}
