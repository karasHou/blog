import { defineConfig } from 'vitepress'
import { getSideBar } from 'vitepress-plugin-autobar'

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
  lastUpdated: true,
  themeConfig: {
    siteTitle: 'karasHou\'s blog',
    logo: '/猴子.ico',

    /** 导航配置 */
    // TODO: 之后改下路径
    // nav: [
    //   { text: '文章', link: '/document/articles/index' },
    //   { text: '工具', link: '/document/resource/index' },
    // ],
    sidebar: getSideBar('./docs', {
      ignoreMDFiles: ['index'],
      ignoreDirectory: ['node_modules'],
    }),
    socialLinks: [{ icon: 'github', link: 'https://github.com/karasHou' }],
  },
})
