/**
 * Form.io Test Page
 * 
 * Simple test page to verify MUNI can fetch and render forms
 * from Dynamic Gateway Form.io backend
 */

import React, { useState } from 'react'
import FormioRenderer from '@/components/FormioRenderer'

export const FormioTestPage: React.FC = () => {
  const [selectedFormId, setSelectedFormId] = useState('form-test-contact')
  const [submissions, setSubmissions] = useState<any[]>([])

  const handleSubmit = (data: any) => {
    console.log('[Test Page] Form submitted:', data)
    
    // Add to submissions list
    setSubmissions(prev => [...prev, {
      id: Date.now(),
      data,
      timestamp: new Date().toISOString()
    }])
    
    // Show success message
    alert('✓ טופס נשלח בהצלחה!\nForm submitted successfully!')
  }

  const handleError = (error: any) => {
    console.error('[Test Page] Form error:', error)
    // Don't show popup for loading errors, just log them
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#1e3a8a'
          }}>
            Form.io Integration Test
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '20px'
          }}>
            Testing MUNI → Dynamic Gateway → Form.io backend
          </p>
          
          {/* Form Selector */}
          <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <label style={{
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Select Form:
            </label>
            <select
              value={selectedFormId}
              onChange={(e) => setSelectedFormId(e.target.value)}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="form-test-contact">Test Contact Form</option>
              <option value="form-muni-login">MUNI Login Form</option>
            </select>
          </div>
        </div>

        {/* Form Renderer */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <FormioRenderer
            formId={selectedFormId}
            apiBaseUrl="http://localhost:5173"
            onSubmit={handleSubmit}
            onError={handleError}
          />
        </div>

        {/* Submissions Log */}
        {submissions.length > 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#1e3a8a'
            }}>
              📝 Submissions ({submissions.length})
            </h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  style={{
                    padding: '15px',
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #86efac',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '8px'
                  }}>
                    {new Date(sub.timestamp).toLocaleString()}
                  </div>
                  <pre style={{
                    fontSize: '13px',
                    backgroundColor: 'white',
                    padding: '10px',
                    borderRadius: '4px',
                    overflow: 'auto',
                    fontFamily: 'monospace'
                  }}>
                    {JSON.stringify(sub.data, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormioTestPage
