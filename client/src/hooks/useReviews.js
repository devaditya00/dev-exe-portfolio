import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getReviews, submitReview } from '../api/reviews.api.js'

export const useReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: getReviews,
  })
}

export const useSubmitReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews'])
    },
  })
}