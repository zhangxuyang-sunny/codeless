import { IApplicationConfig } from "packages/x-core/src/types/manager";
import {
  IApplicationSchema,
  IComponentSchema,
  IDatasetSchema
} from "packages/x-core/src/types/schemas/project";

export const host = process.env.NODE_ENV !== "production" ? "127.0.0.1:7890" : "119.91.65.70:3000";

const component_1: IComponentSchema = {
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

const component_2: IComponentSchema = {
  id: "component_2",
  src: `http://${host}/static/components/arco/Button.js`,
  className: "",
  css: "",
  style: {
    type: "JSExpression",
    value: "context.datasets.dataset_2.style",
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
      value: "context.datasets.dataset_2.tableLoading",
      reactive: true
    },
    onClick: {
      type: "JSFunction",
      value: `async function (e) {
                console.log("this", this)
                console.log("context", context)
                console.log("e", e)
                context.datasets.dataset_2.tableLoading = !context.datasets.dataset_1.tableLoading;
                context.datasets.dataset_2.style.margin = "0 100px";
                await new Promise((resolve) => setTimeout(resolve, 1000));
                context.datasets.dataset_2.tableLoading = false;
                context.datasets.dataset_2.style.margin = "0";
              }`,
      useStrict: false
    }
  },
  slots: {},
  emits: [],
  listeners: []
};

const container: IComponentSchema = {
  id: "container",
  src: `http://${host}/static/components/common/EmptyContainer.js`,
  className: "",
  css: "",
  style: {},
  props: {},
  slots: {
    default: [component_1, component_2]
  },
  emits: [],
  listeners: []
};

const dataset1: IDatasetSchema = {
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

const dataset2: IDatasetSchema = {
  id: "dataset_2",
  type: "pinia",
  name: "dataset_2",
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

const applicationConfig: IApplicationConfig = {
  id: "app_1",
  config: {
    router: {
      base: "/",
      mode: "history",
      meta: {}
    },
    pages: [
      {
        id: "page_1",
        name: "home",
        path: "/home",
        title: "页面1",
        component: {
          id: "container",
          version: "0.0.1"
        }
      }
    ],
    datasets: [
      {
        dataset: {
          id: "dataset_1",
          version: "0.0.1"
        },
        name: "dataset_1"
      },
      {
        dataset: {
          id: "dataset_2",
          version: "0.0.1"
        },
        name: "dataset_2"
      }
    ]
  },
  resource: {
    datasets: [dataset1],
    components: [component_1]
  }
};

const applicationSchema: IApplicationSchema = {
  id: "app_1",
  router: applicationConfig.config.router,
  pages: [
    {
      name: "home",
      path: "/",
      component: container
    }
  ],
  datasets: [dataset1, dataset2]
};

export { applicationConfig, applicationSchema };

console.log({
  applicationConfig,
  applicationSchema
});
