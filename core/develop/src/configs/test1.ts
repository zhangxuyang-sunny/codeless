import qs from 'qs';
import { computed } from 'vue';
import { defineStore } from 'pinia';
import { Message } from '@arco-design/web-vue';
import { TypeMaterial } from '@/types/schema/material';
import {
  createDataset,
  createElement,
  defineMethod,
  useMethods
} from '@/common/utils/index';

const RemoteMap = {
  Root: 'http://127.0.0.1:7890/dist/ui/common/EmptyContainer.js',
  Input: 'http://127.0.0.1:7890/dist/ui/arco/Input.js',
  Button: 'http://127.0.0.1:7890/dist/ui/arco/Button.js',
  DatePicker: 'http://127.0.0.1:7890/dist/ui/arco/DatePicker.js',
  VerticalLayout: 'http://127.0.0.1:7890/dist/ui/common/VerticalLayout.js',
  HorizontalLayout: 'http://127.0.0.1:7890/dist/ui/common/HorizontalLayout.js',
  FormItem: 'http://127.0.0.1:7890/dist/ui/arco/FormItem.js'
};

type TypeTable = {
  name: string;
  address: string;
  email: string;
};
type TypeDataset = {
  form: TypeTable;
  tableLoading: boolean;
  tableList: TypeTable[];
};
const dataset1 = createDataset<TypeDataset>({
  form: {
    name: '',
    address: '',
    email: ''
  },
  tableLoading: false,
  tableList: []
});

const useDataset = defineStore({
  id: 'dataset',
  state: () => ({
    form: {
      name: '',
      address: '',
      email: ''
    },
    tableLoading: false,
    tableList: [] as TypeTable[],
    // 选中的菜单 id
    tableSelect: '0'
  }),
  getters: {
    isEmpty: (state) => {
      return state.tableList.length === 0;
    }
  },
  actions: {
    setTableLoading(status: boolean) {
      this.tableLoading = status;
    },
    setTableList(list: TypeTable[]) {
      this.tableList = list;
    },
    setTableSelect(id: string) {
      this.tableSelect = id;
    }
  }
});

