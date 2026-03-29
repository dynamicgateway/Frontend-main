# Form.io Dynamic Gateway Integration Plan

## Overview
Integrate the Form.io Dynamic Gateway platform with the Municipal Services Portal to enable dynamic form embedding and submission.

## Architecture

### Form.io Platform (Port 3001)
- **Running**: `http://localhost:3001`
- **Forms API**: `/form` endpoint
- **Submissions API**: `/form/{formId}/submission`
- **Authentication**: JWT tokens via `x-jwt-token` header

### Municipal Portal (Frontend-main)
- **Tech Stack**: React 18 + TypeScript + Vite
- **State Management**: Redux
- **Routing**: React Router
- **Styling**: Tailwind CSS + Emotion

---

## Implementation Steps

### Phase 1: Setup & Configuration (IMMEDIATE)

#### 1.1 Install Dependencies
```bash
npm install formiojs@4.14.12 @formio/react@5.3.0 axios@1.6.5
```

#### 1.2 Create Form.io Service Layer
**File**: `src/services/formio-service.ts`
- API client configuration
- Form fetching methods
- Submission handling
- Error management

#### 1.3 Create Environment Configuration
**File**: `.env` (update)
```env
VITE_FORMIO_API_URL=http://localhost:3001
VITE_FORMIO_PROJECT_URL=http://localhost:3001
```

---

### Phase 2: Core Components

#### 2.1 Dynamic Form Renderer Component
**File**: `src/components/DynamicForm/DynamicFormRenderer.tsx`

**Features**:
- Fetches form schema from Form.io API
- Renders Form.io form with full validation
- Handles form submissions
- Shows loading and error states
- Supports pre-filled data

**Props**:
```typescript
interface DynamicFormRendererProps {
  formPath: string          // Form identifier (e.g., 'arnona-request')
  onSubmit?: (data: any) => void
  initialData?: Record<string, any>
  readOnly?: boolean
  showSubmitButton?: boolean
}
```

#### 2.2 Form Manager Component
**File**: `src/components/DynamicForm/FormManager.tsx`

**Features**:
- Lists available forms from Form.io
- Shows form metadata (title, description, fields)
- Provides form preview
- Handles form selection

#### 2.3 Submission History Component
**File**: `src/components/DynamicForm/SubmissionHistory.tsx`

**Features**:
- Lists user's form submissions
- Shows submission status
- Allows viewing submitted data
- Provides PDF export option

---

### Phase 3: Integration with Existing Pages

#### 3.1 Arnona Request Page
**File**: `src/pages/arnona-request/arnona-request.tsx`

**Changes**:
```typescript
import { DynamicFormRenderer } from '@/components/DynamicForm/DynamicFormRenderer'

// Replace static form with:
<DynamicFormRenderer
  formPath="arnona-request"
  onSubmit={(data) => handleArnonaSubmission(data)}
  initialData={userPropertyData}
/>
```

#### 3.2 Land Registry Request
**File**: `src/pages/request-for-land-registry/request-for-land-registry.tsx`

**Changes**:
```typescript
<DynamicFormRenderer
  formPath="land-registry-request"
  onSubmit={(data) => handleLandRegistrySubmission(data)}
/>
```

#### 3.3 Generic Request Pages
**Pattern**: Create a reusable page component for any form type

**File**: `src/pages/generic-form-page/GenericFormPage.tsx`

```typescript
export const GenericFormPage = () => {
  const { formPath } = useParams()
  
  return (
    <PageLayout>
      <DynamicFormRenderer
        formPath={formPath}
        onSubmit={handleGenericSubmission}
      />
    </PageLayout>
  )
}
```

---

### Phase 4: New Routes & Navigation

#### 4.1 Add Dynamic Form Routes
**File**: `src/routes/routes.tsx`

```typescript
{
  path: '/forms/:formPath',
  element: <GenericFormPage />
},
{
  path: '/forms',
  element: <FormManager />
},
{
  path: '/my-submissions',
  element: <SubmissionHistory />
}
```

#### 4.2 Update Main Menu
**File**: `src/pages/main-menu/main-menu.tsx`

**Add**:
- "My Submissions" link to Personal Area
- Dynamic form links from Form.io registry

---

### Phase 5: Advanced Features

#### 5.1 Form Builder Integration (Admin)
**File**: `src/pages/admin/form-builder.tsx`

