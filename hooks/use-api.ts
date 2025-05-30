"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { ApiError } from "@/lib/api"

export function useApi<T>(apiCall: () => Promise<T>, dependencies: React.DependencyList = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiCall()
      setData(result)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(`API Error (${err.status}): ${err.message}`)
      } else {
        setError(err instanceof Error ? err.message : "Unknown error")
      }
    } finally {
      setLoading(false)
    }
  }, dependencies)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch }
}

export function useApiMutation<T, P>(apiCall: (params: P) => Promise<T>) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = useCallback(
    async (params: P): Promise<T | null> => {
      try {
        setLoading(true)
        setError(null)
        const result = await apiCall(params)
        return result
      } catch (err) {
        if (err instanceof ApiError) {
          setError(`API Error (${err.status}): ${err.message}`)
        } else {
          setError(err instanceof Error ? err.message : "Unknown error")
        }
        return null
      } finally {
        setLoading(false)
      }
    },
    [apiCall],
  )

  return { mutate, loading, error }
}
