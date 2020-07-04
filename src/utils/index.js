// 获取网页距离顶部滚动距离，兼容谷歌、ie、火狐和高级版本浏览器等
export function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
}

// 设置网页距离顶部滚动距离
export function setScrollTop(scrollTop) {
  if (window.scrollTo) {
    window.scrollTo(0, scrollTop)
  } else if (document.body.scrollTop) {
    document.documentElement.scrollTop = scrollTop
  } else {
    document.body.scrollTop = scrollTop
  }
}

// 函数节流
export function throttle(callBack, delay = 500) {
  let timer = null
  let flag = true
  return function () {
    if (!flag) return
    const args = arguments
    flag = false
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      flag = true
      callBack.apply(this, args)
    }, delay)
  }
}
