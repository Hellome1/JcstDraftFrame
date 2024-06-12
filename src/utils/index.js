/**
 * @description:节流函数
 * @param {function} method
 * @param {number} delay
 * @return {function}
 */
export function throttle(method, delay) {
  let timer = null;
  return function() {
    let context = this;
    let arg = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      method.apply(context, arg);
    }, delay);
  };
}
