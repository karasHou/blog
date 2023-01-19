import { defineConfig } from 'vitepress'
import sidebar from './sideConfig'

/*
参考配置文档：
https://zhuanlan.zhihu.com/p/551291839
*/

export default defineConfig({
  title: 'karasHou\'s blog', // 站点标题
  description: '个人博客',
  base: '/blog',
  vite: {
    server: {
      open: true,
    },
  },
  head: [
    // 改变title的图标
    [
      'link',
      {
        rel: 'icon',
        href: '/猴子.ico', // 图片放在public文件夹下
      },
    ],
  ],
  themeConfig: {
    siteTitle: 'karasHou\'s blog',
    logo: '/猴子.ico',

    /** 导航配置 */
    nav: [
      { text: '文章', link: '/document/articles/index' },
      { text: '工具', link: '/document/resource/index' },
    ],
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/karasHou' }],
  },
})
