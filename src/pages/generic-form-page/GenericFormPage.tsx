import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DynamicFormRenderer } from '@/components/DynamicForm/DynamicFormRenderer'
import { Container, Button, Box, Alert } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const GenericFormPage: React.FC = () => {
  const { formPath } = useParams<{ formPath: string }>()
  const navigate = useNavigate()

  if (!formPath) {
    return (
      <Container>
        <Alert severity="error">Form path is required</Alert>
      </Container>
    )
  }

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data)
    alert('Form submitted successfully!')
    navigate('/forms')
  }

  const handleError = (error: Error) => {
    console.error('Form error:', error)
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box mb={2}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/forms')}
        >
          Back to Forms
        </Button>
      </Box>

      <DynamicFormRenderer
        formPath={formPath}
        onSubmit={handleSubmit}
        onError={handleError}
      />
    </Container>
  )
}
