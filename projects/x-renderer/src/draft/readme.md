```js
function App(context, source) {
  const {
    defineStore,
    defineMethod,
    defineApi,
    defineImport
  } = context;

  const { dataset,methods, api, importMap } = source;

  // define
  defineImport({
    name: 'lodash',
    url: 'https://unpkg.com/lodash@4.17.21/lodash.js'
  })
  // use
  importMap.lodash.get({ a: 1 }, 'a')

  // define
  defineStore({
    name: "store",
    state: {
      form: {
        a: '',
        b: ''
      }
    }
  })
  // use
  dataset.store.form.a = 1;

  // define
  defineMethod({
    name: 'showLog',
    value: function () {
      console.log('123')
    }
  })
  // use
  methods.showLog();

  defineApi({
    name: "fetchList",
    value: async () => {
      window.fetch('')
    }
  })

  const config = {
    version: '',
    app: {}
  }

  return config;
}


```


```js
new App({
  defineImport({
    name: 'lodash',
    url: 'https://unpkg.com/lodash@4.17.21/lodash.js'
  }),
  defineStore({
    name: "store",
    state: {
      form: {
        a: '',
        b: ''
      }
    }
  }),
  defineMethod({
    name: 'showLog',
    value: function () {
      console.log('123')
    }
  }),
  app: {
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
            // 
          }
        ]
      }
  }
})
```
