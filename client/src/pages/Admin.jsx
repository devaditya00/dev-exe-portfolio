import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api/axios.config.js'
import useAuthStore from '../store/authStore.js'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('comments')
  const { logout, user } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // fetch all data
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
    { id: 'comments', label: 'Comments', count: comments.length },
    { id: 'reviews', label: 'Reviews', count: reviews.length },
    { id: 'messages', label: 'Messages', count: messages.length },
  ]

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
        <button
          onClick={handleLogout}
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: '0.7rem',
            padding: '10px 20px',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            background: 'transparent',
            color: 'var(--muted)',
            cursor: 'pointer',
            letterSpacing: '0.1em',
          }}>
          Logout
        </button>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '3rem',
      }}>
        {[
          { label: 'Total Comments', value: comments.length, color: '#61dafb' },
          { label: 'Total Reviews', value: reviews.length, color: '#7c3aed' },
          { label: 'Total Messages', value: messages.length, color: '#00f5ff' },
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

      {/* Comments tab */}
      {activeTab === 'comments' && (
        <div>
          {comments.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontFamily: 'Space Mono, monospace', fontSize: '0.8rem' }}>
              No comments yet
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} style={{
                padding: '1.2rem 1.5rem',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                background: 'var(--bg2)',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
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
                    <span style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.6rem',
                      padding: '2px 8px',
                      borderRadius: '100px',
                      background: comment.approved ? 'rgba(67,214,117,0.1)' : 'rgba(255,107,107,0.1)',
                      color: comment.approved ? '#43d675' : '#ff6b6b',
                      border: `1px solid ${comment.approved ? '#43d675' : '#ff6b6b'}`,
                    }}>
                      {comment.approved ? 'approved' : 'pending'}
                    </span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{comment.message}</p>
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
            <p style={{ color: 'var(--muted)', fontFamily: 'Space Mono, monospace', fontSize: '0.8rem' }}>
              No reviews yet
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} style={{
                padding: '1.2rem 1.5rem',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                background: 'var(--bg2)',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                    <span style={{
                      fontFamily: 'Orbitron, monospace',
                      fontSize: '0.8rem',
                      color: 'var(--cyan)',
                    }}>{review.name}</span>
                    <span style={{ color: '#f59e0b', fontSize: '0.9rem' }}>
                      {'★'.repeat(review.rating)}
                    </span>
                    <span style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.6rem',
                      padding: '2px 8px',
                      borderRadius: '100px',
                      background: review.approved ? 'rgba(67,214,117,0.1)' : 'rgba(255,107,107,0.1)',
                      color: review.approved ? '#43d675' : '#ff6b6b',
                      border: `1px solid ${review.approved ? '#43d675' : '#ff6b6b'}`,
                    }}>
                      {review.approved ? 'approved' : 'pending'}
                    </span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{review.message}</p>
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
            <p style={{ color: 'var(--muted)', fontFamily: 'Space Mono, monospace', fontSize: '0.8rem' }}>
              No messages yet
            </p>
          ) : (
            messages.map((msg) => (
              <div key={msg._id} style={{
                padding: '1.2rem 1.5rem',
                border: `1px solid ${msg.read ? 'var(--border)' : 'rgba(0,245,255,0.3)'}`,
                borderRadius: '8px',
                background: 'var(--bg2)',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
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
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{msg.message}</p>
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