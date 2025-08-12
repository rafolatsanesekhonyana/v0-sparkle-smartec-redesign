import type { TimeSlot, Booking } from "../types/booking"

interface UnavailableSlot {
  date: string
  time: string
}

export async function generateTimeSlots(date: string, existingBookings: Booking[] = []): Promise<TimeSlot[]> {
  const slots: TimeSlot[] = []
  const startHour = 9 // 9 AM
  const endHour = 18 // 6 PM
  const interval = 30 // 30 minutes
  const dateStr = new Date(date).toISOString().split("T")[0]

  // Get bookings for this specific date from existing bookings or database
  const dayBookings = existingBookings.filter((booking) => {
    const bookingDate = new Date(booking.date).toISOString().split("T")[0]
    return bookingDate === dateStr && booking.status !== "cancelled"
  })

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

      // Check if this slot is already booked
      const isBooked = dayBookings.some((booking) => booking.time === time)

      slots.push({
        time,
        available: !isBooked,
      })
    }
  }

  return slots
}

export function generateTimeSlotsSync(date: string, existingBookings: Booking[] = []): TimeSlot[] {
  const slots: TimeSlot[] = []
  const startHour = 9 // 9 AM
  const endHour = 18 // 6 PM
  const interval = 30 // 30 minutes
  const dateStr = new Date(date).toISOString().split("T")[0]

  // Get bookings for this specific date from existing bookings
  const dayBookings = existingBookings.filter((booking) => {
    const bookingDate = new Date(booking.date).toISOString().split("T")[0]
    return bookingDate === dateStr && booking.status !== "cancelled"
  })

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

      // Check if this slot is already booked
      const isBooked = dayBookings.some((booking) => booking.time === time)

      slots.push({
        time,
        available: !isBooked,
      })
    }
  }

  return slots
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatTime(time: string): string {
  const [hour, minute] = time.split(":")
  const hourNum = Number.parseInt(hour)
  const ampm = hourNum >= 12 ? "PM" : "AM"
  const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum
  return `${displayHour}:${minute} ${ampm}`
}
