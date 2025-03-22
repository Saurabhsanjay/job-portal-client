import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from "@tanstack/react-query"
import { apiGet, apiPost, apiPut, apiPatch, apiDelete, type ApiResponse, type ContentType } from "@/lib/api-utils"
import type { AxiosRequestConfig } from "axios"

// Type for query keys
export type QueryKeyT = [string, Record<string, any>?]

// Hook for GET requests
export function useApiGet<T>(
  endpoint: string,
  params?: Record<string, any>,
  queryKey?: QueryKeyT,
  options?: UseQueryOptions<ApiResponse<T>, Error, T>,
) {
  const actualQueryKey = queryKey || [endpoint, params]

  return useQuery<ApiResponse<T>, Error, T>({
    queryKey: actualQueryKey,
    queryFn: () => apiGet<T>(endpoint, params),
    select: (data) => {
      if (data.error) {
        throw new Error(data.error.message)
      }
      return data.data as T
    },
    ...options,
  })
}

// Hook for POST requests
export function useApiPost<T, D = any>() {
  const queryClient = useQueryClient()

  return useMutation<
    ApiResponse<T>,
    Error,
    {
      endpoint: string
      payload?: D
      contentType?: ContentType
      config?: AxiosRequestConfig
      invalidateQueries?: QueryKeyT[]
    }
  >({
    mutationFn: ({ endpoint, payload, contentType = "json", config }) =>
      apiPost<T, D>(endpoint, payload, contentType, config),
    onSuccess: (data, variables) => {
      // Invalidate relevant queries after successful mutation
      if (variables.invalidateQueries) {
        variables.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey })
        })
      }
    },
  })
}

// Hook for PUT requests
export function useApiPut<T, D = any>() {
  const queryClient = useQueryClient()

  return useMutation<
    ApiResponse<T>,
    Error,
    {
      endpoint: string
      payload?: D
      contentType?: ContentType
      config?: AxiosRequestConfig
      invalidateQueries?: QueryKeyT[]
    }
  >({
    mutationFn: ({ endpoint, payload, contentType = "json", config }) =>
      apiPut<T, D>(endpoint, payload, contentType, config),
    onSuccess: (data, variables) => {
      // Invalidate relevant queries after successful mutation
      if (variables.invalidateQueries) {
        variables.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey })
        })
      }
    },
  })
}

// Hook for PATCH requests
export function useApiPatch<T, D = any>() {
  const queryClient = useQueryClient()

  return useMutation<
    ApiResponse<T>,
    Error,
    {
      endpoint: string
      payload?: D
      contentType?: ContentType
      config?: AxiosRequestConfig
      invalidateQueries?: QueryKeyT[]
    }
  >({
    mutationFn: ({ endpoint, payload, contentType = "json", config }) =>
      apiPatch<T, D>(endpoint, payload, contentType, config),
    onSuccess: (data, variables) => {
      // Invalidate relevant queries after successful mutation
      if (variables.invalidateQueries) {
        variables.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey })
        })
      }
    },
  })
}

// Hook for DELETE requests
export function useApiDelete<T>() {
  const queryClient = useQueryClient()

  return useMutation<
    ApiResponse<T>,
    Error,
    {
      endpoint: string
      config?: AxiosRequestConfig
      invalidateQueries?: QueryKeyT[]
    }
  >({
    mutationFn: ({ endpoint, config }) => apiDelete<T>(endpoint, config),
    onSuccess: (data, variables) => {
      // Invalidate relevant queries after successful mutation
      if (variables.invalidateQueries) {
        variables.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey })
        })
      }
    },
  })
}

