"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, User, Phone, Mail, MoreHorizontal, ExternalLink } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Booking } from "../../types/booking"
import { formatDate, formatTime } from "../../utils/booking-utils"

interface BookingListProps {
  bookings: Booking[]
  onUpdateBooking: (bookingId: string, status: Booking["status"]) => void
  onDeleteBooking: (bookingId: string) => void
  selectedBookings?: Set<string>
  onSelectionChange?: (selected: Set<string>) => void
}

export function BookingList({
  bookings,
  onUpdateBooking,
  onDeleteBooking,
  selectedBookings = new Set(),
  onSelectionChange,
}: BookingListProps) {
  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleSelectBooking = (bookingId: string, checked: boolean) => {
    if (!onSelectionChange) return

    const newSelected = new Set(selectedBookings)
    if (checked) {
      newSelected.add(bookingId)
    } else {
      newSelected.delete(bookingId)
    }
    onSelectionChange(newSelected)
  }

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return

    if (checked) {
      onSelectionChange(new Set(bookings.map((b) => b.id)))
    } else {
      onSelectionChange(new Set())
    }
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">No appointments found</h3>
            <p className="text-sm text-muted-foreground">Appointments will appear here when clients book.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {onSelectionChange && (
        <Card className="bg-gray-50">
          <CardContent className="py-3">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={selectedBookings.size === bookings.length && bookings.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm font-medium">
                Select All ({selectedBookings.size} of {bookings.length} selected)
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {bookings.map((booking) => (
        <Card key={booking.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                {onSelectionChange && (
                  <Checkbox
                    checked={selectedBookings.has(booking.id)}
                    onCheckedChange={(checked) => handleSelectBooking(booking.id, checked as boolean)}
                    className="mt-1"
                  />
                )}

                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="font-semibold text-lg">{booking.service.name}</h3>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                    <Badge variant="outline">M{booking.service.price}</Badge>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(booking.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {formatTime(booking.time)} ({booking.service.duration}min)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.clientName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${booking.clientPhone}`}
                        className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
                      >
                        {booking.clientPhone}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${booking.clientEmail}`}
                      className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      {booking.clientEmail}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  {booking.notes && (
                    <div className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-md">
                      <strong>Notes:</strong> {booking.notes}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {booking.status !== "confirmed" && (
                      <DropdownMenuItem onClick={() => onUpdateBooking(booking.id, "confirmed")}>
                        Confirm Booking
                      </DropdownMenuItem>
                    )}
                    {booking.status === "pending" && (
                      <DropdownMenuItem onClick={() => onUpdateBooking(booking.id, "cancelled")}>
                        Cancel Booking
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => window.open(`tel:${booking.clientPhone}`)}>
                      Call Client
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(`mailto:${booking.clientEmail}`)}>
                      Email Client
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        window.open(
                          `sms:${booking.clientPhone}?body=Hi ${booking.clientName}, this is a reminder about your ${booking.service.name} appointment on ${formatDate(booking.date)} at ${formatTime(booking.time)}.`,
                        )
                      }
                    >
                      Send SMS Reminder
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDeleteBooking(booking.id)} className="text-red-600">
                      Delete Appointment
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
