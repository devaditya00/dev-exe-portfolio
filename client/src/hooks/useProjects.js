import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProjects, createProject, updateProject, deleteProject } from '../api/projects.api.js'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => queryClient.invalidateQueries(['projects']),
  })
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => updateProject(id, data),
    onSuccess: () => queryClient.invalidateQueries(['projects']),
  })
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries(['projects']),
  })
}