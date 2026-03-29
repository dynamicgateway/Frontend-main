/**
 * Gateway API Service
 * 
 * Service layer for MUNI to communicate with Dynamic Gateway's API Registry.
 * Handles API calls through the gateway proxy with mock/real switching.
 */

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || 'http://localhost:5173'

export interface GatewayAPICallRequest {
  params?: Record<string, any>
  data?: any
  headers?: Record<string, string>
}

export interface GatewayAPIResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  metadata?: {
    apiId: string
    fromMock: boolean
    duration: number
    timestamp: string
    statusCode?: number
  }
}

export interface APIInfo {
  id: string
  name: string
  description: string
  method: string
  category: string
  active: boolean
  mock: boolean
}

/**
 * Gateway API Service Class
 * 
 * Provides methods to call registered APIs through Dynamic Gateway
 */
class GatewayAPIService {
  private baseURL: string

  constructor(baseURL: string = GATEWAY_URL) {
    this.baseURL = baseURL
  }

  /**
   * Call a registered API through the gateway
   * 
   * @param apiId - The ID of the registered API
   * @param request - Request parameters, data, and headers
   * @returns Promise with API response
   */
  async call<T = any>(
    apiId: string,
    request: GatewayAPICallRequest = {}
  ): Promise<GatewayAPIResponse<T>> {
    try {
      // Check if Dynamic Gateway service is available globally
      if (typeof window !== 'undefined' && (window as any).apiGatewayService) {
        // If running in iframe or same origin, use direct service
        const service = (window as any).apiGatewayService
        return await service.call(apiId, request)
      }

      // Otherwise, make HTTP call to Dynamic Gateway
      const response = await fetch(`${this.baseURL}/api/gateway/call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(request.headers || {})
        },
        body: JSON.stringify({
          apiId,
          request
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data: GatewayAPIResponse<T> = await response.json()
      return data
    } catch (error) {
      console.error(`[GatewayAPI] Error calling API ${apiId}:`, error)
      return {
        success: false,
        error: {
          code: 'GATEWAY_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error',
          details: error
        }
      }
    }
  }

  /**
   * Get list of available APIs from the gateway
   * 
   * @param category - Optional category filter
   * @returns Promise with list of API info
   */
  async getAPIs(category?: string): Promise<APIInfo[]> {
    try {
      // Check if Dynamic Gateway service is available
      if (typeof window !== 'undefined' && (window as any).apiGatewayService) {
        const service = (window as any).apiGatewayService
        return service.getAPIList(category)
      }

      // Otherwise, make HTTP call
      const url = category
        ? `${this.baseURL}/api/gateway/apis?category=${category}`
        : `${this.baseURL}/api/gateway/apis`

      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data.apis || []
    } catch (error) {
      console.error('[GatewayAPI] Error fetching APIs:', error)
      return []
    }
  }

  /**
   * Batch call multiple APIs in parallel
   * 
   * @param calls - Array of API calls with apiId and request
   * @returns Promise with array of responses
   */
  async batchCall<T = any>(
    calls: Array<{ apiId: string; request?: GatewayAPICallRequest }>
  ): Promise<GatewayAPIResponse<T>[]> {
    return Promise.all(
      calls.map(({ apiId, request }) => this.call<T>(apiId, request))
    )
  }

  /**
   * Check if gateway is available
   */
  async ping(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/api/gateway/ping`)
      return response.ok
    } catch {
      return false
    }
  }
}

// Singleton instance
export const gatewayAPI = new GatewayAPIService()

// Named export for custom instances
export { GatewayAPIService }
