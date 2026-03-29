# Form.io Integration - Step-by-Step Implementation Guide

## ⚠️ Prerequisites

Before starting, ensure you have:
- ✅ Node.js 18+ installed ([Download](https://nodejs.org/))
- ✅ Form.io platform running at `http://localhost:3001`
- ✅ React builder running at `http://localhost:5173`
- ✅ MongoDB container running

---

## Step 1: Install Dependencies

Open PowerShell in `C:\Users\HomePC\Frontend-main` and run:

```powershell
npm install formiojs@4.14.12 @formio/react@5.3.0 axios@1.6.5
```

Expected output:
```
added 3 packages in 15s
```

---

## Step 2: Create Environment Configuration

Create or update `.env` file:

```bash
# Form.io Configuration
VITE_FORMIO_API_URL=http://localhost:3001
VITE_FORMIO_PROJECT_URL=http://localhost:3001

# Existing configurations...
```

---

## Step 3: Create Form.io Service

Create `src/services/formio-service.ts`:

```typescript
import axios, { AxiosInstance } from 'axios'

interface FormSchema {
  _id: string
  title: string
  name: string
  path: string
  components: any[]
  display?: string
  type?: string
}

interface Submission {
  _id: string
  data: Record<string, any>
  created: string
  modified: string
  form: string
}

class FormioService {
  private api: AxiosInstance
  private baseURL: string

  constructor() {
    this.baseURL = import.meta.env.VITE_FORMIO_API_URL || 'http://localhost:3001'
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  setAuthToken(token: string) {
    this.api.defaults.headers.common['x-jwt-token'] = token
  }

  async getFormByPath(path: string): Promise<FormSchema> {
    try {
      const response = await this.api.get(`/form/${path}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching form ${path}:`, error)
      throw new Error(`Failed to fetch form: ${path}`)
    }
  }

  async getFormById(formId: string): Promise<FormSchema> {
    try {
      const response = await this.api.get(`/form/${formId}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching form ${formId}:`, error)
      throw new Error(`Failed to fetch form: ${formId}`)
    }
  }

  async getAllForms(): Promise<FormSchema[]> {
    try {
      const response = await this.api.get('/form')
      return response.data
    } catch (error) {
      console.error('Error fetching forms:', error)
      throw new Error('Failed to fetch forms')
    }
  }

  async submitForm(formPath: string, data: Record<string, any>): Promise<Submission> {
    try {
      const response = await this.api.post(`/form/${formPath}/submission`, {
        data,
      })
      return response.data
    } catch (error) {
      console.error(`Error submitting form ${formPath}:`, error)
      throw new Error(`Failed to submit form: ${formPath}`)
    }
  }

  async getSubmissions(formPath: string): Promise<Submission[]> {
    try {
      const response = await this.api.get(`/form/${formPath}/submission`)
      return response.data
    } catch (error) {
      console.error(`Error fetching submissions for ${formPath}:`, error)
      throw new Error(`Failed to fetch submissions: ${formPath}`)
    }
  }

  async getSubmissionById(submissionId: string): Promise<Submission> {
    try {
      const response = await this.api.get(`/submission/${submissionId}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching submission ${submissionId}:`, error)
      throw new Error(`Failed to fetch submission: ${submissionId}`)
    }
  }

  getFormUrl(formPath: string): string {
    return `${this.baseURL}/form/${formPath}`
  }
}

export const formioService = new FormioService()
export type { FormSchema, Submission }
```

---

## Step 4: Create Dynamic Form Renderer Component

Create `src/components/DynamicForm/DynamicFormRenderer.tsx`:

```typescript
import React, { useEffect, useState } from 'react'
import { Form } from '@formio/react'
import { formioService, FormSchema } from '@/services/formio-service'
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
```

---

## Step 5: Create Form Manager Component

Create `src/components/DynamicForm/FormManager.tsx`:

```typescript
import React, { useEffect, useState } from 'react'
import { formioService, FormSchema } from '@/services/formio-service'
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
          <Grid item xs={12} sm={6} md={4} key={form._id}>
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
```

---

## Step 6: Create Generic Form Page

Create `src/pages/generic-form-page/GenericFormPage.tsx`:

```typescript
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
```

---

## Step 7: Add Routes

Update `src/routes/routes.tsx` (or wherever routes are defined):

```typescript
import { GenericFormPage } from '@/pages/generic-form-page/GenericFormPage'
import { FormManager } from '@/components/DynamicForm/FormManager'

// Add to your routes array:
{
  path: '/forms',
  element: <FormManager />
},
{
  path: '/forms/:formPath',
  element: <GenericFormPage />
}
```

---

## Step 8: Import Form.io CSS

Add to `src/main.tsx` or `src/index.tsx`:

```typescript
import 'formiojs/dist/formio.full.min.css'
```

Or add to `index.html`:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
</head>
```

---

## Step 9: Test the Integration

1. **Start the Form.io platform**:
   ```powershell
   cd C:\Users\HomePC\formio-docker
   docker-compose up -d
   ```

2. **Start the Municipal Portal**:
   ```powershell
   cd C:\Users\HomePC\Frontend-main
   npm run start
   ```

3. **Access the forms**:
   - List: `http://localhost:5173/forms`
   - Specific form: `http://localhost:5173/forms/contact-form`

---

## Step 10: Replace Existing Forms

### Example: Arnona Request

Update `src/pages/arnona-request/arnona-request.tsx`:

```typescript
import { DynamicFormRenderer } from '@/components/DynamicForm/DynamicFormRenderer'

// Replace static form with:
<DynamicFormRenderer
  formPath="arnona-request"
  onSubmit={(data) => {
    console.log('Arnona submission:', data)
    // Handle submission (send to backend, update Redux, etc.)
  }}
  initialData={{
    // Pre-fill user data
    name: currentUser?.name,
    email: currentUser?.email,
  }}
/>
```

---

## Troubleshooting

### Issue: "Cannot find module 'formiojs'"
**Solution**: Run `npm install` again

### Issue: Forms not loading
**Solution**: 
1. Check Form.io is running: `http://localhost:3001`
2. Check browser console for CORS errors
3. Verify environment variable: `VITE_FORMIO_API_URL`

### Issue: Submission fails
**Solution**:
1. Check network tab for API errors
2. Verify authentication token
3. Check Form.io server logs

---

## Next Steps

- [ ] Add authentication integration
- [ ] Create submission history page
- [ ] Add form analytics
- [ ] Implement PDF export
- [ ] Add workflow triggers
- [ ] Configure form permissions
- [ ] Set up monitoring

---

**Status**: Ready to implement  
**Dependencies**: Node.js, npm, Form.io platform  
**Time**: 2-4 hours for basic integration
