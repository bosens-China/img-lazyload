type el = string | Element | NodeList;
type options = {
  dataSrc: string;
  callback: (el: Element) => void;
};
interface lazyload {
  el: el;
  options: options;
}

type element = Array<Element>;
export { lazyload, element, el, options };

export default function lazyload(el: el, option?: options): void {
  return new Lazyload(el, option as options);
}
