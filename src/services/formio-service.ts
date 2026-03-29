import axios, { type AxiosInstance } from 'axios'

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
