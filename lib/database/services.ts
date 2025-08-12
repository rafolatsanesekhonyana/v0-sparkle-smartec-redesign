import { createServerClient, isSupabaseConfigured } from "../supabase/server"
import type { Service } from "../../types/booking"

export async function getAllServices(): Promise<Service[]> {
  try {
    if (!isSupabaseConfigured()) {
      console.warn("Supabase is not configured, returning empty services array")
      return []
    }

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("name", { ascending: true })

    if (error) {
      console.error("Database error fetching services:", error)
      return []
    }

    if (!data) {
      return []
    }

    return data.map((service) => ({
      id: service.id,
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
    }))
  } catch (error) {
    console.error("Unexpected error fetching services:", error)
    return []
  }
}

export async function createService(serviceData: {
  name: string
  description: string
  duration: number
  price: number
}): Promise<Service | null> {
  try {
    if (!isSupabaseConfigured()) {
      console.warn("Supabase is not configured, cannot create service")
      return null
    }

    const supabase = createServerClient()

    const { data, error } = await supabase.from("services").insert(serviceData).select().single()

    if (error) {
      console.error("Database error creating service:", error)
      return null
    }

    if (!data) {
      return null
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      duration: data.duration,
      price: data.price,
    }
  } catch (error) {
    console.error("Unexpected error creating service:", error)
    return null
  }
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
  try {
    if (!isSupabaseConfigured()) {
      console.warn("Supabase is not configured, cannot update service")
      return
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("services").update(serviceData).eq("id", serviceId)

    if (error) {
      console.error("Error updating service:", error)
      throw new Error("Failed to update service")
    }
  } catch (error) {
    console.error("Unexpected error updating service:", error)
    throw new Error("Failed to update service")
  }
}

export async function deleteService(serviceId: string): Promise<void> {
  try {
    if (!isSupabaseConfigured()) {
      console.warn("Supabase is not configured, cannot delete service")
      return
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("services").update({ is_active: false }).eq("id", serviceId)

    if (error) {
      console.error("Error deleting service:", error)
      throw new Error("Failed to delete service")
    }
  } catch (error) {
    console.error("Unexpected error deleting service:", error)
    throw new Error("Failed to delete service")
  }
}
