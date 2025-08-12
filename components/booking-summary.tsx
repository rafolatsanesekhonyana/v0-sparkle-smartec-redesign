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

export function BookingSummary({ service, formData, selectedDate }: BookingSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Booking Summary
          <Badge variant="outline">Review</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">{service.name}</span>
            <Badge variant="secondary">M{service.price}</Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {service.duration} minutes
          </div>

          {selectedDate && formData.time && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                {formatDate(selectedDate.toISOString())}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                {formatTime(formData.time)}
              </div>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="font-medium">Client Information</h4>
          {formData.clientName && (
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              {formData.clientName}
            </div>
          )}
          {formData.clientEmail && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4" />
              {formData.clientEmail}
            </div>
          )}
          {formData.clientPhone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" />
              {formData.clientPhone}
            </div>
          )}
        </div>

        {formData.notes && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium">Notes</h4>
              <p className="text-sm text-muted-foreground">{formData.notes}</p>
            </div>
          </>
        )}

        <Separator />

        <div className="flex items-center justify-between font-medium">
          <span>Total</span>
          <div className="flex items-center gap-1">M{service.price}</div>
        </div>
      </CardContent>
    </Card>
  )
}
