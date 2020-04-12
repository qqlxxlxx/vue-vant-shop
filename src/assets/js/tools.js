// 获取网页距离顶部滚动距离，兼容谷歌、ie、火狐和高级版本浏览器等
function getScrollTop() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  return scrollTop
}

// 设置网页距离顶部滚动距离
function setScrollTop(scrollTop) {
  document.documentElement.scrollTop = document.body.scrollTop = scrollTop
}

export default {
  getScrollTop,
  setScrollTop
}
