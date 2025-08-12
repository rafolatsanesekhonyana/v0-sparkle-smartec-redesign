export interface Service {
  id: string
  name: string
  duration: number // in minutes
  price: number
  description: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface Booking {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  service: Service
  date: string
  time: string
  status: "confirmed" | "pending" | "cancelled"
  notes?: string
  createdAt: string
}

export interface BookingFormData {
  clientName: string
  clientEmail: string
  clientPhone: string
  serviceId: string
  date: string
  time: string
  notes?: string
}
