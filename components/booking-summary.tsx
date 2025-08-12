"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, Mail, Phone } from "lucide-react"
import type { Service, BookingFormData } from "../types/booking"
import { formatDate, formatTime } from "../utils/booking-utils"

interface BookingSummaryProps {
  service: Service
  formData: Partial<BookingFormData>
  selectedDate: Date | undefined
}

export const BookingSummary = React.memo(function BookingSummary({
  service,
  formData,
  selectedDate,
}: BookingSummaryProps) {
  const formattedDate = React.useMemo(() => {
    return selectedDate ? formatDate(selectedDate.toISOString()) : null
  }, [selectedDate])

  const formattedTime = React.useMemo(() => {
    return formData.time ? formatTime(formData.time) : null
  }, [formData.time])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" id="booking-summary-title">
          Booking Summary
          <Badge variant="outline" aria-label="Review your booking details">
            Review
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4" aria-labelledby="booking-summary-title">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">{service.name}</span>
            <Badge variant="secondary" aria-label={`Price: M${service.price}`}>
              M{service.price}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span aria-label={`Duration: ${service.duration} minutes`}>{service.duration} minutes</span>
          </div>

          {selectedDate && formData.time && (
            <div className="space-y-2" role="group" aria-label="Appointment date and time">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span aria-label={`Date: ${formattedDate}`}>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span aria-label={`Time: ${formattedTime}`}>{formattedTime}</span>
              </div>
            </div>
          )}
        </div>

        <Separator aria-hidden="true" />

        <div className="space-y-2">
          <h4 className="font-medium" id="client-info-heading">
            Client Information
          </h4>
          <div role="group" aria-labelledby="client-info-heading">
            {formData.clientName && (
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" aria-hidden="true" />
                <span aria-label={`Name: ${formData.clientName}`}>{formData.clientName}</span>
              </div>
            )}
            {formData.clientEmail && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span aria-label={`Email: ${formData.clientEmail}`}>{formData.clientEmail}</span>
              </div>
            )}
            {formData.clientPhone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span aria-label={`Phone: ${formData.clientPhone}`}>{formData.clientPhone}</span>
              </div>
            )}
          </div>
        </div>

        {formData.notes && (
          <>
            <Separator aria-hidden="true" />
            <div className="space-y-2">
              <h4 className="font-medium" id="notes-heading">
                Notes
              </h4>
              <p className="text-sm text-muted-foreground" aria-labelledby="notes-heading">
                {formData.notes}
              </p>
            </div>
          </>
        )}

        <Separator aria-hidden="true" />

        <div className="flex items-center justify-between font-medium" role="group" aria-label="Total price">
          <span>Total</span>
          <div className="flex items-center gap-1" aria-label={`Total cost: M${service.price}`}>
            M{service.price}
          </div>
        </div>
      </CardContent>
    </Card>
  )
})
