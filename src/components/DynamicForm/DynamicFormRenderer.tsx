import React, { useEffect, useState } from 'react'
import { Form } from '@formio/react'
import { formioService, type FormSchema } from '@/services/formio-service'
import { CircularProgress, Alert, Box, Paper, Typography } from '@mui/material'

interface DynamicFormRendererProps {
  formPath: string
  onSubmit?: (data: any) => void
  onError?: (error: Error) => void
  initialData?: Record<string, any>
  readOnly?: boolean
  showSubmitButton?: boolean
}

export const DynamicFormRenderer: React.FC<DynamicFormRendererProps> = ({
  formPath,
  onSubmit,
  onError,
  initialData = {},
  readOnly = false,
  showSubmitButton = true,
}) => {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadForm()
  }, [formPath])

  const loadForm = async () => {
    setLoading(true)
    setError(null)

    try {
      const schema = await formioService.getFormByPath(formPath)
      setFormSchema(schema)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load form'
      setError(errorMessage)
      onError?.(err instanceof Error ? err : new Error(errorMessage))
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (submission: any) => {
    setSubmitting(true)
    setError(null)

    try {
      const result = await formioService.submitForm(formPath, submission.data)
      onSubmit?.(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit form'
      setError(errorMessage)
      onError?.(err instanceof Error ? err : new Error(errorMessage))
    } finally {
      setSubmitting(false)
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
        <Typography variant="h6">Error Loading Form</Typography>
        <Typography>{error}</Typography>
      </Alert>
    )
  }

  if (!formSchema) {
    return (
      <Alert severity="warning" sx={{ my: 2 }}>
        Form not found
      </Alert>
    )
  }

  return (
    <Paper elevation={2} sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        {formSchema.title}
      </Typography>
      
      <Form
        form={formSchema}
        submission={{ data: initialData }}
        onSubmit={handleSubmit}
        options={{
          readOnly,
          noAlerts: false,
          i18n: {
            en: {
              submit: showSubmitButton ? 'Submit' : '',
            },
          },
        }}
      />

      {submitting && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Paper>
  )
}
