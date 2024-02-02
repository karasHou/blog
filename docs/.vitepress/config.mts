import fs from 'fs/promises'
import { defineConfig } from 'vitepress'
import { getSideBar } from '../../src/autoBar'

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
        href: './favicon.ico', // 图片放在public文件夹下
      },
    ],
  ],
  themeConfig: {
    logo: './favicon.ico',

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
    // sidebar: [
    //   {
    //     text: '测试',
    //     items: [
    //       {
    //         text: '02.lowcode',
    //         link: '/02.lowcode/00.homepage.md',
    //       },
    //     ],
    //   },
    // ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/karasHou' }],
  },
  async buildEnd(siteConfig) {
    // 配置网站基础路径
    const BLOG_BASE_API = 'https://karashou.github.io/blog'

    let siteMapStr = ''
    for (const page of siteConfig.pages) siteMapStr += `${BLOG_BASE_API}/${page.replace(/md$/, 'html')}\n`

    try {
      // 生成文件
      await fs.writeFile(`${siteConfig.outDir}/sitemap.txt`, siteMapStr)
    }
    catch (err) {
      console.log('create sitemap.txt failed!', err)
    }
  },
})
