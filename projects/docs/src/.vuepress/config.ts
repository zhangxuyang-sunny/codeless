import { defaultTheme, defineUserConfig } from 'vuepress'
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
    '/en/': {
      lang: 'en-US',
      title: 'Codeless',
      description: 'Codeless ecosystem',
    },
  },
  theme: defaultTheme({
    locales: {
      "/": {
        navbar: navbarZh,
        sidebar: sidebarZh
      }
    }
  }),
})
