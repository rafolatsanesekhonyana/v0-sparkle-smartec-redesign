"use client"

import { useState, useCallback } from "react"
import { toast } from "@/hooks/use-toast"

interface ErrorState {
  error: Error | null
  isError: boolean
}

export function useErrorHandler() {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isError: false,
  })

  const handleError = useCallback((error: Error | string, showToast = true) => {
    const errorObj = typeof error === "string" ? new Error(error) : error

    console.error("Error handled:", errorObj)

    setErrorState({
      error: errorObj,
      isError: true,
    })

    if (showToast) {
      toast({
        title: "Error",
        description: errorObj.message || "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }, [])

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isError: false,
    })
  }, [])

  const retry = useCallback(
    (retryFn?: () => void | Promise<void>) => {
      clearError()
      if (retryFn) {
        try {
          const result = retryFn()
          if (result instanceof Promise) {
            result.catch(handleError)
          }
        } catch (error) {
          handleError(error as Error)
        }
      }
    },
    [clearError, handleError],
  )

  return {
    error: errorState.error,
    isError: errorState.isError,
    handleError,
    clearError,
    retry,
  }
}

// Network error detection
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true)

  useState(() => {
    if (typeof window === "undefined") return

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  })

  return isOnline
}
