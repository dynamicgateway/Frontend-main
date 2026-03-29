import React, { useState, useEffect, useRef } from 'react'
import { CircularProgress, Alert, Box } from '@mui/material'

interface FormIframeRendererProps {
  formPath: string
  formioBaseUrl?: string
  width?: string
  height?: string
  onLoad?: () => void
  onError?: (error: Error) => void
  onSubmit?: (data: any) => void
  className?: string
  style?: React.CSSProperties
}

/**
 * Generic IFrame Renderer for Dynamic Gateway Forms
 * 
 * This component can be used in ANY customer website to load forms
 * from the Dynamic Gateway platform via iframe.
 * 
 * Usage:
 * <FormIframeRenderer 
 *   formPath="contact-form"
 *   formioBaseUrl="http://localhost:5173"
 *   height="600px"
 * />
 */
export const FormIframeRenderer: React.FC<FormIframeRendererProps> = ({
  formPath,
  formioBaseUrl = 'http://localhost:5173',
  width = '100%',
  height = '600px',
  onLoad,
  onError,
  onSubmit,
  className = '',
  style = {}
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Construct the embed URL
  const embedUrl = `${formioBaseUrl}/embed/${formPath}`

  useEffect(() => {
    // Listen for messages from the iframe
    const handleMessage = (event: MessageEvent) => {
      // Verify the origin for security
      if (!event.origin.includes('localhost')) {
        // In production, check against your actual domain
        // if (event.origin !== formioBaseUrl) return
      }

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data

        switch (data.type) {
          case 'formio:submit':
            console.log('Form submitted:', data.submission)
            onSubmit?.(data.submission)
            break

          case 'formio:error':
            console.error('Form error:', data.error)
            setError(data.error.message || 'Form error occurred')
            onError?.(new Error(data.error.message))
            break

          case 'formio:loaded':
            console.log('Form loaded successfully')
            setLoading(false)
            onLoad?.()
            break

          case 'formio:resize':
            // Auto-resize iframe based on content
            if (iframeRef.current && data.height) {
              iframeRef.current.style.height = `${data.height}px`
            }
            break
        }
      } catch (err) {
        console.error('Error parsing message from iframe:', err)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [onSubmit, onError, onLoad])

  const handleIframeLoad = () => {
    // Fallback if no message is received
    setTimeout(() => {
      if (loading) {
        setLoading(false)
        onLoad?.()
      }
    }, 1000)
  }

  const handleIframeError = () => {
    const errorMsg = 'Failed to load form'
    setError(errorMsg)
    setLoading(false)
    onError?.(new Error(errorMsg))
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Box className={className} style={{ position: 'relative', ...style }}>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={height}
        >
          <CircularProgress />
        </Box>
      )}
      
      <iframe
        ref={iframeRef}
        src={embedUrl}
        width={width}
        height={height}
        frameBorder="0"
        title={`Form: ${formPath}`}
        allow="clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        style={{
          border: 'none',
          borderRadius: '8px',
          display: loading ? 'none' : 'block',
          ...style
        }}
      />
    </Box>
  )
}
