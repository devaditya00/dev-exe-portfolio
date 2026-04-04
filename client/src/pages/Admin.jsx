import { useState } from 'react'
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

  // projects
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

  // comments
  const { data: commentsData } = useQuery({
    queryKey: ['admin-comments'],
    queryFn: () => api.get('/comments/all').then(r => r.data),
  })

  // reviews
  const { data: reviewsData } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: () => api.get('/reviews/all').then(r => r.data),
  })

  // messages
  const { data: messagesData } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: () => api.get('/contact').then(r => r.data),
  })

  // mutations
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
    fontSize: '0.65rem',
    padding: '6px 12px',
    border: `1px solid ${color}`,
    borderRadius: '4px',
    background: 'transparent',
    color: color,
    cursor: 'pointer',
    letterSpacing: '0.05em',
  })

  const cardStyle = {
    padding: '1.2rem 1.5rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    background: 'var(--bg2)',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
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
      padding: '100px 5% 60px',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
      }}>
        <div>
          <h1 style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            fontSize: '2rem',
            color: 'var(--cyan)',
          }}>Admin Dashboard</h1>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.7rem',
            color: 'var(--muted)',
            marginTop: '0.3rem',
          }}>Welcome back, {user?.name}</p>
        </div>
        <button onClick={handleLogout} style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: '0.7rem',
          padding: '10px 20px',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          background: 'transparent',
          color: 'var(--muted)',
          cursor: 'pointer',
          letterSpacing: '0.1em',
        }}>Logout</button>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        marginBottom: '3rem',
      }}>
        {[
          { label: 'Projects', value: projects.length, color: '#00f5ff' },
          { label: 'Comments', value: comments.length, color: '#61dafb' },
          { label: 'Reviews', value: reviews.length, color: '#7c3aed' },
          { label: 'Messages', value: messages.length, color: '#43d675' },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: '1.5rem',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            background: 'var(--bg2)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '2px',
              background: stat.color,
            }} />
            <span style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '2rem',
              fontWeight: 700,
              color: stat.color,
              display: 'block',
            }}>{stat.value}</span>
            <span style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.65rem',
              color: 'var(--muted)',
              letterSpacing: '0.1em',
            }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0',
        marginBottom: '2rem',
        borderBottom: '1px solid var(--border)',
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.7rem',
              padding: '12px 24px',
              border: 'none',
              borderBottom: activeTab === tab.id
                ? '2px solid var(--cyan)'
                : '2px solid transparent',
              background: 'transparent',
              color: activeTab === tab.id ? 'var(--cyan)' : 'var(--muted)',
              cursor: 'pointer',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Projects tab */}
      {activeTab === 'projects' && (
        <div>
          {/* Add form */}
          <div style={{
            padding: '1.5rem',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            background: 'var(--bg2)',
            marginBottom: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
            }} />
            <h3 style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '0.9rem',
              color: 'var(--cyan)',
              marginBottom: '1.5rem',
            }}>Add New Project</h3>
            <form onSubmit={handleCreateProject}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem',
              }}>
                <input
                  type="text"
                  placeholder="Project Title"
                  value={projectForm.title}
                  onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                  required
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Category (fullstack/frontend/backend/mini)"
                  value={projectForm.category}
                  onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={projectForm.githubUrl}
                  onChange={e => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Live URL"
                  value={projectForm.liveUrl}
                  onChange={e => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <input
                type="text"
                placeholder="Tech Stack (comma separated: React, Node.js, MongoDB)"
                value={projectForm.techStack}
                onChange={e => setProjectForm({ ...projectForm, techStack: e.target.value })}
                style={{ ...inputStyle, marginBottom: '1rem' }}
              />
              <textarea
                placeholder="Project description..."
                value={projectForm.description}
                onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                required
                rows={3}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  marginBottom: '1rem',
                }}
              />
              <button
                type="submit"
                disabled={createProject.isPending}
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: '0.7rem',
                  padding: '10px 24px',
                  background: 'var(--cyan)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  letterSpacing: '0.1em',
                }}>
                {createProject.isPending ? 'Adding...' : 'Add Project'}
              </button>
            </form>
          </div>

          {/* Projects list */}
          {projects.length === 0 ? (
            <p style={{
              color: 'var(--muted)',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.8rem',
            }}>No projects yet</p>
          ) : (
            projects.map((project) => (
              <div key={project._id} style={cardStyle}>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: '0.85rem',
                    color: '#fff',
                    marginBottom: '0.5rem',
                  }}>{project.title}</h4>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.85rem',
                    marginBottom: '0.5rem',
                  }}>{project.description}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {project.techStack?.map((tech) => (
                      <span key={tech} style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '0.6rem',
                        padding: '2px 8px',
                        borderRadius: '100px',
                        background: 'rgba(0,245,255,0.08)',
                        color: 'var(--cyan)',
                        border: '1px solid var(--border)',
                      }}>{tech}</span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => deleteProjectMutation.mutate(project._id)}
                  style={btnStyle('#ff6b6b')}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Comments tab */}
      {activeTab === 'comments' && (
        <div>
          {comments.length === 0 ? (
            <p style={{
              color: 'var(--muted)',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.8rem',
            }}>No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} style={cardStyle}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '0.5rem',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                    <span style={{
                      fontFamily: 'Orbitron, monospace',
                      fontSize: '0.8rem',
                      color: 'var(--cyan)',
                    }}>{comment.name}</span>
                    <span style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.65rem',
                      color: 'var(--muted)',
                    }}>{comment.email}</span>
                    <span style={badgeStyle(comment.approved)}>
                      {comment.approved ? 'approved' : 'pending'}
                    </span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    {comment.message}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  {!comment.approved && (
                    <button
                      onClick={() => approveComment.mutate(comment._id)}
                      style={btnStyle('#43d675')}>
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => deleteComment.mutate(comment._id)}
                    style={btnStyle('#ff6b6b')}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Reviews tab */}
      {activeTab === 'reviews' && (
        <div>
          {reviews.length === 0 ? (
            <p style={{
              color: 'var(--muted)',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.8rem',
            }}>No reviews yet</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} style={cardStyle}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '0.5rem',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                    <span style={{
                      fontFamily: 'Orbitron, monospace',
                      fontSize: '0.8rem',
                      color: 'var(--cyan)',
                    }}>{review.name}</span>
                    <span style={{ color: '#f59e0b', fontSize: '0.9rem' }}>
                      {'★'.repeat(review.rating)}
                    </span>
                    <span style={badgeStyle(review.approved)}>
                      {review.approved ? 'approved' : 'pending'}
                    </span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    {review.message}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  {!review.approved && (
                    <button
                      onClick={() => approveReview.mutate(review._id)}
                      style={btnStyle('#43d675')}>
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview.mutate(review._id)}
                    style={btnStyle('#ff6b6b')}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Messages tab */}
      {activeTab === 'messages' && (
        <div>
          {messages.length === 0 ? (
            <p style={{
              color: 'var(--muted)',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.8rem',
            }}>No messages yet</p>
          ) : (
            messages.map((msg) => (
              <div key={msg._id} style={{
                ...cardStyle,
                border: `1px solid ${msg.read ? 'var(--border)' : 'rgba(0,245,255,0.3)'}`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '0.5rem',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                    <span style={{
                      fontFamily: 'Orbitron, monospace',
                      fontSize: '0.8rem',
                      color: 'var(--cyan)',
                    }}>{msg.name}</span>
                    <span style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.65rem',
                      color: 'var(--muted)',
                    }}>{msg.email}</span>
                    {!msg.read && (
                      <span style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '0.6rem',
                        padding: '2px 8px',
                        borderRadius: '100px',
                        background: 'rgba(0,245,255,0.1)',
                        color: 'var(--cyan)',
                        border: '1px solid var(--border)',
                      }}>new</span>
                    )}
                  </div>
                  <p style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: '0.75rem',
                    color: '#fff',
                    marginBottom: '0.5rem',
                  }}>{msg.subject}</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    {msg.message}
                  </p>
                </div>
                {!msg.read && (
                  <button
                    onClick={() => markRead.mutate(msg._id)}
                    style={btnStyle('var(--cyan)')}>
                    Mark Read
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

    </div>
  )
}

export default Admin