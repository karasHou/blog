import { defineConfig } from 'vitepress';

/* 
参考配置文档：
https://zhuanlan.zhihu.com/p/551291839
*/

export default defineConfig({
  title: "karasHou's blog", //站点标题
  description: '个人博客',
  base: "/",
  head: [
    // 改变title的图标
    [
      'link',
      {
        rel: 'icon',
        href: '/猴子.ico' //图片放在public文件夹下
      }
    ]
  ],
  themeConfig: {
    siteTitle: "karasHou's blog",
    logo: '/猴子.ico',

    /** 导航配置 */
    nav: [
      { text: '文章', link: '/document/Articles/index' },
      { text: '工具', link: '/document/resource/index' }
    ],
    sidebar: {
      '/document/Articles/': [{
        text: '文章',
        collapsible: true,
        items: [
          {
            text: '日常记录', link: '/document/Articles/Other.md', items: [{
              text: '浏览器图片加载策略', link: '/document/Articles/other/imageLoad.md'
            }]
          },
          {
            text: '低代码项目', link: '/document/Articles/LowCodeProject/', items: [{
              text: '基础搭建', link: '/document/Articles/LowCodeProject/基础搭建.md'
            }]
          },
        ]
      }]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/karasHou' }]
  }
});