**Features**:
- Embed Form.io builder
- Create/edit forms
- Publish forms
- Set permissions

#### 5.2 Workflow Integration
**File**: `src/services/workflow-service.ts`

**Features**:
- Trigger workflows on form submission
- Connect to Dynamic Gateway workflows
- Execute approval chains
- Send notifications

#### 5.3 Multi-Language Forms
**Integration**: Connect i18next with Form.io translations

#### 5.4 PDF Generation
**Feature**: Generate PDF from submissions using Form.io PDF service

---

## Testing Strategy

### Unit Tests
- Form fetching logic
- Submission handling
- Error scenarios

### Integration Tests
- Form rendering
- Submission flow
- API communication

### E2E Tests (Cypress/Playwright)
1. User fills out Arnona form
2. Form validates correctly
3. Submission saves to Form.io
4. User sees submission in history

---

## Deployment Considerations

### Docker Configuration
**File**: `docker-compose.yml` (in Frontend-main)

```yaml
version: '3.8'
services:
  municipal-portal:
    build: .
    ports:
      - "5173:80"
    environment:
      - VITE_FORMIO_API_URL=http://formio-server:3001
    depends_on:
      - formio-server
    networks:
      - municipal-network

  formio-server:
    image: calipseo/formio:latest
    ports:
      - "3001:3001"
    environment:
      - MONGO_URL=mongodb://formio-mongo:27017/formio
    depends_on:
      - formio-mongo
    networks:
      - municipal-network

  formio-mongo:
    image: mongo:5
    volumes:
      - formio-data:/data/db
    networks:
      - municipal-network

networks:
  municipal-network:
    driver: bridge

volumes:
  formio-data:
```

### Production Build
```bash
npm run build
docker build -t municipal-portal .
docker-compose up -d
```

---

## Security Measures

### 1. Authentication
- Integrate with existing authentication
- Pass JWT to Form.io requests
- Implement role-based form access

### 2. Data Validation
- Server-side validation via Form.io
- Client-side validation via Form.io
- Sanitize all inputs

### 3. API Security
- CORS configuration
- Rate limiting
- Request signing

---

## Performance Optimizations

### 1. Form Caching
```typescript
// Cache form schemas in localStorage
const cachedForms = new Map<string, FormSchema>()
```

### 2. Lazy Loading
```typescript
const DynamicFormRenderer = lazy(() => 
  import('@/components/DynamicForm/DynamicFormRenderer')
)
```

### 3. Code Splitting
- Split Form.io bundle
- Load form components on demand

---

## Monitoring & Analytics

### 1. Form Metrics
- Track form completion rates
- Monitor submission times
- Identify problematic fields

### 2. Error Tracking
- Log Form.io API errors
- Track client-side validation failures
- Monitor submission failures

### 3. User Analytics
- Most used forms
- Form abandonment rates
- Average completion time

---

## Migration Strategy

### Phase 1: Parallel Operation (Week 1-2)
- Deploy Form.io alongside existing forms
- Test with limited users
- Compare data accuracy

### Phase 2: Gradual Rollout (Week 3-4)
- Move one form at a time to Form.io
- Monitor for issues
- Gather user feedback

### Phase 3: Full Migration (Week 5-6)
- Migrate all forms to Form.io
- Deprecate old form system
- Archive historical data

---

## Success Criteria

✅ All existing forms work in Form.io  
✅ Zero data loss during migration  
✅ Form submission time < 2 seconds  
✅ 99.9% uptime for Form.io API  
✅ User satisfaction >= 90%  
✅ Admin can create new forms without code changes  

---

## Next Steps (IMMEDIATE)

1. **Install Node.js** (if not installed)
2. **Install dependencies**: `npm install formiojs @formio/react axios`
3. **Create Form.io service** (see Phase 2.1)
4. **Test with Arnona form** (see Phase 3.1)
5. **Deploy to staging** (see Deployment section)

---

## Support & Documentation

- **Form.io Docs**: https://help.form.io
- **Dynamic Gateway**: http://localhost:5173
- **API Reference**: http://localhost:3001/docs
- **Support**: Contact platform administrator

---

**Status**: Ready for Implementation  
**Priority**: HIGH  
**Estimated Time**: 2-3 weeks for full integration  
**Risk Level**: LOW (using established technologies)
