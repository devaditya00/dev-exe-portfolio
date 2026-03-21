import api from './axios.config.js'

export const getReviews = () =>
  api.get('/reviews').then((r) => r.data)

export const submitReview = (data) =>
  api.post('/reviews', data).then((r) => r.data)