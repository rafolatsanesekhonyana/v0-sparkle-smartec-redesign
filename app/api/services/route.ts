import { type NextRequest, NextResponse } from "next/server"
import { getAllServices, createService } from "@/lib/database/services"

export async function GET() {
  try {
    const services = await getAllServices()
    return NextResponse.json(services)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
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

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
