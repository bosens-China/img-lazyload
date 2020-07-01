# 图片懒加载

![size](https://img.shields.io/badge/size-2.4KB-blue) ![License](https://img.shields.io/badge/License-MLT-blue)

无依赖高性能的 JavaScript 库，大小`2.4KB`，默认支持 img 标签下`src`和其他元素`backgroundImage`属性修改。

在使用这个库之前有一些地方需要额外注意：**对于需要懒加载的元素而言，必须显示的设定一个`宽高`或者初始图片**。

```html
<img src="xxx.png" />
<!-- 或者 -->
<img src="xxx.png" style="width: 500px; width: 700px;" />
```

## 安装

```sh
npm i @boses/img-lazyload
# or
yarn add @boses/img-lazyload
```

## 使用方法

```html
<!-- 样式 -->
<style>
  img {
    width: 800px;
    height: 800px;
  }
</style>
<!-- body元素 -->
<img data-src="http://pic2.nipic.com/20090422/1562745_010030787_2.jpg" />
<img
  data-src="https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/faedab64034f78f07595c8f874310a55b3191c1a.jpg"
/>
<img data-src="http://img.ylq.com/2016/0816/20160816094144656.jpg" />
```

```js
import imgLazyload from "@boses/img-lazyload";
imgLazyload("img");
```

对于`img`标签，当元素可见的时候会将元素`data-src`属性的值赋值给元素的`src`属性上；

对于非`img`标签，默认认为使用了`backgroundImage`，当元素可视的时候会将元素`data-src`属性的值赋值给元素的`backgroundImage`属性上；

## api

```js
lazyload(el: el, option?: options): void
```
- el:`string | Element | NodeList`

##### option?

| name     | 类型                    | 默认值   | 是否必填 | 描述                |
| -------- | ----------------------- | -------- | -------- | ------------------- |
| dataSrc  | `string`                | data-src | `false`  | 元素真正的 url 地址 |
| callback | `(el: Element) => void` | 无       | `false`  | 回调函数            |

下面是进阶的例子，加载图片同时清理元素的`data-src`属性，html 的 style 元素同上。

```js
import imgLazyload from "@boses/img-lazyload";
imgLazyload("img", {
  callback(el) {
    const src = el.getAttribute("data-src");
    el.src = src;
    el.removeAttribute("data-src");
  },
});
```

## 协议

MIT License
