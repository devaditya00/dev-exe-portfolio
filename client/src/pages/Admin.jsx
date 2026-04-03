import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api/axios.config.js'
import useAuthStore from '../store/authStore.js'
import { useNavigate } from 'react-router-dom'
import { useProjects, useCreateProject, useDeleteProject } from '../hooks/useProjects.js'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('projects')
  const { logout, user } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    category: 'fullstack',
  })

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const { data: projectsData } = useProjects()
  const createProject = useCreateProject()
  const deleteProjectMutation = useDeleteProject()
  const projects = projectsData?.data || []

  const handleCreateProject = (e) => {
    e.preventDefault()
    createProject.mutate({
      ...projectForm,
      techStack: projectForm.techStack.split(',').map(t => t.trim()),
    })
    setProjectForm({
      title: '',
      description: '',
      techStack: '',
      githubUrl: '',
      liveUrl: '',
      category: 'fullstack',
    })
  }

  const { data: commentsData } = useQuery({
    queryKey: ['admin-comments'],
    queryFn: () => api.get('/comments/all').then(r => r.data),
  })

  const { data: reviewsData } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: () => api.get('/reviews/all').then(r => r.data),
  })

  const { data: messagesData } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: () => api.get('/contact').then(r => r.data),
  })

  const approveComment = useMutation({
    mutationFn: (id) => api.patch(`/comments/${id}/approve`),
    onSuccess: () => queryClient.invalidateQueries(['admin-comments']),
  })

  const deleteComment = useMutation({
    mutationFn: (id) => api.delete(`/comments/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['admin-comments']),
  })

  const approveReview = useMutation({
    mutationFn: (id) => api.patch(`/reviews/${id}/approve`),
    onSuccess: () => queryClient.invalidateQueries(['admin-reviews']),
  })

  const deleteReview = useMutation({
    mutationFn: (id) => api.delete(`/reviews/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['admin-reviews']),
  })

  const markRead = useMutation({
    mutationFn: (id) => api.patch(`/contact/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries(['admin-messages']),
  })

  const comments = commentsData?.data || []
  const reviews = reviewsData?.data || []
  const messages = messagesData?.data || []

  const tabs = [
    { id: 'projects', label: 'Projects', count: projects.length },
    { id: 'comments', label: 'Comments', count: comments.length },
    { id: 'reviews', label: 'Reviews', count: reviews.length },
    { id: 'messages', label: 'Messages', count: messages.length },
  ]

  const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    padding: '10px 14px',
    color: '#e2e8f0',
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
  }

  const btnStyle = (color) => ({
    fontFamily: 'Space Mono, monospace',
    fontSize: '0.7rem',
    padding: '8px 12px',
    border: `1px solid ${color}`,
    borderRadius: '4px',
    background: 'transparent',
    color: color,
    cursor: 'pointer',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
  })

  const cardStyle = {
    padding: '1rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    background: 'var(--bg2)',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
    flexWrap: 'wrap',
  }

  const badgeStyle = (approved) => ({
    fontFamily: 'Space Mono, monospace',
    fontSize: '0.6rem',
    padding: '2px 8px',
    borderRadius: '100px',
    background: approved ? 'rgba(67,214,117,0.1)' : 'rgba(255,107,107,0.1)',
    color: approved ? '#43d675' : '#ff6b6b',
    border: `1px solid ${approved ? '#43d675' : '#ff6b6b'}`,
  })

  return (
    <div style={{
      minHeight: '100vh',
      padding: '90px 1rem 50px',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
    </div>
  )
}

export default Admin