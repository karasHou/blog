import { defineConfig } from 'vitepress';

/* 
参考配置文档：
https://zhuanlan.zhihu.com/p/551291839
*/

export default defineConfig({
  title: "karasHou's blog", //站点标题
  description: '个人博客',
  head: [
    // 改变title的图标
    [
      'link',
      {
        rel: 'icon',
        href: '../public/猴子.ico' //图片放在public文件夹下
      }
    ]
  ],
  themeConfig: {
    siteTitle: "karasHou's blog",
    logo: '../public/猴子.ico',

    /** 导航配置 */
    nav: [
      // {
      //   text: 'Drop Menu',
      //   items: [
      //     { text: 'Item A', link: '/item-1' },
      //     { text: 'Item B', link: '/item-2' },
      //     { text: 'Item C', link: '/item-3' }
      //   ]
      // }
      { text: '文章', link: '/document/articles/index' },
      { text: '工具', link: '/document/resource/index' }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/karasHou' }]
  }
});
