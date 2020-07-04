import request from './request'

export function getDetail(id) {
  return request({
    url: '/detail?id=' + id,
    method: 'get'
  })
}

export function getSku(id) {
  return request({
    url: '/skudata?id=' + id,
    method: 'get'
  })
}
