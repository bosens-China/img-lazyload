interface lazyload {
  el: string | Element | NodeList;
  options: {
    dataSrc: string;
    callback: (el: Element) => void;
  }
}

type element = Array<Element>;
export { lazyload };

export { element };

export default function lazyload(el: lazyload["el"], option?: options) {
  return new Lazyload(el, option as options);
}
