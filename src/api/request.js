import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://119.23.11.79:3000/'
})

instance.interceptors.response.use(
  config => {
    return config.data
  },
  error => {
    return Promise.reject(error)
  })

export default instance
