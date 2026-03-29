import React, { useState } from 'react'
import { FormIframeRenderer } from '@/components/DynamicForm/FormIframeRenderer'
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button,
  Paper,
  Alert,
  Grid,
  Card,
  CardContent
} from '@mui/material'

/**
 * Demo page showing how to embed Dynamic Gateway forms via iframe
 * This approach works for ANY customer website
 */
export const IframeFormDemoPage: React.FC = () => {
  const [formPath, setFormPath] = useState('contact-form')
  const [currentForm, setCurrentForm] = useState('contact-form')
  const [submissionData, setSubmissionData] = useState<any>(null)

  const handleLoadForm = () => {
    setCurrentForm(formPath)
    setSubmissionData(null)
  }

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted from iframe:', data)
    setSubmissionData(data)
  }

  const handleFormError = (error: Error) => {
    console.error('Form error:', error)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h3" gutterBottom>
          📋 Dynamic Gateway Form Embedding
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Universal iframe-based form integration for any customer website
        </Typography>
      </Box>

      {/* Quick Start Examples */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact Form
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Basic contact form with name, email, and message fields
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => {
                  setFormPath('contact-form')
                  setCurrentForm('contact-form')
                }}
              >
                Load Form
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Arnona Request
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Municipal property tax request form
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => {
                  setFormPath('arnona-request')
                  setCurrentForm('arnona-request')
                }}
              >
                Load Form
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Land Registry
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Land registration and transfer requests
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => {
                  setFormPath('land-registry-request')
                  setCurrentForm('land-registry-request')
                }}
              >
                Load Form
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Form Path Selector */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Load Custom Form
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            fullWidth
            label="Form Path"
            value={formPath}
            onChange={(e) => setFormPath(e.target.value)}
            placeholder="e.g., contact-form"
            helperText="Enter the form path from Dynamic Gateway"
          />
          <Button 
            variant="contained" 
            onClick={handleLoadForm}
            sx={{ minWidth: '120px' }}
          >
            Load
          </Button>
        </Box>
      </Paper>

      {/* Submission Success Message */}
      {submissionData && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6">Form Submitted Successfully!</Typography>
          <Typography variant="body2">
            Submission ID: {submissionData._id || 'N/A'}
          </Typography>
        </Alert>
      )}

      {/* Embedded Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Embedded Form: {currentForm}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          This form is loaded via iframe from Dynamic Gateway (http://localhost:5173)
        </Typography>
        
        <FormIframeRenderer
          formPath={currentForm}
          formioBaseUrl="http://localhost:5173"
          height="600px"
          onSubmit={handleFormSubmit}
          onError={handleFormError}
          onLoad={() => console.log('Form loaded in iframe')}
        />
      </Paper>

      {/* Integration Code Examples */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          💻 Integration Code
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Use this code to embed forms in ANY website:
        </Typography>

        {/* React Example */}
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            React/TypeScript:
          </Typography>
          <pre style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '13px'
          }}>
{`import { FormIframeRenderer } from '@/components/DynamicForm/FormIframeRenderer'

<FormIframeRenderer
  formPath="${currentForm}"
  formioBaseUrl="http://localhost:5173"
  height="600px"
  onSubmit={(data) => {
    console.log('Form submitted:', data)
    // Handle submission
  }}
/>`}
          </pre>
        </Box>

        {/* HTML Example */}
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Pure HTML:
          </Typography>
          <pre style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '13px'
          }}>
{`<iframe
  src="http://localhost:5173/embed/${currentForm}"
  width="100%"
  height="600"
  frameborder="0"
  title="Form"
  allow="clipboard-write"
  style="border: none; border-radius: 8px;"
></iframe>

<script>
  // Listen for form submissions
  window.addEventListener('message', function(event) {
    const data = JSON.parse(event.data)
    if (data.type === 'formio:submit') {
      console.log('Form submitted:', data.submission)
      // Handle submission
    }
  })
</script>`}
          </pre>
        </Box>

        {/* WordPress Example */}
        <Box>
          <Typography variant="h6" gutterBottom>
            WordPress/CMS:
          </Typography>
          <pre style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '13px'
          }}>
{`<!-- Add this to any WordPress page/post -->
<iframe
  src="http://localhost:5173/embed/${currentForm}"
  width="100%"
  height="600"
  frameborder="0"
  style="border: none; border-radius: 8px;"
></iframe>`}
          </pre>
        </Box>
      </Paper>
    </Container>
  )
}
