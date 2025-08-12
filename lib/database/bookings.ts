import { createServerClient } from "../supabase/server"
import type { Booking } from "../../types/booking"

export interface DatabaseBooking {
  id: string
  client_name: string
  client_email: string
  client_phone: string
  service_id: string
  booking_date: string
  booking_time: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  notes?: string
  created_at: string
  updated_at: string
  services: {
    id: string
    name: string
    description: string
    duration: number
    price: number
  }
}

export async function getAllBookings(): Promise<Booking[]> {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        services (
          id,
          name,
          description,
          duration,
          price
        )
      `)
      .order("booking_date", { ascending: true })
      .order("booking_time", { ascending: true })

    if (error) {
      console.error("Database error fetching bookings:", error)
      return []
    }

    if (!data) {
      return []
    }

    return (data as DatabaseBooking[]).map(transformDatabaseBooking)
  } catch (error) {
    console.error("Unexpected error fetching bookings:", error)
    return []
  }
}

export async function getBookingsByDateRange(startDate: string, endDate: string): Promise<Booking[]> {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        services (
          id,
          name,
          description,
          duration,
          price
        )
      `)
      .gte("booking_date", startDate)
      .lte("booking_date", endDate)
      .order("booking_date", { ascending: true })
      .order("booking_time", { ascending: true })

    if (error) {
      console.error("Database error fetching bookings by date range:", error)
      return []
    }

    if (!data) {
      return []
    }

    return (data as DatabaseBooking[]).map(transformDatabaseBooking)
  } catch (error) {
    console.error("Unexpected error fetching bookings by date range:", error)
    return []
  }
}

export async function createBooking(bookingData: {
  clientName: string
  clientEmail: string
  clientPhone: string
  serviceId: string
  date: string
  time: string
  notes?: string
}): Promise<Booking | null> {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        client_name: bookingData.clientName,
        client_email: bookingData.clientEmail,
        client_phone: bookingData.clientPhone,
        service_id: bookingData.serviceId,
        booking_date: bookingData.date.split("T")[0],
        booking_time: bookingData.time,
        notes: bookingData.notes,
        status: "confirmed",
      })
      .select(`
        *,
        services (
          id,
          name,
          description,
          duration,
          price
        )
      `)
      .single()

    if (error) {
      console.error("Database error creating booking:", error)
      return null
    }

    if (!data) {
      return null
    }

    return transformDatabaseBooking(data as DatabaseBooking)
  } catch (error) {
    console.error("Unexpected error creating booking:", error)
    return null
  }
}

export async function updateBookingStatus(bookingId: string, status: Booking["status"]): Promise<void> {
  const supabase = createServerClient()

  const { error } = await supabase.from("bookings").update({ status }).eq("id", bookingId)

  if (error) {
    console.error("Error updating booking status:", error)
    throw new Error("Failed to update booking status")
  }
}

export async function deleteBooking(bookingId: string): Promise<void> {
  const supabase = createServerClient()

  const { error } = await supabase.from("bookings").delete().eq("id", bookingId)

  if (error) {
    console.error("Error deleting booking:", error)
    throw new Error("Failed to delete booking")
  }
}

export async function getBookingsForDate(date: string): Promise<Booking[]> {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        services (
          id,
          name,
          description,
          duration,
          price
        )
      `)
      .eq("booking_date", date.split("T")[0])
      .neq("status", "cancelled")
      .order("booking_time", { ascending: true })

    if (error) {
      console.error("Database error fetching bookings for date:", error)
      return []
    }

    if (!data) {
      return []
    }

    return (data as DatabaseBooking[]).map(transformDatabaseBooking)
  } catch (error) {
    console.error("Unexpected error fetching bookings for date:", error)
    return []
  }
}

function transformDatabaseBooking(dbBooking: DatabaseBooking): Booking {
  return {
    id: dbBooking.id,
    clientName: dbBooking.client_name,
    clientEmail: dbBooking.client_email,
    clientPhone: dbBooking.client_phone,
    service: {
      id: dbBooking.services.id,
      name: dbBooking.services.name,
      description: dbBooking.services.description,
      duration: dbBooking.services.duration,
      price: dbBooking.services.price,
    },
    date: `${dbBooking.booking_date}T00:00:00.000Z`,
    time: dbBooking.booking_time,
    status: dbBooking.status,
    notes: dbBooking.notes,
    createdAt: dbBooking.created_at,
  }
}
