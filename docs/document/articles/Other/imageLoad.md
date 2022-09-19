# 浏览器图片加载策略

>使用 chrome:105.0.5195.125，safari：15.5 (17613.2.7.1.8)

## display: none + background-image
将一个div设为 display: none, 并为其设置一个 background-image，不会下载图片。

## display: none + `<img src="xx">`
将一个img设为 display: none, 并将其src指向一个图片地址，此时即使img是隐藏的，图片依然会被下载。

实际上，只要 img 元素设置了 src，无论这个 img 元素是否挂载到了页面内，图片都会被下载，可通过以下代码实验：

```js
var img = new Image();
img.src = 'https://dystroy.org/stripad/icon-v1.png';
```
在控制台执行以上代码，可在network面板内看到图片立即被下载了。

## 父元素display: none + 子元素 background-image
将一个 div 设为 `display: none`, 在这个 div 内添加一个 子div 并设置 background-image，此时 子div 的背景图片不会被下载。
