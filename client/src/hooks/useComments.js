import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getComments, submitComment } from '../api/comments.api.js'

export const useComments = () => {
  return useQuery({
    queryKey: ['comments'],
    queryFn: getComments,
  })
}

export const useSubmitComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: submitComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments'])
    },
  })
}