# img-lazyload

![size](https://img.shields.io/badge/size-2.4KB-blue) ![License](https://img.shields.io/badge/License-MLT-blue)

[中文文档](./README_ZH.md)

It does not rely on high-performance JavaScript library, with a size of `2.4kb`. It supports modification of `src` and other elements `backgroundimage` attributes under img tag by default.

Before using this library, you need to pay more attention to: **for the elements that need to be loaded lazily, you must set a `width height` or an initial image**.

```html
<img src="xxx.png" />
<!-- or -->
<img src="xxx.png" style="width: 500px; width: 700px;" />
```

## install

```sh
npm i @boses/img-lazyload
# or
yarn add @boses/img-lazyload
```

## usage method

```html
<!-- style -->
<style>
  img {
    width: 800px;
    height: 800px;
  }
</style>
<!-- body Element -->
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

For the `img` tag, when the element is visible, the value of the `data-src` attribute of the element is assigned to the SRC attribute of the element;

For non `img` tags, `backgroundimage` is used by default. When the element is visible, the value of the element `data-src` attribute is assigned to the `backgroundimage` attribute of the element;

## api

```js
lazyload(el: el, option?: options): void
```

- el:`string | Element | NodeList`

##### option?

| name     | type                    | default  | required | describe                              |
| -------- | ----------------------- | -------- | -------- | ------------------------------------- |
| dataSrc  | `string`                | data-src | `false`  | The actual URL address of the element |
| callback | `(el: Element) => void` | none     | `false`  | callback                              |

The following is an advanced example. Load the image and clear the `data-src` attribute of the element. The style element of HTML is the same as above.

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

## License

MIT License
