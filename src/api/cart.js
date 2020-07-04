import request from './request'

export function getGoodsList() {
  return request({
    url: '/cart?num_gte=1&_sort=update&_order=desc',
    method: 'get'
  })
}

export function updateGoods(id, params) {
  return request({
    url: '/cart/' + id,
    method: 'patch',
    data: params
  })
}

export function delGoods(id) {
  return request({
    url: '/cart/' + id,
    method: 'patch',
    data: { num: 0 }
  })
}
