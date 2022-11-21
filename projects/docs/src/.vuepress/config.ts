import path from "path";
import { defaultTheme, defineUserConfig } from 'vuepress'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { navbarZh } from './configs/navbar/zh'
import { sidebarZh } from './configs/sidebar/zh'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Codeless',
  description: 'Codeless docs',
  // site-level locales config
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Codeless',
      description: 'Codeless 生态',
    },
  },
  theme: defaultTheme({
    locales: {
      "/": {
        navbar: navbarZh,
        sidebar: sidebarZh
      }
    },
    contributors: false,
    lastUpdated: false
  }),
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components")
    })
  ]
})
