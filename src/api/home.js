import request from './request'

export function getBannerCate() {
  return request({
    url: '/home',
    method: 'get'
  })
}

export function getProductList(page) {
  return request({
    url: `/productList?_page=${page}&_limit=12`,
    method: 'get'
  })
}
