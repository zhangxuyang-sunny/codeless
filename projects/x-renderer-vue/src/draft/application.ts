import { ApplicationConfig } from "packages/x-core/src/types/manager";
import {
  ApplicationSchema,
  ComponentSchema,
  DatasetSchema
} from "packages/x-core/src/types/schemas/application";

export const host = process.env.NODE_ENV !== "production" ? "127.0.0.1:7890" : "119.91.65.70:3000";

const component: ComponentSchema = {
  id: "component_1",
  src: `http://${host}/static/components/arco/Button.js`,
  className: "",
  css: "",
  style: {
    type: "JSExpression",
    value: "context.datasets.dataset_1.style",
    reactive: true
  },
  props: {
    type: {
      type: "JSExpression",
      value: "'primary'",
      reactive: false
    },
    loading: {
      type: "JSExpression",
      value: "context.datasets.dataset_1.tableLoading",
      reactive: true
    },
    onClick: {
      type: "JSFunction",
      value: `async function (e) {
              console.log("this", this)
              console.log("context", context)
              console.log("e", e)
              context.datasets.dataset_1.tableLoading = !context.datasets.dataset_1.tableLoading;
              context.datasets.dataset_1.style.margin = "0 100px";
              await new Promise((resolve) => setTimeout(resolve, 1000));
              context.datasets.dataset_1.tableLoading = false;
              context.datasets.dataset_1.style.margin = "0";
            }`,
      useStrict: false
    }
  },
  slots: {},
  emits: [],
  listeners: []
};

const dataset1: DatasetSchema = {
  id: "dataset_1",
  type: "pinia",
  name: "dataset_1",
  define: {
    type: "JSExpression",
    reactive: false,
    value: `{
      state: () => ({
        tableLoading: false,
        style: {
          margin: "0"
        }
      }),
      actions: {
        setLoading(status) {
          this.loading = status
        }
      },
      getters: {
        loadStatus(state) {
          return state.loading;
        }
      }
    }`
  }
};

const applicationConfig: ApplicationConfig = {
  id: "app_1",
  router: {
    base: "/",
    mode: "history"
  },
  pages: [
    {
      component: {
        id: "component_1",
        version: "0.0.1"
      },
      name: "home",
      path: "/home"
    }
  ],
  datasets: [
    {
      dataset: {
        id: "dataset_1",
        version: "0.0.1"
      },
      name: "dataset_1"
    }
  ],
  resource: {
    datasets: [dataset1],
    components: [component]
  }
};

const applicationSchema: ApplicationSchema = {
  id: "app_1",
  router: applicationConfig.router,
  pages: [
    {
      name: "home",
      path: "/",
      component
    }
  ],
  datasets: [dataset1]
};

export { applicationConfig, applicationSchema };

console.log({
  applicationConfig,
  applicationSchema
});
