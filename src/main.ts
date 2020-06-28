import { lazyload, element } from "../typings/lazyload";
import { form, isElement, isArrayLike, isViewDisplay, shake } from "./uiils";

type options = lazyload["options"];

class Lazyload {
  private el: element;
  private option: options;
  public constructor(el: lazyload["el"], option: options) {
    // 参数默认值处理
    const obj = option || {};
    obj.dataSrc = obj.dataSrc || "data-src";
    // el元素处理，转化为统一的数组对象
    let arr: element = [];
    if (typeof el === "string") {
      arr = (form(document.querySelectorAll(el)) as unknown) as element;
    } else if (isElement(el)) {
      arr = [el as Element];
    } else if (isArrayLike(el)) {
      arr = (form(el) as unknown) as element;
    }
    this.el = arr;
    this.option = obj;
    this.init();
  }

  private init() {
    if (typeof IntersectionObserver !== "function") {
      this.initPrimary();
      return;
    }
    this.ininIntersectionObserver();
  }

  private ininIntersectionObserver() {
    const arr = this.el;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((item) => {
        if (item.intersectionRatio <= 0) {
          return;
        }
        const dom = item.target;
        this.self(dom);
        observer.unobserve(dom);
      });
    });
    arr.forEach((item) => observer.observe(item));
  }
  private initPrimary() {
    const arr = this.el;
    // 节流一下
    const change = shake(() => {
      for (let i = 0, len = arr.length; i < len; i++) {
        const item = arr[i];
        // 判断有没有出现在视图中
        if (isViewDisplay(item)) {
          this.self(item);
          arr.splice(i, 1);
          // 再次调用自身一次
          change();
        }
      }
      // 取消事件监听
      if (!arr.length) {
        window.removeEventListener("resize", change);
        window.removeEventListener("scroll", change);
      }
    }, 120);
    window.addEventListener("resize", change);
    window.addEventListener("scroll", change);
    change();
  }

  private isImg(el: Element) {
    return !!/img/i.test(el.nodeName);
  }

  // 处理图片或者背景图片
  private self(dom: Element) {
    const fn = this.option.callback;
    if (typeof fn === "function") {
      fn(dom);
      return;
    }
    const tag = dom.getAttribute(this.option.dataSrc) || "";
    if (this.isImg(dom)) {
      (dom as HTMLImageElement).src = tag;
    } else {
      // 背景图片
      (dom as HTMLElement).style.backgroundImage = `url("${tag}");`;
    }
  }
}

function lazyload(el: lazyload["el"], option?: options) {
  return new Lazyload(el, option as options);
}

export default lazyload;
