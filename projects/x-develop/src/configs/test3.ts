import qs from 'qs';
import { computed } from 'vue';
import { defineStore } from 'pinia';
import type {
  TypeMaterialCommonProps,
  TypeMaterial
} from '@/types/schema/material';
import { createDataset, createElement } from '@/common/utils/index';
// import { Message } from '@arco-design/web-vue';

const RemoteMap = {
  Root: 'http://127.0.0.1:7890/dist/ui/common/EmptyContainer.js',
  Input: 'http://127.0.0.1:7890/dist/ui/arco/Input.js',
  Button: 'http://127.0.0.1:7890/dist/ui/arco/Button.js',
  DatePicker: 'http://127.0.0.1:7890/dist/ui/arco/DatePicker.js',
  VerticalLayout: 'http://127.0.0.1:7890/dist/ui/common/VerticalLayout.js',
  HorizontalLayout: 'http://127.0.0.1:7890/dist/ui/common/HorizontalLayout.js',
  FormItem: 'http://127.0.0.1:7890/dist/ui/arco/FormItem.js'
};

const MaterialMap = {
  DropDown: 'http://127.0.0.1:7890/dist/material/DropDown.js',
  Banner: 'http://127.0.0.1:7890/dist/material/Banner.js',
  Filter: 'http://127.0.0.1:7890/dist/material/Filter.js'
};

const Header: TypeMaterial = createElement(RemoteMap.HorizontalLayout)
  .setStyle({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px'
  })
  .setSlots({
    default: [
      createElement('http://127.0.0.1:7890/dist/ui/common/Logo.js')
        .setProps({
          title: '物料平台',
          logoUrl:
            'https://www.webpackjs.com/32dc115fbfd1340f919f0234725c6fb4.png'
        })
        .setSlots({
          default: [createElement(RemoteMap.HorizontalLayout).create()]
        })
        .create(),
      createElement(MaterialMap.DropDown)
        .setProps({
          name: '未登录'
        })
        .create()
    ]
  })
  .create();

const config: TypeMaterial = {
  id: '',
  name: '',
  version: '',
  src: RemoteMap.Root,
  style: {},
  props: {},
  commonProps: {},
  slots: {
    default: [
      // 头部
      createElement(RemoteMap.VerticalLayout)
        .setSlots({
          default: [
            Header,
            createElement(MaterialMap.Banner).create(),
            createElement(MaterialMap.Filter).create()
          ]
        })
        .create()
    ]
  },
  emits: [],
  listeners: []
};

export default config;

export { config };
