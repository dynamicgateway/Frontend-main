/**
 * Mock Login Page Component
 * 
 * Simplified login page for testing with mock authentication.
 * Uses Dynamic Gateway mock APIs for authentication.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useMockAuthStore } from '@/store/mockAuthStore'
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material'
import { Login as LoginIcon } from '@mui/icons-material'

export const MockLoginPage = () => {
  const navigate = useNavigate()
  const { login, demoMode } = useMockAuthStore()
  
  const [username, setUsername] = useState('demo@muni.gov.il')
  const [password, setPassword] = useState('demo123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(username, password)
      
      if (result.success) {
        console.log('[Login] Success, navigating to dashboard')
        navigate('/dashboard')
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      console.error('[Login] Error:', err)
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 450,
          width: '100%',
          borderRadius: 2
        }}
      >
        <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
          <LoginIcon sx={{ fontSize: 48, color: 'primary.main', marginBottom: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            MUNI Portal
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Israeli Municipal Services
          </Typography>
        </Box>

        {demoMode && (
          <Alert severity="info" sx={{ marginBottom: 3 }}>
            <strong>Demo Mode Active</strong><br />
            Any username/password will work!<br />
            Default: demo@muni.gov.il / demo123
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email / Username"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            autoFocus
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            disabled={loading}
          />

          {error && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ marginTop: 3, paddingY: 1.5 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <Box sx={{ marginTop: 3, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Testing with Dynamic Gateway Mock APIs
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}
