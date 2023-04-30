import { AppError } from '@utils/AppError'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.0.2.15:3333',
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      console.log('a', error.response)
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      console.log('b', error)
      return Promise.reject(
        new AppError('Erro no servidor. Tente novamente mais tarde.'),
      )
    }
  },
)

export { api }
