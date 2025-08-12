"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { BookingFormData } from "../types/booking"

interface ClientFormProps {
  formData: Partial<BookingFormData>
  onFormChange: (field: keyof BookingFormData, value: string) => void
  validationErrors?: Record<string, string>
}

export function ClientForm({ formData, onFormChange, validationErrors = {} }: ClientFormProps) {
  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-semibold">Your Information</h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-sm font-medium">
                Full Name *
              </Label>
              <Input
                id="clientName"
                value={formData.clientName || ""}
                onChange={(e) => onFormChange("clientName", e.target.value)}
                placeholder="Enter your full name"
                required
                className={`min-h-[44px] ${validationErrors.clientName ? "border-red-500" : ""}`}
                aria-describedby={validationErrors.clientName ? "clientName-error" : undefined}
              />
              {validationErrors.clientName && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm" id="clientName-error">
                    {validationErrors.clientName}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientPhone" className="text-sm font-medium">
                Phone Number *
              </Label>
              <Input
                id="clientPhone"
                type="tel"
                value={formData.clientPhone || ""}
                onChange={(e) => onFormChange("clientPhone", e.target.value)}
                placeholder="+266 62 123 456"
                required
                className={`min-h-[44px] ${validationErrors.clientPhone ? "border-red-500" : ""}`}
                aria-describedby={validationErrors.clientPhone ? "clientPhone-error" : "clientPhone-help"}
              />
              {validationErrors.clientPhone ? (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm" id="clientPhone-error">
                    {validationErrors.clientPhone}
                  </AlertDescription>
                </Alert>
              ) : (
                <p className="text-xs text-muted-foreground" id="clientPhone-help">
                  Format: +266 followed by 8 digits (62, 63, 64, 69, 68, 51, 53, 56, 57, 58, 59)
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientEmail" className="text-sm font-medium">
              Email Address *
            </Label>
            <Input
              id="clientEmail"
              type="email"
              value={formData.clientEmail || ""}
              onChange={(e) => onFormChange("clientEmail", e.target.value)}
              placeholder="your.email@example.com"
              required
              className={`min-h-[44px] ${validationErrors.clientEmail ? "border-red-500" : ""}`}
              aria-describedby={validationErrors.clientEmail ? "clientEmail-error" : undefined}
            />
            {validationErrors.clientEmail && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm" id="clientEmail-error">
                  {validationErrors.clientEmail}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Special Requests or Notes
            </Label>
            <Textarea
              id="notes"
              value={formData.notes || ""}
              onChange={(e) => onFormChange("notes", e.target.value)}
              placeholder="Any special requests, allergies, or preferences..."
              rows={4}
              className="min-h-[100px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Let us know about any allergies, preferred nail shapes, or special requests
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