defineMethod({
  name: 'fetchList',
  value: async function (query: typeof dataset.form) {
    dataset.setTableLoading(true);
    // dataset.tableLoading = true;
    return fetch(
      `http://127.0.0.1:4523/mock/616827/list?${  qs.stringify(query)}`
    ).then(async (response) => {
      const result: { data: TypeTable[] } = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 300));
      // dataset.tableLoading = false;
      // dataset.tableList = result.data.filter((item) => {
      //   return (
      //     (query.name ? item.name.includes(query.name) : true) &&
      //     (query.address ? item.address.includes(query.address) : true) &&
      //     (query.email ? item.email.includes(query.email) : true)
      //   );
      // });
      dataset.setTableLoading(false);
      dataset.setTableList(
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
  }
});

const dataset = useDataset();
const methods = useMethods();

const app: TypeMaterial = {
  id: 'Entry_0',
  name: '入口容器',
  version: '0.0.1',
  src: RemoteMap.Root,
  style: {},
  props: {},
  commonProps: {},
  slots: {
    default: [
      {
        id: 'VerticalLayout_0',
        name: '纵向布局',
        version: '0.0.1',
        src: RemoteMap.VerticalLayout,
        style: {
          // minWidth: '1400px'
        },
        props: {
          onVnodeMounted(...args) {
            console.log('VerticalLayout_0', args);
          }
        },
        commonProps: {},
        slots: {
          default: [
            // createElement('RendererEntry')
            //   .setProps({
            //     configUrl: 'http://localhost:7890/dist/configs/test2.js'
            //   })
            //   .create(),
            createElement(RemoteMap.HorizontalLayout)
              .setStyle({
                borderBottom: '1px solid var(--color-border-1)',
                height: '60px',
                padding: '0 10px'
              })
              .setSlots({
                default: [
                  createElement('http://127.0.0.1:7890/dist/ui/common/Logo.js')
                    .setProps({
                      title: '平台配置页面',
                      logoUrl:
                        'https://www.webpackjs.com/32dc115fbfd1340f919f0234725c6fb4.png'
                    })
                    .create(),
                  createElement('http://127.0.0.1:7890/dist/ui/arco/Menu.js')
                    .setId('Menu_0')
                    .setName('菜单')
                    .setProps({
                      menuProps: {
                        mode: 'horizontal',
                        defaultSelectedKeys: ['0'],
                        selectedKeys: computed(() => [dataset.tableSelect]),
                        onMenuItemClick: (id: string) => {
                          dataset.setTableSelect(id);
                        }
                      },
                      config: [
                        { title: '表格', key: '0' },
                        { title: '跑马灯', key: '1' },
                        {
                          title: '含有子菜单',
                          key: '2',
                          children: [
                            { title: '子菜单1', key: '2-0' },
                            { title: '子菜单2', key: '2-1' }
                          ]
                        },
                        { type: '系统配置', key: '3' }
                      ]
                    })
                    .create()
                ]
              })
              .create(),
            createElement(RemoteMap.VerticalLayout)
              .setStyle({
                padding: '20px 30px'
              })
              .setSlots({
                default: [
                  createElement('http://127.0.0.1:7890/dist/ui/arco/Form.js')
                    .setCommonProps({
                      if: computed(() => dataset.tableSelect === '0')
                    })
                    .setProps({
                      model: computed(() => dataset.form),
                      layout: 'inline',
                      ref: (ref) => {
                        console.log({ ref });
                      }
                    })
                    .setStyle({
                      flexWrap: 'wrap',
                      height: '100px'
                    })
                    .setSlots({
                      default: [
                        createElement(RemoteMap.FormItem)
                          .setProps({
                            field: 'name',
                            label: '人员姓名'
                          })
                          .setSlots({
                            default: [
                              createElement(RemoteMap.Input)
                                .setProps({
                                  // modelValue: computed(
                                  //   () => dataset.form.name
                                  // ),
                                  'vModel:modelValue': [
                                    dataset.form.name,
                                    'modelValue'
                                  ],
                                  'placeholder': '请输入姓名'
                                })
                                .setEmit({
                                  event: 'input',
                                  invoke: (val: string) => {
                                    dataset.form.name = val;
                                  }
                                })
                                .create()
                            ]
                          })
                          .create(),
                        createElement(RemoteMap.FormItem)
                          .setProps({
                            field: 'address',
                            label: '联系地址'
                          })
                          .setSlots({
                            default: [
                              createElement(RemoteMap.Input)
                                .setProps({
                                  modelValue: computed(
                                    () => dataset.form.address
                                  ),
                                  placeholder: '请输入联系地址'
                                })
                                .setEmit({
                                  event: 'input',
                                  invoke: (val: string) => {
                                    dataset.form.address = val;
                                  }
                                })
                                .create()
                            ]
                          })
                          .create(),
                        createElement(RemoteMap.FormItem)
                          .setProps({
                            field: 'email',
                            label: '联系邮箱'
                          })
                          .setSlots({
                            default: [
                              createElement(RemoteMap.Input)
                                .setProps({
                                  modelValue: computed(
                                    () => dataset.form.email
                                  ),
                                  placeholder: '请输入联系邮箱'
                                })
                                .setEmit({
                                  event: 'input',
                                  invoke: (val: string) => {
                                    dataset.form.email = val;
                                  }
                                })
                                .create()
                            ]
                          })
                          .create(),
                        createElement(RemoteMap.FormItem)
                          .setProps({
                            field: 'createdAt',
                            label: '创建时间'
                          })
                          .setSlots({
                            default: [
                              createElement(RemoteMap.DatePicker)
                                .setProps({
                                  placeholder: '请选择创建时间'
                                })
                                .create()
                            ]
                          })
                          .create(),
                        createElement(RemoteMap.FormItem)
                          .setProps({
                            field: 'createdAt',
                            label: '修改时间'
                          })
                          .setSlots({
                            default: [
                              createElement(RemoteMap.DatePicker)
                                .setProps({
                                  placeholder: '请选择修改时间'
                                })
                                .create()
                            ]
                          })
                          .create(),
                        {
                          id: 'Button_0',
                          name: '按钮',
                          version: '0.0.1',
                          src: RemoteMap.Button,
                          style: {
                            marginRight: '20px'
                          },
                          props: {
                            name: '搜索',
                            type: 'primary',
                            loading: computed(() => dataset.tableLoading)
                          },
                          commonProps: {},
                          slots: {},
                          emits: [
                            {
                              event: 'click',
                              invoke: () => {
                                methods.fetchList(dataset.form);
                              },
                              target: [
                                [
                                  'Spin_0:toggle',
                                  (event) => {
                                    // if (dataset.type === 'secondary') {
                                    //   dataset.type = 'primary';
                                    // } else {
                                    //   dataset.type = 'secondary';
                                    // }
                                    // dataset.tableLoading = !dataset.tableLoading;
                                    return event;
                                  }
                                ]
                              ]
                            },
                            {
                              event: 'add',
                              target: [
                                // ['Button_1:setDisabled', count => count % 2 === 1],
                                // ['Form_0:setDisabled', count => count % 2 === 1]
                              ]
                            }
                          ],
                          listeners: []
                        },
                        createElement(RemoteMap.Button)
                          .setProps({
                            name: '重置'
                          })
                          .setEmit({
                            event: 'click',
                            target: [
                              [
                                'click',
                                () => {
                                  dataset.form.name = '';
                                  dataset.form.address = '';
                                  dataset.form.email = '';
                                }
                              ]
                            ]
                          })
                          .create()
                      ]
                    })
                    .create(),
                  createElement(
                    'http://127.0.0.1:7890/dist/ui/arco/Carousel.js'
                  )
                    .setCommonProps({
                      if: computed(() => dataset.tableSelect === '1')
                    })
                    .create(),
                  createElement('http://127.0.0.1:7890/dist/ui/arco/Table.js')
                    .setCommonProps({
                      if: computed(() => dataset.tableSelect === '0')
                    })
                    .setStyle({
                      marginTop: '20px'
                    })
                    .setProps({
                      bordered: true,
                      hoverable: true,
                      stripe: true,
                      showHeader: true,
                      columns: [
                        { title: '姓名', dataIndex: 'name' },
                        { title: '联系地址', dataIndex: 'address' },
                        { title: '联系邮箱', dataIndex: 'email' }
                      ],
                      rowSelection: {
                        type: 'checkbox',
                        showCheckedAll: true
                      },
                      pagination: {
                        pageSize: 20
                      },
                      loading: computed(() => dataset.tableLoading),
                      data: computed(() => dataset.tableList),
                      /**
                       * @TODO 是保留原汁原味的 vue 用法，还是代理到平台组件上层？
                       * @param args 
                       */
                      onVnodeBeforeMount(...args) {
                        console.log('Table组件beforeMount', args);
                      },
                      onVnodeMounted: (...args) => {
                        console.log('Table菜单组件mounted：', args);
                        methods.fetchList(dataset.form);
                      },
                      onVnodeBeforeUpdate(...args) {
                        console.log('Table菜单组件beforeUpdate：', args);
                      },
                      onVnodeUnmounted(...args) {
                        console.log('Table菜单组件unmounted：', args);
                      }
                    })
                    .create()
                ]
              })
              .create(),
            {
              id: 'Spin_0',
              name: '加载中',
              version: '0.0.1',
              src: 'http://127.0.0.1:7890/dist/ui/antd/components/Spin.js',
              style: {},
              props: {
                // spinning: true
              },
              commonProps: {},
              slots: {},
              emits: [],
              listeners: []
            }
          ]
        },
        emits: [],
        listeners: []
      }
    ]
  },
  emits: [],
  listeners: []
};

export default app;
