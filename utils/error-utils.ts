export interface ApiError {
  message: string
  code?: string
  status?: number
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message)
    this.name = "NetworkError"
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message)
    this.name = "ValidationError"
  }
}

export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`

    try {
      const errorData = await response.json()
      errorMessage = errorData.error || errorData.message || errorMessage
    } catch {
      // If we can't parse the error response, use the default message
    }

    throw new NetworkError(errorMessage, response.status)
  }

  try {
    return await response.json()
  } catch (error) {
    throw new Error("Invalid JSON response from server")
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof NetworkError) {
    if (error.status === 404) return "The requested resource was not found"
    if (error.status === 500) return "Server error. Please try again later"
    if (error.status === 403) return "You don't have permission to perform this action"
    return error.message
  }

  if (error instanceof ValidationError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return "An unexpected error occurred"
}

export async function retryOperation<T>(operation: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt === maxRetries) {
        throw lastError
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay * attempt))
    }
  }

  throw lastError!
}
