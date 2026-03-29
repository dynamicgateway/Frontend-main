/**
 * Form.io Renderer for MUNI
 * Fetches forms from Dynamic Gateway and renders them
 */

import React, { useState, useEffect } from 'react'
import { Form } from '@formio/react'
import './FormioRenderer.css'

interface FormioRendererProps {
  formId: string
  apiBaseUrl?: string
  onSubmit?: (submission: any) => void
  onError?: (error: any) => void
}

export const FormioRenderer: React.FC<FormioRendererProps> = ({
  formId,
  apiBaseUrl = 'http://localhost:5173',
  onSubmit,
  onError
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formDefinition, setFormDefinition] = useState<any>(null)

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true)
        setError(null)

        const url = `${apiBaseUrl}/api/forms?id=${formId}`
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        
        if (!data.success || !data.form || !data.form.formio) {
          throw new Error('Invalid form data')
        }

        setFormDefinition(data.form.formio)
        setLoading(false)
      } catch (err: any) {
        setError(err.message || 'Failed to load form')
        setLoading(false)
        if (onError) onError(err)
      }
    }

    fetchForm()
  }, [formId, apiBaseUrl])

  const handleSubmit = (submission: any) => {
    if (onSubmit) onSubmit(submission)
  }

  const handleError = (errors: any) => {
    if (onError) onError(errors)
  }

  if (loading) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        color: '#666'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          טוען טופס...
        </div>
        <div style={{ fontSize: '14px' }}>
          Loading form from Dynamic Gateway...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        color: '#ef4444',
        backgroundColor: '#fee',
        borderRadius: '8px',
        border: '1px solid #fcc'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          שגיאה בטעינת הטופס
        </div>
        <div style={{ fontSize: '14px' }}>
          {error}
        </div>
      </div>
    )
  }

  if (!formDefinition) {
    return null
  }

  return (
    <div className="formio-muni-wrapper" style={{ width: '100%' }}>
      <Form 
        form={formDefinition}
        onSubmit={handleSubmit}
        onError={handleError}
      />
    </div>
  )
}

export default FormioRenderer
