// Authentication utilities and types
export interface AuthUser {
    id: string
    email: string
    firstName: string
    lastName: string
    role: "JOBSEEKER" | "EMPLOYER"
    profilePicture?: string
  }
  
  export interface AuthResponse {
    success: boolean
    user?: AuthUser
    token?: string
    message?: string
  }
  
  // Get your backend URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""

  
  // Handle Google OAuth login
  export const initiateGoogleAuth = (role: "JOBSEEKER" | "EMPLOYER") => {
    console.log("Initiating Google OAuth for role:", role)  
    // Redirect to your backend Google OAuth endpoint with role parameter
    window.location.href = `${API_BASE_URL}/api/users/auth/google?role=${role}`
  }
  
  // Handle OAuth callback and extract user data
  export const handleOAuthCallback = async (): Promise<AuthResponse> => {
    try {
      // This would typically be called from your callback page
      // The backend should redirect here with user data or token
      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get("token")
      const error = urlParams.get("error")
  
      if (error) {
        return { success: false, message: error }
      }
  
      if (token) {
        // Store token in localStorage or cookies
        localStorage.setItem("authToken", token)
  
        // Fetch user data using the token
        const response = await fetch(`${API_BASE_URL}/api/users/get-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
  
        if (response.ok) {
          const userData = await response.json()
          return { success: true, user: userData, token }
        }
      }
  
      return { success: false, message: "Authentication failed" }
    } catch (error) {
      return { success: false, message: "Authentication error occurred" }
    }
  }
  
  // Check if user is authenticated
  export const isAuthenticated = (): boolean => {
    if (typeof window === "undefined") return false
    return !!localStorage.getItem("authToken")
  }
  
  // Get stored auth token
  export const getAuthToken = (): string | null => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("authToken")
  }
  
  // Clear authentication data
  export const clearAuth = (): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem("authToken")
  }
  