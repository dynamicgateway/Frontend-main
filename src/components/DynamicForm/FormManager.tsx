import React, { useEffect, useState } from 'react'
import { formioService, type FormSchema } from '@/services/formio-service'
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const FormManager: React.FC = () => {
  const [forms, setForms] = useState<FormSchema[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadForms()
  }, [])

  const loadForms = async () => {
    setLoading(true)
    setError(null)

    try {
      const allForms = await formioService.getAllForms()
      setForms(allForms)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load forms')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Available Forms
      </Typography>

      <Grid container spacing={3}>
        {forms.map((form) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={form._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {form.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Path: {form.path}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Components: {form.components?.length || 0}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`/forms/${form.path}`)}
                >
                  Open Form
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {forms.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No forms available. Create forms in the Form.io builder.
        </Alert>
      )}
    </Box>
  )
}
