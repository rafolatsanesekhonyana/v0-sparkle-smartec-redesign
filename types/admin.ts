export interface AdminStats {
  totalBookings: number
  todayBookings: number
  weekBookings: number
  revenue: number
}

export interface BookingFilter {
  date?: string
  status?: "all" | "confirmed" | "pending" | "cancelled"
  service?: string
}
