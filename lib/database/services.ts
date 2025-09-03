import type { Service } from "../../types/booking"

const fallbackServices: Service[] = [
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
  {
    id: "6",
    name: "French Manicure",
    description: "Classic French tip manicure",
    duration: 50,
    price: 30.0,
  },
  {
    id: "7",
    name: "Acrylic Extensions",
    description: "Full set of acrylic nail extensions",
    duration: 120,
    price: 60.0,
  },
  {
    id: "8",
    name: "Gel Extensions",
    description: "Natural-looking gel nail extensions",
    duration: 120,
    price: 65.0,
  },
]

export async function getAllServices(): Promise<Service[]> {
  console.log("Using fallback services - database tables need to be created")
  return fallbackServices
}

export async function createService(serviceData: {
  name: string
  description: string
  duration: number
  price: number
}): Promise<Service | null> {
  console.warn("Service creation disabled - database tables need to be created")
  return null
}

export async function updateService(
  serviceId: string,
  serviceData: {
    name: string
    description: string
    duration: number
    price: number
  },
): Promise<void> {
  console.warn("Service update disabled - database tables need to be created")
}

export async function deleteService(serviceId: string): Promise<void> {
  console.warn("Service deletion disabled - database tables need to be created")
}
