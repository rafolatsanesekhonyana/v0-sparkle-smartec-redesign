"use client"

import { AlertTriangle, RefreshCw, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  variant?: "destructive" | "warning" | "default"
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  variant = "destructive",
}: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center p-8">
      <Alert variant={variant} className="max-w-md">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-2">{description}</AlertDescription>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm" className="mt-4 bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </Alert>
    </div>
  )
}

export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex items-center justify-center p-8">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <WifiOff className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle>Connection Error</CardTitle>
          <CardDescription>
            Unable to connect to our servers. Please check your internet connection and try again.
          </CardDescription>
        </CardHeader>
        {onRetry && (
          <CardContent>
            <Button onClick={onRetry} className="w-full">
              <Wifi className="h-4 w-4 mr-2" />
              Retry Connection
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
