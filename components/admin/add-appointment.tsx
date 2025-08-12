"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import type { Service, Booking } from "../../types/booking"
import { formatTime } from "../../utils/booking-utils"

interface AddAppointmentProps {
  services: Service[]
  onAddBooking: (booking: Booking) => void
}

export function AddAppointment({ services, onAddBooking }: AddAppointmentProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      serviceId: "",
      time: "",
      notes: "",
    },
  ])

  const timeSlots = []
  for (let hour = 9; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      timeSlots.push(time)
    }
  }

  const validateLesothoPhone = (phone: string) => {
    const cleanPhone = phone.replace(/\s+/g, "")
    if (!cleanPhone.startsWith("+266")) return false

    const numberPart = cleanPhone.slice(4)
    if (numberPart.length !== 8) return false

    const validPrefixes = ["62", "63", "64", "69", "68", "51", "53", "56", "57", "58", "59"]
    return validPrefixes.some((prefix) => numberPart.startsWith(prefix))
  }

  const addAppointment = () => {
    if (appointments.length < 4) {
      setAppointments([
        ...appointments,
        {
          id: appointments.length + 1,
          clientName: "",
          clientEmail: "",
          clientPhone: "",
          serviceId: "",
          time: "",
          notes: "",
        },
      ])
    }
  }

  const removeAppointment = (id: number) => {
    if (appointments.length > 1) {
      setAppointments(appointments.filter((apt) => apt.id !== id))
    }
  }

  const updateAppointment = (id: number, field: string, value: string) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, [field]: value } : apt)))
  }

  const handleSubmit = () => {
    if (!selectedDate) return

    const validAppointments = appointments.filter(
      (apt) =>
        apt.clientName &&
        apt.clientEmail &&
        apt.clientPhone &&
        apt.serviceId &&
        apt.time &&
        validateLesothoPhone(apt.clientPhone),
    )

    validAppointments.forEach((apt) => {
      const service = services.find((s) => s.id === apt.serviceId)
      if (service) {
        const booking: Booking = {
          id: `admin-booking-${Date.now()}-${apt.id}`,
          clientName: apt.clientName,
          clientEmail: apt.clientEmail,
          clientPhone: apt.clientPhone,
          service,
          date: selectedDate.toISOString(),
          time: apt.time,
          status: "confirmed",
          notes: apt.notes,
          createdAt: new Date().toISOString(),
        }
        onAddBooking(booking)
      }
    })

    // Reset form
    setSelectedDate(undefined)
    setAppointments([
      {
        id: 1,
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        serviceId: "",
        time: "",
        notes: "",
      },
    ])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Add Appointments</h2>
        <Badge variant="outline">{appointments.length}/4 appointments</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {selectedDate && (
        <div className="space-y-4">
          {appointments.map((apt, index) => (
            <Card key={apt.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Appointment {index + 1}</span>
                  {appointments.length > 1 && (
                    <Button variant="outline" size="sm" onClick={() => removeAppointment(apt.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Client Name</Label>
                    <Input
                      value={apt.clientName}
                      onChange={(e) => updateAppointment(apt.id, "clientName", e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      value={apt.clientPhone}
                      onChange={(e) => updateAppointment(apt.id, "clientPhone", e.target.value)}
                      placeholder="+266 62 123 456"
                    />
                    {apt.clientPhone && !validateLesothoPhone(apt.clientPhone) && (
                      <p className="text-xs text-red-500">
                        Invalid format. Use +266 followed by 8 digits starting with 62,63,64,69,68,51,53,56,57,58,59
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={apt.clientEmail}
                    onChange={(e) => updateAppointment(apt.id, "clientEmail", e.target.value)}
                    placeholder="client@example.com"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Service</Label>
                    <Select
                      value={apt.serviceId}
                      onValueChange={(value) => updateAppointment(apt.id, "serviceId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - M{service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Select value={apt.time} onValueChange={(value) => updateAppointment(apt.id, "time", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {formatTime(time)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notes (Optional)</Label>
                  <Textarea
                    value={apt.notes}
                    onChange={(e) => updateAppointment(apt.id, "notes", e.target.value)}
                    placeholder="Special requests or notes..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex gap-4">
            {appointments.length < 4 && (
              <Button variant="outline" onClick={addAppointment}>
                <Plus className="h-4 w-4 mr-2" />
                Add Another Appointment
              </Button>
            )}
            <Button onClick={handleSubmit} className="flex-1">
              Create{" "}
              {
                appointments.filter(
                  (apt) => apt.clientName && apt.clientEmail && apt.clientPhone && apt.serviceId && apt.time,
                ).length
              }{" "}
              Appointment(s)
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
