# 🎯 Quick Start Guide - MUNI + Form.io

## Current Status: ✅ FULLY OPERATIONAL

### Running Services
```
✅ MUNI Website:      http://localhost:3000
✅ Form.io Builder:   http://localhost:5173
✅ Form.io API:       http://localhost:3001
```

---

## 🚀 Quick Test (5 Minutes)

### Step 1: Create a Test Form (2 min)
1. Open: **http://localhost:5173**
2. Click green **"Add Node"** button (top toolbar)
3. Select **"📋 Form"** from dropdown
4. A form node will appear on canvas
5. Click on the form node
6. Right panel shows "Form Builder"
7. Add some fields:
   - Drag **"Text Field"** → Label: "Full Name"
   - Drag **"Email"** → Label: "Email Address"
   - Drag **"Text Area"** → Label: "Message"
8. Click **"Save Form"** button
9. Name it: **"contact-form"** (lowercase, no spaces)
10. Click Save

### Step 2: View Form in MUNI (1 min)
1. Open: **http://localhost:3000/forms**
2. You should see your "Contact Form" card
3. Click **"Open Form"** button

### Step 3: Test Form Submission (2 min)
1. Fill out the form fields
2. Click **"Submit"** button
3. Should see success alert
4. Form data is saved to MongoDB

---

## 📋 Create Real Municipal Forms

### Arnona Request Form
Create form with path: **"arnona-request"**

**Fields to add:**
- Text Field: Property ID
- Text Field: Owner Name  
- Email: Email Address
- Number: Property Tax Amount
- Select: Payment Method (Cash, Credit, Bank Transfer)
- Checkbox: Terms and Conditions
- Text Area: Additional Notes

### Land Registry Form
Create form with path: **"land-registry-request"**

**Fields to add:**
- Text Field: Plot Number
- Text Field: Block Number
- Text Field: Applicant Name
- Email: Email
- Phone Number: Contact Phone
- Select: Request Type (New Registration, Transfer, Update)
- File Upload: Supporting Documents
- Text Area: Request Details

### Engineering Request Form
Create form with path: **"engineering-request"**

**Fields to add:**
- Text Field: Project Name
- Text Field: Address
- Select: Service Type (Building Permit, Infrastructure, Inspection)
- Date: Requested Date
- File Upload: Plans/Documents
- Text Area: Project Description

---

## 🔗 Integration with Existing MUNI Pages

### Replace Static Form in Arnona Page

**File:** `src/pages/arnona-request/arnona-request.tsx`

Find the existing form code and replace with:

```typescript
import { DynamicFormRenderer } from '@/components/DynamicForm/DynamicFormRenderer'

// Inside the component:
<DynamicFormRenderer
  formPath="arnona-request"
  onSubmit={(data) => {
    console.log('Arnona submission:', data)
    // Add your submission logic here
    alert('Arnona request submitted successfully!')
  }}
  onError={(error) => {
    console.error('Form error:', error)
  }}
/>
```

### Replace Static Form in Land Registry Page

**File:** `src/pages/request-for-land-registry/request-for-land-registry.tsx`

```typescript
import { DynamicFormRenderer } from '@/components/DynamicForm/DynamicFormRenderer'

// Inside the component:
<DynamicFormRenderer
  formPath="land-registry-request"
  onSubmit={(data) => {
    console.log('Land registry submission:', data)
    // Add your submission logic
    alert('Land registry request submitted!')
  }}
/>
```

---

## 💡 Pro Tips

### Pre-fill Form Data
```typescript
<DynamicFormRenderer
  formPath="arnona-request"
  initialData={{
    ownerName: currentUser.name,
    email: currentUser.email,
  }}
  onSubmit={handleSubmit}
/>
```

### Read-Only Mode
```typescript
<DynamicFormRenderer
  formPath="arnona-request"
  readOnly={true}
  showSubmitButton={false}
/>
```

### Custom Submit Handler
```typescript
const handleSubmit = async (data: any) => {
  try {
    // Send to your backend
    await axios.post('/api/arnona-requests', data)
    
    // Show success message
    toast.success('Request submitted successfully!')
    
    // Navigate to success page
    navigate('/requests/success')
  } catch (error) {
    toast.error('Failed to submit request')
  }
}

<DynamicFormRenderer
  formPath="arnona-request"
  onSubmit={handleSubmit}
/>
```

---

## 🎨 Styling

Form.io forms automatically use MUNI's Material-UI theme. The Form.io CSS is already loaded in `index.html`.

### Custom Styles
Add to your component CSS:
```css
.formio-form {
  /* Custom form styles */
}

.formio-component {
  /* Custom field styles */
}
```

---

## 📊 View Submissions

### In Form.io Builder
1. Go to: http://localhost:5173
2. Click on a form node
3. Right panel shows "Submissions" tab
4. View all submission data

### Via API
```typescript
import { formioService } from '@/services/formio-service'

// Get all submissions for a form
const submissions = await formioService.getSubmissions('contact-form')

// Get specific submission
const submission = await formioService.getSubmissionById('submission-id')
```

---

## 🔄 Workflow

```
User fills form in MUNI
         ↓
DynamicFormRenderer component
         ↓
formio-service.ts
         ↓
Form.io API (Port 3001)
         ↓
MongoDB (Port 27017)
         ↓
Submission saved ✅
```

---

## 🐛 Common Issues

### "Cannot find module '@/components/DynamicForm/FormManager'"
**Fix:** Check that the file exists and TypeScript paths are configured

### "Failed to fetch form"
**Fix:** Ensure Form.io API is running at localhost:3001

### "Form not found"
**Fix:** Check form path spelling (must match exactly)

### CORS errors
**Fix:** Form.io server needs to allow localhost:3000

---

## 📱 Mobile Responsive

All Form.io forms are automatically mobile-responsive. Test on different screen sizes.

---

## 🎊 You're All Set!

The integration is complete and ready to use. Start by creating a test form and viewing it in MUNI!

**Questions?** Check the full documentation in:
- `INTEGRATION_SUCCESS.md` - Complete integration guide
- `INTEGRATION_STATUS.md` - Current status and fixes
- `IMPLEMENTATION_STEPS.md` - Detailed implementation steps
- `FORMIO_INTEGRATION_PLAN.md` - Full architecture plan

---

**Happy Form Building!** 🚀
