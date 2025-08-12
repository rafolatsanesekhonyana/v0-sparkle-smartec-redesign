"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, User, Phone, Mail, MessageSquare } from "lucide-react"
import type { BookingFormData } from "../types/booking"

interface ClientFormProps {
  formData: Partial<BookingFormData>
  onFormChange: (field: keyof BookingFormData, value: string) => void
  validationErrors?: Record<string, string>
}

export function ClientForm({ formData, onFormChange, validationErrors = {} }: ClientFormProps) {
  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    onFormChange(field, value)
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <header>
        <h2 className="text-xl sm:text-2xl font-semibold">Your Information</h2>
        <p className="text-muted-foreground mt-2">Please provide your contact details for the appointment</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
            <User className="h-5 w-5 text-primary" aria-hidden="true" />
            Contact Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <fieldset className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <legend className="sr-only">Personal information</legend>

            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" aria-hidden="true" />
                Full Name *
              </Label>
              <Input
                id="clientName"
                value={formData.clientName || ""}
                onChange={(e) => handleInputChange("clientName", e.target.value)}
                placeholder="Enter your full name"
                required
                autoComplete="name"
                className={`min-h-[44px] transition-colors ${validationErrors.clientName ? "border-red-500 focus:border-red-500" : ""}`}
                aria-describedby={validationErrors.clientName ? "clientName-error" : "clientName-help"}
                aria-invalid={!!validationErrors.clientName}
              />
              {validationErrors.clientName ? (
                <Alert variant="destructive" className="py-2" role="alert">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  <AlertDescription className="text-sm" id="clientName-error">
                    {validationErrors.clientName}
                  </AlertDescription>
                </Alert>
              ) : (
                <p className="text-xs text-muted-foreground" id="clientName-help">
                  Your full name as you'd like it to appear in our records
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientPhone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Phone Number *
              </Label>
              <Input
                id="clientPhone"
                type="tel"
                value={formData.clientPhone || ""}
                onChange={(e) => handleInputChange("clientPhone", e.target.value)}
                placeholder="+266 62 123 456"
                required
                autoComplete="tel"
                className={`min-h-[44px] transition-colors ${validationErrors.clientPhone ? "border-red-500 focus:border-red-500" : ""}`}
                aria-describedby={validationErrors.clientPhone ? "clientPhone-error" : "clientPhone-help"}
                aria-invalid={!!validationErrors.clientPhone}
              />
              {validationErrors.clientPhone ? (
                <Alert variant="destructive" className="py-2" role="alert">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
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
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="clientEmail" className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email Address *
            </Label>
            <Input
              id="clientEmail"
              type="email"
              value={formData.clientEmail || ""}
              onChange={(e) => handleInputChange("clientEmail", e.target.value)}
              placeholder="your.email@example.com"
              required
              autoComplete="email"
              className={`min-h-[44px] transition-colors ${validationErrors.clientEmail ? "border-red-500 focus:border-red-500" : ""}`}
              aria-describedby={validationErrors.clientEmail ? "clientEmail-error" : "clientEmail-help"}
              aria-invalid={!!validationErrors.clientEmail}
            />
            {validationErrors.clientEmail ? (
              <Alert variant="destructive" className="py-2" role="alert">
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                <AlertDescription className="text-sm" id="clientEmail-error">
                  {validationErrors.clientEmail}
                </AlertDescription>
              </Alert>
            ) : (
              <p className="text-xs text-muted-foreground" id="clientEmail-help">
                We'll send your appointment confirmation to this email
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Special Requests or Notes
              <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Textarea
              id="notes"
              value={formData.notes || ""}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any special requests, allergies, or preferences..."
              rows={4}
              className="min-h-[100px] resize-none transition-colors"
              aria-describedby="notes-help"
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground" id="notes-help">
                Let us know about any allergies, preferred nail shapes, or special requests
              </p>
              <span className="text-xs text-muted-foreground">{(formData.notes || "").length}/500</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
