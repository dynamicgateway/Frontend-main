/**
 * MUNI Mock Authentication Store
 * 
 * Provides mock authentication for testing MUNI without real backend.
 * Uses Dynamic Gateway API for authentication calls.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useMockAuthStore = create(
  persist(
    (set, get) => ({
      // State
      isAuthenticated: false,
      user: null,
      token: null,
      sessionExpiry: null,
      demoMode: true, // Enable demo mode by default
      
      // Demo credentials
      DEMO_USERNAME: 'demo@muni.gov.il',
      DEMO_PASSWORD: 'demo123',
      
      // Login with mock API
      login: async (username, password) => {
        console.log('[MockAuth] Attempting login:', username)
        
        // If demo mode, accept any credentials
        if (get().demoMode) {
          console.log('[MockAuth] Demo mode active - accepting any credentials')
          
          // Call mock API through gateway
          if (window.apiGatewayService) {
            try {
              const response = await window.apiGatewayService.call('login', {
                data: { username, password }
              })
              
              if (response.success) {
                const { token, user, expiresIn } = response.data
                const expiry = Date.now() + (expiresIn * 1000)
                
                set({
                  isAuthenticated: true,
                  user,
                  token,
                  sessionExpiry: expiry
                })
                
                console.log('[MockAuth] Login successful:', user)
                return { success: true, user }
              }
            } catch (error) {
              console.error('[MockAuth] API call failed:', error)
            }
          }
          
          // Fallback: Create mock user if API not available
          const mockUser = {
            id: 'user-001',
            username: username,
            firstName: 'דמו',
            lastName: 'משתמש',
            email: username,
            phone: '050-1234567',
            idNumber: '123456789',
            role: 'citizen',
            properties: [
              { id: 'prop-001', address: '123 רחוב דיזנגוף, תל אביב', propertyId: '12345' }
            ]
          }
          
          const mockToken = 'mock-token-' + Date.now()
          const expiry = Date.now() + (3600 * 1000)
          
          set({
            isAuthenticated: true,
            user: mockUser,
            token: mockToken,
            sessionExpiry: expiry
          })
          
          console.log('[MockAuth] Fallback login successful')
          return { success: true, user: mockUser }
        }
        
        // Normal mode - validate credentials
        if (username === get().DEMO_USERNAME && password === get().DEMO_PASSWORD) {
          return get().login(username, password) // Recursively call in demo mode
        }
        
        return { success: false, error: 'Invalid credentials' }
      },
      
      // Logout
      logout: async () => {
        console.log('[MockAuth] Logging out')
        
        // Call mock logout API if available
        if (window.apiGatewayService) {
          try {
            await window.apiGatewayService.call('logout', {})
          } catch (error) {
            console.error('[MockAuth] Logout API call failed:', error)
          }
        }
        
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          sessionExpiry: null
        })
        
        console.log('[MockAuth] Logged out successfully')
      },
      
      // Validate session
      validateSession: async () => {
        const { token, sessionExpiry } = get()
        
        if (!token || !sessionExpiry) {
          return false
        }
        
        // Check expiry
        if (Date.now() > sessionExpiry) {
          console.log('[MockAuth] Session expired')
          get().logout()
          return false
        }
        
        // Call validation API if available
        if (window.apiGatewayService) {
          try {
            const response = await window.apiGatewayService.call('validateSession', {})
            if (response.success && response.data.valid) {
              return true
            }
          } catch (error) {
            console.error('[MockAuth] Session validation failed:', error)
          }
        }
        
        // Fallback: Just check expiry
        return Date.now() < sessionExpiry
      },
      
      // Get user profile
      getProfile: async () => {
        if (!get().isAuthenticated) {
          return null
        }
        
        // Call profile API if available
        if (window.apiGatewayService) {
          try {
            const response = await window.apiGatewayService.call('getUserProfile', {})
            if (response.success) {
              set({ user: response.data })
              return response.data
            }
          } catch (error) {
            console.error('[MockAuth] Profile fetch failed:', error)
          }
        }
        
        return get().user
      },
      
      // Toggle demo mode
      setDemoMode: (enabled) => {
        set({ demoMode: enabled })
        console.log('[MockAuth] Demo mode:', enabled ? 'enabled' : 'disabled')
      }
    }),
    {
      name: 'muni-mock-auth-storage'
    }
  )
)
