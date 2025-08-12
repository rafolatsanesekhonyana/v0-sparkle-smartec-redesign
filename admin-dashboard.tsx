"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Bell, Download, CalendarIcon, TrendingUp, AlertTriangle } from "lucide-react"
import { AdminLogin } from "./components/admin/admin-login"
import { AdminStats } from "./components/admin/admin-stats"
import { BookingList } from "./components/admin/booking-list"
import { BookingFilters } from "./components/admin/booking-filters"
import { ServiceManagement } from "./components/admin/service-management"
import { AvailabilityManagement } from "./components/admin/availability-management"
import { AddAppointment } from "./components/admin/add-appointment"
import type { Booking, Service } from "./types/booking"
import type { AdminStats as AdminStatsType, BookingFilter } from "./types/admin"

interface AdminDashboardProps {
  onBackToBooking: () => void
  initialBookings?: Booking[]
  onBookingsUpdate?: (bookings: Booking[]) => void
  services?: Service[]
  onServicesUpdate?: (services: Service[]) => void
}

interface UnavailableSlot {
  id: string
  date: string
  time: string
  reason?: string
}

interface Notification {
  id: string
  type: "upcoming" | "overdue" | "cancelled" | "new"
  message: string
  timestamp: string
  bookingId?: string
}

export function AdminDashboard({
  onBackToBooking,
  initialBookings = [],
  onBookingsUpdate,
  services = [],
  onServicesUpdate,
}: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [unavailableSlots, setUnavailableSlots] = useState<UnavailableSlot[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [selectedBookings, setSelectedBookings] = useState<Set<string>>(new Set())
  const [isExporting, setIsExporting] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [isLoading, setIsLoading] = useState(false)

  // Load bookings from API when component mounts
  useEffect(() => {
    const loadBookings = async () => {
      if (isAuthenticated) {
        setIsLoading(true)
        try {
          const response = await fetch("/api/bookings")
          if (response.ok) {
            const data = await response.json()
            setBookings(data)
            if (onBookingsUpdate) {
              onBookingsUpdate(data)
            }
          }
        } catch (error) {
          console.error("Failed to load bookings:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadBookings()
  }, [isAuthenticated, onBookingsUpdate])

  // Update bookings when new ones are passed from booking system
  useEffect(() => {
    if (initialBookings.length === 0) return

    setBookings((prev) => {
      const existingIds = new Set(prev.map((b) => b.id))
      const newBookings = initialBookings.filter((b) => !existingIds.has(b.id))

      if (newBookings.length === 0) return prev

      const newNotifications: Notification[] = newBookings.map((booking) => ({
        id: `notif-${Date.now()}-${booking.id}`,
        type: "new",
        message: `New booking: ${booking.clientName} for ${booking.service.name}`,
        timestamp: new Date().toISOString(),
        bookingId: booking.id,
      }))

      setNotifications((prev) => [...newNotifications, ...prev].slice(0, 10))

      return [...prev, ...newBookings]
    })
  }, [initialBookings])

  const [filters, setFilters] = useState<BookingFilter>({
    status: "all",
  })

  const stats: AdminStatsType & {
    monthlyRevenue: number
    averageBookingValue: number
    completionRate: number
    popularService: string
    upcomingToday: number
  } = useMemo(() => {
    const today = new Date()
    const todayStr = today.toDateString()
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)

    const todayBookings = bookings.filter(
      (booking) => new Date(booking.date).toDateString() === todayStr && booking.status !== "cancelled",
    ).length

    const upcomingToday = bookings.filter((booking) => {
      const bookingDate = new Date(booking.date)
      const bookingTime = new Date(`${booking.date.split("T")[0]}T${booking.time}:00`)
      return bookingDate.toDateString() === todayStr && bookingTime > today && booking.status === "confirmed"
    }).length

    const weekBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.date)
      return bookingDate >= weekStart && booking.status !== "cancelled"
    }).length

    const monthlyBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.date)
      return bookingDate >= monthStart && booking.status !== "cancelled"
    })

    const confirmedBookings = bookings.filter((booking) => booking.status === "confirmed")
    const revenue = confirmedBookings.reduce((total, booking) => total + booking.service.price, 0)

    const monthlyRevenue = monthlyBookings
      .filter((booking) => booking.status === "confirmed")
      .reduce((total, booking) => total + booking.service.price, 0)

    const averageBookingValue = confirmedBookings.length > 0 ? revenue / confirmedBookings.length : 0

    const totalNonCancelled = bookings.filter((booking) => booking.status !== "cancelled").length
    const completionRate = totalNonCancelled > 0 ? (confirmedBookings.length / totalNonCancelled) * 100 : 0

    const serviceCounts = bookings.reduce(
      (acc, booking) => {
        if (booking.status !== "cancelled") {
          acc[booking.service.name] = (acc[booking.service.name] || 0) + 1
        }
        return acc
      },
      {} as Record<string, number>,
    )

    const popularService = Object.entries(serviceCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "None"

    return {
      totalBookings: totalNonCancelled,
      todayBookings,
      weekBookings,
      revenue,
      monthlyRevenue,
      averageBookingValue,
      completionRate,
      popularService,
      upcomingToday,
    }
  }, [bookings])

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      if (filters.date && new Date(booking.date).toDateString() !== new Date(filters.date).toDateString()) {
        return false
      }
      if (filters.status && filters.status !== "all" && booking.status !== filters.status) {
        return false
      }
      if (filters.service && booking.service.id !== filters.service) {
        return false
      }
      return true
    })
  }, [bookings, filters])

  // Updated to use API for booking updates
  const handleUpdateBooking = async (bookingId: string, status: Booking["status"]) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Failed to update booking")
      }

      setBookings((prev) => prev.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking)))

      const booking = bookings.find((b) => b.id === bookingId)
      if (booking) {
        const notification: Notification = {
          id: `notif-${Date.now()}-${bookingId}`,
          type: status === "cancelled" ? "cancelled" : "upcoming",
          message: `Booking ${status}: ${booking.clientName} - ${booking.service.name}`,
          timestamp: new Date().toISOString(),
          bookingId,
        }
        setNotifications((prev) => [notification, ...prev].slice(0, 10))
      }
    } catch (error) {
      console.error("Failed to update booking:", error)
    }
  }

  // Updated to use API for booking deletion
  const handleDeleteBooking = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete booking")
      }

      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId))
      setSelectedBookings((prev) => {
        const newSet = new Set(prev)
        newSet.delete(bookingId)
        return newSet
      })
    } catch (error) {
      console.error("Failed to delete booking:", error)
    }
  }

  const handleAddBooking = (booking: Booking) => {
    setBookings((prev) => [...prev, booking])
  }

  const handleBulkStatusUpdate = async (status: Booking["status"]) => {
    const updatePromises = Array.from(selectedBookings).map((bookingId) => handleUpdateBooking(bookingId, status))

    try {
      await Promise.all(updatePromises)
      setSelectedBookings(new Set())
    } catch (error) {
      console.error("Failed to update bookings:", error)
    }
  }

  const handleBulkDelete = async () => {
    const deletePromises = Array.from(selectedBookings).map((bookingId) => handleDeleteBooking(bookingId))

    try {
      await Promise.all(deletePromises)
      setSelectedBookings(new Set())
    } catch (error) {
      console.error("Failed to delete bookings:", error)
    }
  }

  const handleExportBookings = async () => {
    setIsExporting(true)

    try {
      const csvContent = [
        ["Date", "Time", "Client Name", "Email", "Phone", "Service", "Duration", "Price", "Status", "Notes"].join(","),
        ...filteredBookings.map((booking) =>
          [
            new Date(booking.date).toLocaleDateString(),
            booking.time,
            booking.clientName,
            booking.clientEmail,
            booking.clientPhone,
            booking.service.name,
            `${booking.service.duration} min`,
            `M${booking.service.price}`,
            booking.status,
            booking.notes || "",
          ]
            .map((field) => `"${field}"`)
            .join(","),
        ),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const resetFilters = () => {
    setFilters({ status: "all" })
  }

  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date()
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000)
      const newNotifications: Notification[] = []

      const upcomingBookings = bookings.filter((booking) => {
        const bookingDateTime = new Date(`${booking.date.split("T")[0]}T${booking.time}:00`)
        return bookingDateTime <= oneHourFromNow && bookingDateTime > now && booking.status === "confirmed"
      })

      upcomingBookings.forEach((booking) => {
        const existingNotif = notifications.find((n) => n.bookingId === booking.id && n.type === "upcoming")
        if (!existingNotif) {
          newNotifications.push({
            id: `upcoming-${booking.id}`,
            type: "upcoming",
            message: `Upcoming: ${booking.clientName} at ${booking.time} for ${booking.service.name}`,
            timestamp: new Date().toISOString(),
            bookingId: booking.id,
          })
        }
      })

      const overdueBookings = bookings.filter((booking) => {
        const bookingDateTime = new Date(`${booking.date.split("T")[0]}T${booking.time}:00`)
        const overdueTime = new Date(bookingDateTime.getTime() + 15 * 60 * 1000)
        return now > overdueTime && booking.status === "confirmed"
      })

      overdueBookings.forEach((booking) => {
        const existingNotif = notifications.find((n) => n.bookingId === booking.id && n.type === "overdue")
        if (!existingNotif) {
          newNotifications.push({
            id: `overdue-${booking.id}`,
            type: "overdue",
            message: `Overdue: ${booking.clientName} was scheduled at ${booking.time}`,
            timestamp: new Date().toISOString(),
            bookingId: booking.id,
          })
        }
      })

      if (newNotifications.length > 0) {
        setNotifications((prev) => [...newNotifications, ...prev].slice(0, 10))
      }
    }

    if (isAuthenticated) {
      checkNotifications()
      const interval = setInterval(checkNotifications, 60000)
      return () => clearInterval(interval)
    }
  }, [bookings, isAuthenticated, notifications])

  const dismissNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your appointments and business</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportBookings} disabled={isExporting}>
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? "Exporting..." : "Export Data"}
            </Button>
            {notifications.length > 0 && (
              <div className="relative">
                <Button variant="outline">
                  <Bell className="h-4 w-4 mr-2" />
                  Alerts
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
                    {notifications.length}
                  </Badge>
                </Button>
              </div>
            )}
            <Button variant="outline" onClick={onBackToBooking}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Booking
            </Button>
          </div>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="mb-6 space-y-2">
            {notifications.slice(0, 3).map((notification) => (
              <Alert
                key={notification.id}
                variant={notification.type === "overdue" ? "destructive" : "default"}
                className={
                  notification.type === "upcoming"
                    ? "border-orange-200 bg-orange-50"
                    : notification.type === "new"
                      ? "border-green-200 bg-green-50"
                      : notification.type === "cancelled"
                        ? "border-gray-200 bg-gray-50"
                        : ""
                }
              >
                {notification.type === "overdue" ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : notification.type === "upcoming" ? (
                  <Bell className="h-4 w-4" />
                ) : (
                  <TrendingUp className="h-4 w-4" />
                )}
                <AlertDescription className="flex items-center justify-between">
                  <span>{notification.message}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissNotification(notification.id)}
                    className="h-6 w-6 p-0"
                  >
                    ×
                  </Button>
                </AlertDescription>
              </Alert>
            ))}
            {notifications.length > 3 && (
              <p className="text-sm text-muted-foreground text-center">
                +{notifications.length - 3} more notifications
              </p>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="mb-6 sm:mb-8">
          <AdminStats stats={stats} />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="add-appointment">Add Booking</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <BookingFilters filters={filters} onFiltersChange={setFilters} onReset={resetFilters} />

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Appointments ({filteredBookings.length})</h2>
              {selectedBookings.size > 0 && (
                <div className="flex gap-2">
                  <Badge variant="outline">{selectedBookings.size} selected</Badge>
                  <Button size="sm" variant="outline" onClick={() => handleBulkStatusUpdate("confirmed")}>
                    Confirm Selected
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkStatusUpdate("cancelled")}>
                    Cancel Selected
                  </Button>
                  <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
                    Delete Selected
                  </Button>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <BookingList
                bookings={filteredBookings}
                onUpdateBooking={handleUpdateBooking}
                onDeleteBooking={handleDeleteBooking}
                selectedBookings={selectedBookings}
                onSelectionChange={setSelectedBookings}
              />
            )}
          </TabsContent>

          <TabsContent value="add-appointment" className="space-y-6">
            <AddAppointment services={services} onAddBooking={handleAddBooking} />
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <ServiceManagement services={services} onUpdateServices={onServicesUpdate || (() => {})} />
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <AvailabilityManagement
              unavailableSlots={unavailableSlots}
              onUpdateUnavailableSlots={setUnavailableSlots}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Business Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Monthly Revenue</span>
                      <span className="text-lg font-bold text-green-600">M{stats.monthlyRevenue}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Average Booking Value</span>
                      <span className="text-lg font-bold">M{stats.averageBookingValue.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Completion Rate</span>
                      <span className="text-lg font-bold text-blue-600">{stats.completionRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Most Popular Service</span>
                      <span className="text-sm font-bold">{stats.popularService}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Appointments</span>
                      <span className="text-lg font-bold">{stats.todayBookings}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Upcoming Today</span>
                      <span className="text-lg font-bold text-orange-600">{stats.upcomingToday}</span>
                    </div>
                    {stats.upcomingToday > 0 && (
                      <Alert>
                        <Bell className="h-4 w-4" />
                        <AlertDescription>
                          You have {stats.upcomingToday} appointment{stats.upcomingToday !== 1 ? "s" : ""} remaining
                          today
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
