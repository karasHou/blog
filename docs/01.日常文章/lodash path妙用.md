# lodash path妙用

通过这篇文章，我会介绍在实际需求中如何巧妙利用 lodash 的 `path` 概念去实现需求，然后在分析 lodash 的 get 的源码，从而加深理解。

## lodash api 简介

`path`来自于 lodash 的 api [get](https://www.lodashjs.com/docs/lodash.get) 和 set 中，用于获取和设置对象的某个属性：

```js
// _.get
var object = { a: [{ b: { c: 3 } }] }

_.get(object, 'a[0].b.c')
// => 3

// _.set
var object = { a: [{ b: { c: 3 } }] }

_.set(object, 'a[0].b.c', 4)
console.log(object.a[0].b.c)
// => 4
```

::: tip
其中 `'a[0].b.c'` 被称为 path，是不是非常形象直观。`x.x` 代表 x 属性，`[0]`代表数组下标 0 的元素。
:::

# 需求背景

本次的需求是：要在`配置后台`针对`组件`的某些属性做资源的收集，然后在页面加载的时候，提前对资源进行预加载，从而实现更好的用户体验。

## 系统介绍

在系统中，组件由一个一个的配置项组成例如：

```js
{
  id: "xxx",
  name: "xxx",
  style: {
    "background": "xxxx",
    "src": "xxxx"
  }
  // ...
}
```

## 数据处理流程：

在后台针对组件配置完成后，经过后端数据的处理（主要是针对不同环境图片等资源地址的替换）、业务逻辑替换、多语言国际化处理替换，最终将组件的配置项传递给组件。

流程图如下：

```
后台配置组件 -> 得到组件配置项 -> 收集配置项资源 -> 处理配置项资源（地址会发生更改） -> 传递配置项到组件内部 -> 组件内部根据配置项渲染
```

# 实现

## 遇到的问题

既然要收集资源，最后消费的时候，上述流程有一个关键问题就是，`收集到的资源大部分情况下并不是最终要用到的资源`。

例如：
在后台是，组件的 `src` 配置项的值是 `xxx`，在经过后端数据处理以及业务等场景处理流程后，src 的值变成了 `xxx2`，最后在执行预加载的时候也就不会生效了。

## 如何解决？

想到这里，想到了如果直接保存资源的绝对地址不生效的话，那么我们是不是可以保存资源的 `路径`，也就是资源地址的路径，然后在最终消费的时候，根据这一堆路径去得到最终处理完成的资源地址，从而实现`真正资源的预加载`。

## 逻辑实现

逻辑的实现分成 2 部分：

1. 过滤组件配置项，根据每个节点生成资源的路径
2. 根据生成的资源路径的数组,等待后端、业务、国际化等处理完成后，按照路径收集最终的资源，执行预加载

### 一、生成资源路径数组

```js
const obj = {
  a: { b: 1 },
  c: { d: { e: 2 } },
  f: [{ g: 3 }]
}

const replacerWithPath = (replacer) => {
  const m = new Map()

  return function (field, value) {
    const path = m.get(this) + (Array.isArray(this) ? `[${field}]` : `.${field}`)

    // 如果是 对象或者数组
    if (value === Object(value))
      m.set(value, path)

    return replacer.call(this, field, value, path.replace(/undefined\.\.?/, ''))
  }
}

JSON.stringify(
  node,
  replacerWithPath((key, val, path) => {
    // if (满足条件的资源) {
    //   // xxx其他逻辑
    // }

    console.log('path---', path)
    return val
  })
)
```

结果：

```json
path--- a
path--- a.b
path--- c
path--- c.d
path--- c.d.e
path--- f
path--- f[0]
path--- f[0].g
```

- 分析：

这段代码主要用到的几个知识点：

1. `JSON.stringify` 第二个参数可以实现遍历对象
2. 高阶函数
3. map 数据结构存储每次遍历到的值，方便做映射生成路径

- 使用：

有了以上生成路径的能力后，我们很容易就生成如下的资源列表配置：

```json
{
  "id": ["node.src", "node.background", "node.config.xxx"],

  "id2": ["node.src", "node.background", "node.config.xxx"]
}
```

这样我们就完成了一部分：生成资源路径数组。

### 二、获取真实资源的值

前文提到，组件的配置项经过各种流程的处理后，配置项的资源最终大概率会发生变化：

```js
// before
{
  id: "xxx",
  name: "xxx",
  style: {
    "background": "xxxx1",
    "src": "xxxx2"
  }
  // ...
}

// after
{
  id: "xxx",
  name: "xxx",
  style: {
    // 资源地址变化
    "background": "xxxx3",
    // 资源地址变化
    "src": "xxxx4"
  }
  // ...
}
```

根据上一步生成的资源路径数组，再结合 lodash 的`get`方法，我们很容易就能根据组件的配置生成最终资源的数组：

```js
const result = []
const resArrMap = {
  id: ['node.src', 'node.background', 'node.config.xxx'],

  id2: ['node.src', 'node.background', 'node.config.xxx']
}

// ...遍历资源Map
forEach((component) => {
  // 找到目标组件配置
  if (component.id === id) {
    const res = _.get(component, path)
    result.push(res)
  }
})

// 最后针对 result 执行预加载
result.forEach((img) => {
  const img = new Image()
  img.src = img
  // xxx
})
```

# lodash get 源码分析

WIP
