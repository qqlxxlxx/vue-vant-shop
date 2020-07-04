import request from './request'

export function getSearchList(keywords) {
  return request({
    url: '/productList?name_like=' + keywords,
    method: 'get'
  })
}

export function getCateList(cate) {
  return request({
    url: '/productList?cate=' + cate,
    method: 'get'
  })
}
