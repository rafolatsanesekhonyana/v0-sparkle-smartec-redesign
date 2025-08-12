import { type NextRequest, NextResponse } from "next/server"
import { getAllServices, createService } from "@/lib/database/services"

const fallbackServices = [
  {
    id: "1",
    name: "Classic Manicure",
    description: "Basic nail care with polish application",
    duration: 45,
    price: 25.0,
  },
  {
    id: "2",
    name: "Gel Manicure",
    description: "Long-lasting gel polish manicure",
    duration: 60,
    price: 35.0,
  },
  {
    id: "3",
    name: "Classic Pedicure",
    description: "Relaxing foot care with polish",
    duration: 60,
    price: 30.0,
  },
  {
    id: "4",
    name: "Gel Pedicure",
    description: "Long-lasting gel polish pedicure",
    duration: 75,
    price: 40.0,
  },
  {
    id: "5",
    name: "Nail Art",
    description: "Custom nail art design",
    duration: 90,
    price: 50.0,
  },
]

export async function GET() {
  try {
    const services = await getAllServices()

    if (!services || services.length === 0) {
      console.log("Database returned no services, using fallback data")
      return NextResponse.json(fallbackServices)
    }

    return NextResponse.json(services)
  } catch (error) {
    console.error("API Error:", error)
    console.log("Database error, returning fallback services")
    return NextResponse.json(fallbackServices)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, duration, price } = body

    if (!name || !description || !duration || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const service = await createService({
      name,
      description,
      duration,
      price,
    })

    if (!service) {
      return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
    }

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
