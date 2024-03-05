# 前言

过去我们通常使用 nvm 来管理 node 版本，但多少会有一些问题，例如：切换困难（需要使用命令手动切换版本），自动化方案成本高（[使用zsh脚本](https://juejin.cn/post/7292309713704976425)等），经常会遇到奇奇怪怪的bug，切换卡顿性能问题严重。


# 新工具的出现
一次偶然的机会了解到了 volta，一个基于 rust 开发的工具，支持给项目指定node版本（以及包管理器）还可以自动切换。也就是说在项目指定好版本之后，任何人只要安装了volta都可以自动切换你指定的版本。

## 基本使用

> volta 官网：https://volta.sh/

### 安装

```
curl https://get.volta.sh | bash
```

### 设置 Node.js 版本

```
volta install node@20.11.0
```

这将在全局安装 20版本的nodejs作为全局的默认版本。

也可以指定模糊版本：

````
volta install node@14
````

### 给项目设置特定Node.js版本

很常见的情况是，不同的项目之间可能使用不同的Node.js版本，在volta的场景下，可以将项目需要的包管理器、Node.js版本固定在项目内，跟随git一起提交，只要在团队指南内统一安装volta即可。

使用以下命令可以将项目对应信息固定在 package.json内：

```
volta pin node@18.19
volta pin yarn@1.19
```

效果：

```
"volta": {
  "node": "18.19.0",
  "yarn": "1.19.2"
}
```

这样当另一个同事下载并开启终端时，volta会自动读取项目内的 Node.js 版本并安装，同时会缓存。在项目路径下查看版本：

```
    Node: v14.21.3 (current @ /Users/xxx/Documents/test-volta/
    typescript-4/package.json)
    pnpm: v8.15.1 (default)
    Yarn: v1.22.19 (default)
```



## 管理工具链

除了包管理器，我们经常需要安装一些 全局包来执行一些指令，例如 tsc、yalc等，如果利用nvm 或者没有node管理工具，在一些特定的场景下会遇到问题。



### 如何安装全局工具？

类似于安装包管理器，我们可以使用 volta install xxx来安装：

```
volta install typescript
```

安装完成后，可以执行 tsc命令，以及可以使用 volta ls查看可执行命令：

```
Tool binaries available:
	tsc, tsserver (default)
```



### volta 如何管理工具链？

例如我有两个项目，一个项目依赖 typescript 4版本，而另一个依赖5版本，但是我全局只能安装一个版本，那在两个项目内必定会有一个会因为版本不匹配而运行 tsc 命令导致报错。

在以上场景下，volta 在运行命令是会智能查找（官方描述叫 track）当前项目下依赖的组件包的版本，按照项目的版本来运行命令：

由当前两个模拟项目，分别依赖了ts4和5版本，

```
├── typescript-4
|  ├── node_modules
|  |  └── typescript
|  ├── package-lock.json
|  ├── package.json
|  └── src
|     └── test.ts
└── typescript-5
	 |  ├── node_modules
   |  |  └── typescript
   ├── package.json
   └── src
      └── test.ts
```

当安装 volta 后，分别在两个目录下运行 tsc --version会得到：

```
# 5目录
Version 5.3.3
# 4目录
Version 4.9.5
```

执行 volta ls查看当前路径的tsc版本：

```
    Tool binaries available:
        tsc, tsserver (current @ /Users/xxx/Documents/test-volta/
        typescript-4/package.json)
```

可以看到这里volta展示的路径是当前项目的路径，以及一个 current。

而如果我在非项目路径下执行命令：

```
Tool binaries available:
	tsc, tsserver (default)
```

可以看到展示的是 default，也就是初始安装的默认版本。



