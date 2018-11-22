import { GondelComponent, Component, startComponents, getComponentByDomNode } from "@gondel/core";
import { GondelAngularComponent } from "./GondelAngularComponent";
import { NgModuleFactory } from "@angular/core/src/render3";
import { NgModuleRef } from "@angular/core";

function createMockElement<T extends GondelComponent>(namespace: string = "g") {
  const demoElement = document.createElement("div");
  demoElement.innerHTML = `<p>Loading...</p>`;
  demoElement.setAttribute("data-" + namespace + "-name", "DemoComponent");
  document.documentElement!.appendChild(demoElement);
  startComponents(demoElement, namespace);
  return getComponentByDomNode<T>(demoElement, namespace)!;
}

describe("@gondel/plugin-angular", () => {
  it("should boot a single component without crashing", () => {
    @Component("DemoComponent")
    class DemoComponent extends GondelAngularComponent {
      public ref: NgModuleRef<any>;

      async load() {
        const {
          AppModule
        }: {
          AppModule: NgModuleFactory<{}>;
        } = await import(/* webpackChunkName: "demoModule" */ "../test/fixtures/app/dist/ngc/src/app/app.module.ngfactory.js");
        return AppModule;
      }

      async start() {
        const AppModule = await this.load();
        this.ref = await this.bootstrapModuleFactory(undefined, AppModule);
      }
    }

    const component = createMockElement<DemoComponent>("g");
    expect(component).toMatchSnapshot();
    expect(component.ref).toBeDefined();
    expect(component.ref).toMatchSnapshot();
  });
});
