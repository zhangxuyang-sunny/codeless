import { Application, Component } from "@codeless/schema";

export function processSchema(
  app: Application,
  options: {
    host: string;
  }
): Application {
  function resolveSrc(src: string) {
    return options.host + src;
  }

  function processComponent(component: Component): Component {
    const slots: Component["slots"] = {};
    for (const sn in component.slots) {
      slots[sn] = component.slots[sn]?.map(item => ({
        ...item,
        src: resolveSrc(item.src)
      }));
    }
    return {
      ...component,
      src: resolveSrc(component.src),
      slots: slots
    };
  }

  return {
    ...app,
    pages: app.pages.map(page => ({
      ...page,
      component: processComponent(page.component)
    })),
    functions: app.functions.map(item => ({
      ...item,
      src: resolveSrc(item.src)
    }))
  };
}
