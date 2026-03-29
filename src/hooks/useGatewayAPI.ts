/**
 * useGatewayAPI Hook
 * 
 * React hook for calling APIs through Dynamic Gateway.
 * Provides loading, error handling, and data management.
 */

import { useState, useCallback, useEffect } from 'react'
import { gatewayAPI, type GatewayAPICallRequest, type GatewayAPIResponse } from '@/services/gateway-api-service'

export interface UseGatewayAPIOptions {
  /** Auto-call the API on mount */
  autoCall?: boolean
  /** Initial parameters for auto-call */
  initialParams?: GatewayAPICallRequest
  /** Callback on success */
  onSuccess?: (data: any) => void
  /** Callback on error */
  onError?: (error: any) => void
}

export interface UseGatewayAPIReturn<T> {
  /** Current data from API */
  data: T | null
  /** Loading state */
  loading: boolean
  /** Error state */
  error: string | null
  /** Call the API manually */
  call: (request?: GatewayAPICallRequest) => Promise<GatewayAPIResponse<T>>
  /** Reset state */
  reset: () => void
  /** Last response metadata */
  metadata: GatewayAPIResponse['metadata'] | null
  /** Whether response came from mock */
  fromMock: boolean
}

/**
 * Hook for calling a specific API through Dynamic Gateway
 * 
 * @param apiId - The ID of the registered API
 * @param options - Optional configuration
 * @returns API state and call function
 * 
 * @example
 * ```tsx
 * function PropertyTax() {
 *   const { data, loading, error, call } = useGatewayAPI('getPropertyTax')
 *   
 *   const handleGetTax = async () => {
 *     await call({ params: { propertyId: '12345' } })
 *   }
 *   
 *   return (
 *     <div>
 *       <button onClick={handleGetTax} disabled={loading}>
 *         {loading ? 'Loading...' : 'Get Tax Info'}
 *       </button>
 *       {error && <div>Error: {error}</div>}
 *       {data && <TaxDisplay data={data} />}
 *     </div>
 *   )
 * }
 * ```
 */
export function useGatewayAPI<T = any>(
  apiId: string,
  options: UseGatewayAPIOptions = {}
): UseGatewayAPIReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<GatewayAPIResponse['metadata'] | null>(null)
  const [fromMock, setFromMock] = useState(false)

  const call = useCallback(
    async (request: GatewayAPICallRequest = {}): Promise<GatewayAPIResponse<T>> => {
      setLoading(true)
      setError(null)

      try {
        const response = await gatewayAPI.call<T>(apiId, request)

        if (response.success && response.data) {
          setData(response.data)
          setMetadata(response.metadata || null)
          setFromMock(response.metadata?.fromMock || false)
          options.onSuccess?.(response.data)
        } else if (response.error) {
          const errorMessage = response.error.message || 'API call failed'
          setError(errorMessage)
          options.onError?.(response.error)
        }

        setLoading(false)
        return response
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
        setLoading(false)
        options.onError?.(err)

        return {
          success: false,
          error: {
            code: 'UNKNOWN_ERROR',
            message: errorMessage,
            details: err
          }
        }
      }
    },
    [apiId, options]
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setMetadata(null)
    setFromMock(false)
    setLoading(false)
  }, [])

  // Auto-call on mount if enabled
  useEffect(() => {
    if (options.autoCall) {
      call(options.initialParams)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    loading,
    error,
    call,
    reset,
    metadata,
    fromMock
  }
}

/**
 * Hook for managing multiple API calls
 * 
 * @param apiIds - Array of API IDs to manage
 * @returns Object with call functions for each API
 * 
 * @example
 * ```tsx
 * function Dashboard() {
 *   const apis = useGatewayAPIs(['getUserInfo', 'getPropertyTax', 'getPaymentHistory'])
 *   
 *   useEffect(() => {
 *     apis.getUserInfo.call()
 *     apis.getPropertyTax.call({ params: { propertyId: '12345' } })
 *     apis.getPaymentHistory.call()
 *   }, [])
 *   
 *   return (
 *     <div>
 *       {apis.getUserInfo.loading && <Spinner />}
 *       {apis.getUserInfo.data && <UserProfile user={apis.getUserInfo.data} />}
 *       
 *       {apis.getPropertyTax.loading && <Spinner />}
 *       {apis.getPropertyTax.data && <TaxInfo tax={apis.getPropertyTax.data} />}
 *     </div>
 *   )
 * }
 * ```
 */
export function useGatewayAPIs<T extends string>(
  apiIds: T[]
): Record<T, UseGatewayAPIReturn<any>> {
  const apis: any = {}

  for (const apiId of apiIds) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    apis[apiId] = useGatewayAPI(apiId)
  }

  return apis
}

/**
 * Hook for checking gateway availability
 * 
 * @returns Gateway availability status
 */
export function useGatewayStatus() {
  const [available, setAvailable] = useState<boolean | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkGateway = async () => {
      setChecking(true)
      const isAvailable = await gatewayAPI.ping()
      setAvailable(isAvailable)
      setChecking(false)
    }

    checkGateway()

    // Re-check every 30 seconds
    const interval = setInterval(checkGateway, 30000)

    return () => clearInterval(interval)
  }, [])

  return { available, checking }
}
