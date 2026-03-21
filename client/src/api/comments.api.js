import api from './axios.config.js'

export const getComments = () =>
  api.get('/comments').then((r) => r.data)

export const submitComment = (data) =>
  api.post('/comments', data).then((r) => r.data)