import { type NextRequest, NextResponse } from "next/server"
import { getAllBookings, createBooking } from "@/lib/database/bookings"

export async function GET() {
  try {
    const bookings = await getAllBookings()
    return NextResponse.json(bookings)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch bookings", bookings: [] }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clientName, clientEmail, clientPhone, serviceId, date, time, notes } = body

    if (!clientName || !clientEmail || !clientPhone || !serviceId || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const booking = await createBooking({
      clientName,
      clientEmail,
      clientPhone,
      serviceId,
      date,
      time,
      notes,
    })

    if (!booking) {
      return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
    }

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
