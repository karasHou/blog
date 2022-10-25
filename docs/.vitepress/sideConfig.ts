export default {
  '/document/articles/': [{
    text: '文章',
    collapsible: true,
    items: [
      {
        text: '日常记录',
        link: '/document/articles/other.md',
        items: [{
          text: '浏览器图片加载策略', link: '/document/articles/other/imageLoad.md',
        }, {
          text: '巧用lodash path', link: '/document/articles/other/lodashPath.md',
        }],
      },
      {
        text: '低代码项目',
        link: '/document/articles/lowcodeproject/',
        items: [{
          text: '基础搭建', link: '/document/articles/lowcodeproject/基础搭建.md',
        }],
      },
    ],
  }],
}
