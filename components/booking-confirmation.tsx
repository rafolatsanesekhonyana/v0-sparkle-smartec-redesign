"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, Clock, MapPin } from "lucide-react"
import type { Booking } from "../types/booking"
import { formatDate, formatTime } from "../utils/booking-utils"

interface BookingConfirmationProps {
  booking: Booking
  onNewBooking: () => void
}

export function BookingConfirmation({ booking, onNewBooking }: BookingConfirmationProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <h2 className="text-3xl font-bold text-green-700">Booking Confirmed!</h2>
        <p className="text-muted-foreground">
          Your appointment has been successfully scheduled. You'll receive a confirmation email shortly.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Appointment Details
            <Badge variant="outline" className="text-green-600 border-green-600">
              Confirmed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Service</h4>
                <p className="text-sm text-muted-foreground">{booking.service.name}</p>
              </div>

              <div>
                <h4 className="font-medium">Client</h4>
                <p className="text-sm text-muted-foreground">{booking.clientName}</p>
              </div>

              <div>
                <h4 className="font-medium">Contact</h4>
                <p className="text-sm text-muted-foreground">{booking.clientEmail}</p>
                <p className="text-sm text-muted-foreground">{booking.clientPhone}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{formatDate(booking.date)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {formatTime(booking.time)} ({booking.service.duration} min)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Brights' Nails Studio</span>
              </div>
            </div>
          </div>

          {booking.notes && (
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Notes</h4>
              <p className="text-sm text-muted-foreground">{booking.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">Need to make changes? Please call us at +266 123-4567</p>
        <Button onClick={onNewBooking} variant="outline">
          Book Another Appointment
        </Button>
      </div>
    </div>
  )
}
