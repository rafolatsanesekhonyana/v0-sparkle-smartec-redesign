"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, Info } from "lucide-react"
import { generateTimeSlotsSync, formatTime } from "../utils/booking-utils"
import { useDebounce } from "../utils/performance-utils"
import type { TimeSlot, Booking } from "../types/booking"

interface DateTimePickerProps {
  selectedDate: Date | undefined
  selectedTime: string
  onDateSelect: (date: Date | undefined) => void
  onTimeSelect: (time: string) => void
  existingBookings?: Booking[]
}

export const DateTimePicker = React.memo(function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  existingBookings = [],
}: DateTimePickerProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)

  const debouncedSelectedDate = useDebounce(selectedDate, 150)

  const isDateDisabled = useCallback((date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today || date.getDay() === 0 // Disable past dates and Sundays
  }, [])

  const bookedDates = useMemo(() => {
    return existingBookings.reduce((acc, booking) => {
      const dateStr = booking.date.split("T")[0]
      acc.add(dateStr)
      return acc
    }, new Set<string>())
  }, [existingBookings])

  const handleDateSelect = useCallback(
    async (date: Date | undefined) => {
      onDateSelect(date)
      onTimeSelect("") // Clear selected time when date changes

      if (date) {
        setIsLoadingSlots(true)
        // Using synchronous function with existing bookings for better performance
        await new Promise((resolve) => setTimeout(resolve, 300)) // Small delay for UX
        const slots = generateTimeSlotsSync(date.toISOString(), existingBookings)
        setTimeSlots(slots)
        setIsLoadingSlots(false)
      } else {
        setTimeSlots([])
      }
    },
    [onDateSelect, onTimeSelect, existingBookings],
  )

  useEffect(() => {
    if (debouncedSelectedDate) {
      const slots = generateTimeSlotsSync(debouncedSelectedDate.toISOString(), existingBookings)
      setTimeSlots(slots)
    }
  }, [existingBookings, debouncedSelectedDate])

  const { availableSlots, bookedSlots } = useMemo(() => {
    const available = timeSlots.filter((slot) => slot.available)
    const booked = timeSlots.filter((slot) => !slot.available)
    return { availableSlots: available, bookedSlots: booked }
  }, [timeSlots])

  const handleTimeSelect = useCallback(
    (time: string) => {
      onTimeSelect(time)
    },
    [onTimeSelect],
  )

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-semibold" id="datetime-picker-heading">
        Select Date & Time
      </h2>

      <Alert role="note">
        <Info className="h-4 w-4" aria-hidden="true" />
        <AlertDescription>We're open Monday-Saturday, 9:00 AM - 6:00 PM. Sundays are closed for rest.</AlertDescription>
      </Alert>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl" id="date-selection-title">
              Choose Date
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={isDateDisabled}
              className="rounded-md border w-full max-w-sm"
              modifiers={{
                booked: (date) => {
                  const dateStr = date.toISOString().split("T")[0]
                  return bookedDates.has(dateStr)
                },
              }}
              modifiersStyles={{
                booked: {
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  color: "rgb(239, 68, 68)",
                },
              }}
              aria-labelledby="date-selection-title"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl flex items-center justify-between" id="time-selection-title">
              Available Times
              {selectedDate && (
                <Badge
                  variant="outline"
                  className="text-xs"
                  aria-label={`${availableSlots.length} time slots available`}
                >
                  {availableSlots.length} available
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-4">
                {isLoadingSlots ? (
                  <div className="flex items-center justify-center py-8" role="status" aria-live="polite">
                    <div
                      className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
                      aria-hidden="true"
                    ></div>
                    <span className="sr-only">Loading available time slots...</span>
                  </div>
                ) : timeSlots.length > 0 ? (
                  <>
                    <div
                      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 max-h-80 overflow-y-auto"
                      role="radiogroup"
                      aria-labelledby="time-selection-title"
                    >
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          variant={selectedTime === slot.time ? "default" : "outline"}
                          size="sm"
                          disabled={!slot.available}
                          onClick={() => handleTimeSelect(slot.time)}
                          className="justify-center min-h-[44px] text-xs sm:text-sm"
                          role="radio"
                          aria-checked={selectedTime === slot.time}
                          aria-describedby={!slot.available ? `${slot.time}-booked` : undefined}
                        >
                          <div className="flex flex-col items-center">
                            <span>{formatTime(slot.time)}</span>
                            {!slot.available && (
                              <Badge
                                variant="secondary"
                                className="text-xs mt-1"
                                id={`${slot.time}-booked`}
                                aria-label="This time slot is already booked"
                              >
                                Booked
                              </Badge>
                            )}
                          </div>
                        </Button>
                      ))}
                    </div>

                    {bookedSlots.length > 0 && (
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground flex items-center gap-1" role="status">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {bookedSlots.length} time slot{bookedSlots.length !== 1 ? "s" : ""} already booked
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <Alert role="alert">
                    <Info className="h-4 w-4" aria-hidden="true" />
                    <AlertDescription>
                      No available time slots for this date. Please choose another date.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8" role="status">
                Please select a date first
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
})
