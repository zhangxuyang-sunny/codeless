const projectSchema = {
  version: "0.0.1",
  api: {},
  componentMap: {
    Root: "http://127.0.0.1:7890/ui/common/EmptyContainer.js",
    Input: "http://127.0.0.1:7890/ui/arco/Input.js",
    Button: "http://127.0.0.1:7890/ui/arco/Button.js"
  },
  dataset: {
    id: "Test",
    state: {
      form: {
        name: "",
        address: "",
        email: "",
        list: new Set()
      },
      tableLoading: false,
      tableList: [],
      // 选中的菜单 id
      tableSelect: "0"
    },
    getters: {
      isEmpty: {
        type: "JSArrowsFunction",
        value: `isEmpty: (state) => {
          return state.tableList.length === 0;
        }`
      }
    },
    actions: {
      setTableLoading: {
        type: "TSFunction",
        value: `function setTableLoading(status: boolean) {
          this.tableLoading = status;
        }`
      },
      setTableList: {
        type: "TSFunction",
        value: `function setTableList(list) {
          this.tableList = list;
        }`
      },
      setTableSelect: {
        type: "TSFunction",
        value: `setTableSelect(id: string) {
          this.tableSelect = id;
        }`
      }
    }
  },
  methods: {
    fetchList: {
      type: "TSFunction",
      value: `async function fetchList(query: typeof config.dataset.form) {
                config.dataset.setTableLoading(true);
                // this.dataset.tableLoading = true;
                return fetch(
                  'http://127.0.0.1:4523/mock/616827/list?' + qs.stringify(query)
                ).then(async (response) => {
                  const result: { data: TypeTable[] } = await response.json();
                  await new Promise((resolve) => setTimeout(resolve, 300));
                  // this.dataset.tableLoading = false;
                  // this.dataset.tableList = result.data.filter((item) => {
                  //   return (
                  //     (query.name ? item.name.includes(query.name) : true) &&
                  //     (query.address ? item.address.includes(query.address) : true) &&
                  //     (query.email ? item.email.includes(query.email) : true)
                  //   );
                  // });
                  config.dataset.setTableLoading(false);
                  config.dataset.setTableList(
                    result.data.filter((item) => {
                      return (
                        (query.name ? item.name.includes(query.name) : true) &&
                        (query.address ? item.address.includes(query.address) : true) &&
                        (query.email ? item.email.includes(query.email) : true)
                      );
                    })
                  );
                  Message.success('加载成功');
                });
              }`
    }
  },
  app: {
    id: "Entry_0",
    name: "入口容器",
    version: "0.0.1",
    src: "${config.componentMap.Root}",
    style: {},
    props: {},
    commonProps: {},
    slots: [
      {
        id: "Button_0",
        name: "按钮",
        version: "0.0.1",
        src: {
          type: "VariableBind",
          value: "${config.componentMap.Button}"
        },
        style: {},
        props: {
          name: {
            type: "Static",
            value: "按钮"
          },
          onVnodeMounted: {
            type: "JSFunction",
            value: `function onVnodeMounted(...args) {
                      console.log('VerticalLayout_0', args);
                    }`
          }
        },
        commonProps: {},
        slots: []
      }
    ],
    emits: [],
    listeners: []
  }
};

export default projectSchema;
