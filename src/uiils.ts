export const isViewDisplay = (el: Element) => {
  if (!isElement(el)) {
    return false;
  }
  /* ie浏览器下只有left，和top */
  const { left: x, top: y, right, bottom } = el.getBoundingClientRect();
  const height = window.innerHeight || document.documentElement.clientHeight;
  const width = window.innerWidth || document.documentElement.clientWidth;
  return x <= width && y <= height && bottom >= 0 && right >= 0;
};

export function shake(fn: Function, time: number) {
  let t: any;
  return function () {
    if (t !== undefined) {
      clearTimeout(t);
    }
    t = setTimeout(() => {
      fn();
    }, time);
  };
}

export function form<T>(arg: T) {
  return Array.prototype.slice.call(arg) as T[];
}

export function isObject(par: any) {
  return par && typeof par === "object";
}

export function isElement(par: any) {
  return isObject(par) && par.nodeType === Node.ELEMENT_NODE;
}

function isWindow(par: any) {
  return !!(isObject(par) && par.window);
}

function isArray(arg: any) {
  return Object.prototype.toString.call(arg) === "[object Array]";
}

export function isArrayLike(par: any) {
  if (!isObject(par)) {
    return false;
  }
  if (!("length" in par)) {
    return false;
  }
  const length: number = par.length;
  if (isWindow(par)) {
    return false;
  }
  return isArray(par) || length === 0 || length - 1 in par;
}
