import axiosInstance from "./axios"
import type { AxiosRequestConfig, AxiosResponse } from "axios"

export type ApiResponse<T> =
  | {
      data: T
      error: null
    }
  | {
      data: null
      error: {
        message: string
        status?: number
      }
    }

export type ContentType = "json" | "formData"

// Dynamic GET request function
export async function apiGet<T>(
  endpoint: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get(endpoint, {
      params,
      ...config,
    })

    return { data: response.data, error: null }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || error.message || "An error occurred",
        status: error.response?.status,
      },
    }
  }
}

// Dynamic POST request function
export async function apiPost<T, D = any>(
  endpoint: string,
  payload?: D,
  contentType: ContentType = "json",
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  try {
    const requestConfig: AxiosRequestConfig = { ...config }
    let data = payload

    // Handle FormData
    if (contentType === "formData") {
      const formData = new FormData()

      if (payload) {
        Object.entries(payload).forEach(([key, value]) => {
          // Handle file uploads
          if (value instanceof File) {
            formData.append(key, value)
          }
          // Handle arrays
          else if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formData.append(`${key}[${index}]`, item)
            })
          }
          // Handle regular values
          else {
            formData.append(key, String(value))
          }
        })
      }

      data = formData
      requestConfig.headers = {
        ...requestConfig.headers,
        "Content-Type": "multipart/form-data",
      }
    }

    const response: AxiosResponse<T> = await axiosInstance.post(endpoint, data, requestConfig)

    return { data: response.data, error: null }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || error.message || "An error occurred",
        status: error.response?.status,
      },
    }
  }
}

// Dynamic PUT request function
export async function apiPut<T, D = any>(
  endpoint: string,
  payload?: D,
  contentType: ContentType = "json",
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  try {
    const requestConfig: AxiosRequestConfig = { ...config }
    let data = payload

    // Handle FormData
    if (contentType === "formData") {
      const formData = new FormData()

      if (payload) {
        Object.entries(payload).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value)
          } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formData.append(`${key}[${index}]`, item)
            })
          } else {
            formData.append(key, String(value))
          }
        })
      }

      data = formData
      requestConfig.headers = {
        ...requestConfig.headers,
        "Content-Type": "multipart/form-data",
      }
    }

    const response: AxiosResponse<T> = await axiosInstance.put(endpoint, data, requestConfig)

    return { data: response.data, error: null }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || error.message || "An error occurred",
        status: error.response?.status,
      },
    }
  }
}

// Dynamic PATCH request function
export async function apiPatch<T, D = any>(
  endpoint: string,
  payload?: D,
  contentType: ContentType = "json",
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  try {
    const requestConfig: AxiosRequestConfig = { ...config }
    let data = payload

    // Handle FormData
    if (contentType === "formData") {
      const formData = new FormData()

      if (payload) {
        Object.entries(payload).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value)
          } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formData.append(`${key}[${index}]`, item)
            })
          } else {
            formData.append(key, String(value))
          }
        })
      }

      data = formData
      requestConfig.headers = {
        ...requestConfig.headers,
        "Content-Type": "multipart/form-data",
      }
    }

    const response: AxiosResponse<T> = await axiosInstance.patch(endpoint, data, requestConfig)

    return { data: response.data, error: null }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || error.message || "An error occurred",
        status: error.response?.status,
      },
    }
  }
}

// Dynamic DELETE request function
export async function apiDelete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete(endpoint, config)

    return { data: response.data, error: null }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || error.message || "An error occurred",
        status: error.response?.status,
      },
    }
  }
}

