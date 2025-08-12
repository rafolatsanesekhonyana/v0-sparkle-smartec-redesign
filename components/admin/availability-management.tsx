"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Clock, X, CalendarX, CheckSquare, Square } from "lucide-react"
import { formatTime } from "../../utils/booking-utils"

interface UnavailableSlot {
  id: string
  date: string
  time: string
  reason?: string
}

interface AvailabilityManagementProps {
  unavailableSlots: UnavailableSlot[]
  onUpdateUnavailableSlots: (slots: UnavailableSlot[]) => void
}

export function AvailabilityManagement({ unavailableSlots, onUpdateUnavailableSlots }: AvailabilityManagementProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])
  const [reason, setReason] = useState("")
  const [selectAll, setSelectAll] = useState(false)

  const timeSlots = []
  for (let hour = 9; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      timeSlots.push(time)
    }
  }

  const handleTimeToggle = (time: string) => {
    setSelectedTimes((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]))
  }

  const handleSelectAll = () => {
    if (!selectedDate) return

    const dateStr = selectedDate.toISOString().split("T")[0]
    const availableTimes = timeSlots.filter(
      (time) => !unavailableSlots.some((slot) => slot.date === dateStr && slot.time === time),
    )

    if (selectAll) {
      setSelectedTimes([])
      setSelectAll(false)
    } else {
      setSelectedTimes(availableTimes)
      setSelectAll(true)
    }
  }

  const handleBlockTimes = () => {
    if (!selectedDate || selectedTimes.length === 0) return

    const dateStr = selectedDate.toISOString().split("T")[0]
    const newSlots: UnavailableSlot[] = selectedTimes.map((time) => ({
      id: `unavailable-${Date.now()}-${time}`,
      date: dateStr,
      time,
      reason: reason || "Blocked by admin",
    }))

    onUpdateUnavailableSlots([...unavailableSlots, ...newSlots])
    setSelectedTimes([])
    setReason("")
    setSelectAll(false)
  }

  const handleBlockEntireDay = () => {
    if (!selectedDate) return

    const dateStr = selectedDate.toISOString().split("T")[0]
    const newSlots: UnavailableSlot[] = timeSlots.map((time) => ({
      id: `unavailable-${Date.now()}-${time}`,
      date: dateStr,
      time,
      reason: reason || "Day blocked by admin",
    }))

    // Remove existing slots for this date and add new ones
    const filteredSlots = unavailableSlots.filter((slot) => slot.date !== dateStr)
    onUpdateUnavailableSlots([...filteredSlots, ...newSlots])
    setSelectedTimes([])
    setReason("")
    setSelectAll(false)
  }

  const handleUnblockTime = (slotId: string) => {
    const updatedSlots = unavailableSlots.filter((slot) => slot.id !== slotId)
    onUpdateUnavailableSlots(updatedSlots)
  }

  const handleUnblockDay = (date: string) => {
    const updatedSlots = unavailableSlots.filter((slot) => slot.date !== date)
    onUpdateUnavailableSlots(updatedSlots)
  }

  const getUnavailableSlotsForDate = (date: string) => {
    return unavailableSlots.filter((slot) => slot.date === date)
  }

  const getBlockedDates = () => {
    const dateGroups: { [key: string]: UnavailableSlot[] } = {}
    unavailableSlots.forEach((slot) => {
      if (!dateGroups[slot.date]) {
        dateGroups[slot.date] = []
      }
      dateGroups[slot.date].push(slot)
    })

    return Object.entries(dateGroups).map(([date, slots]) => ({
      date,
      slots,
      isFullDay: slots.length === timeSlots.length,
    }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Manage Availability</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Block Time Slots</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>

            {selectedDate && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Select Time Slots</Label>
                    <Button variant="outline" size="sm" onClick={handleSelectAll}>
                      {selectAll ? (
                        <>
                          <Square className="h-4 w-4 mr-2" />
                          Deselect All
                        </>
                      ) : (
                        <>
                          <CheckSquare className="h-4 w-4 mr-2" />
                          Select All
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto border rounded-md p-3">
                    {timeSlots.map((time) => {
                      const dateStr = selectedDate.toISOString().split("T")[0]
                      const isBlocked = unavailableSlots.some((slot) => slot.date === dateStr && slot.time === time)
                      const isSelected = selectedTimes.includes(time)

                      return (
                        <div key={time} className="flex items-center space-x-2">
                          <Checkbox
                            id={`time-${time}`}
                            checked={isSelected}
                            disabled={isBlocked}
                            onCheckedChange={() => handleTimeToggle(time)}
                          />
                          <Label
                            htmlFor={`time-${time}`}
                            className={`text-sm cursor-pointer ${
                              isBlocked ? "text-muted-foreground line-through" : ""
                            }`}
                          >
                            {formatTime(time)}
                          </Label>
                        </div>
                      )
                    })}
                  </div>

                  <div className="text-sm text-muted-foreground">{selectedTimes.length} time slot(s) selected</div>
                </div>

                <div className="space-y-2">
                  <Label>Reason (Optional)</Label>
                  <Input
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g., Personal appointment, Holiday, Maintenance"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleBlockTimes} disabled={selectedTimes.length === 0} className="flex-1">
                    Block Selected Times ({selectedTimes.length})
                  </Button>
                  <Button variant="outline" onClick={handleBlockEntireDay} className="flex-1 bg-transparent">
                    <CalendarX className="h-4 w-4 mr-2" />
                    Block Entire Day
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blocked Time Slots</CardTitle>
          </CardHeader>
          <CardContent>
            {unavailableSlots.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No blocked time slots</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {getBlockedDates()
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map(({ date, slots, isFullDay }) => (
                    <div key={date} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{new Date(date).toLocaleDateString()}</h4>
                          {isFullDay && <Badge variant="destructive">Full Day Blocked</Badge>}
                        </div>
                        <div className="flex gap-2">
                          {isFullDay && (
                            <Button variant="outline" size="sm" onClick={() => handleUnblockDay(date)}>
                              Unblock Day
                            </Button>
                          )}
                        </div>
                      </div>

                      {isFullDay ? (
                        <p className="text-sm text-muted-foreground">
                          All time slots blocked: {slots[0]?.reason || "No reason provided"}
                        </p>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {slots.map((slot) => (
                            <div key={slot.id} className="flex items-center justify-between text-sm border rounded p-2">
                              <div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatTime(slot.time)}
                                </div>
                                {slot.reason && <p className="text-xs text-muted-foreground mt-1">{slot.reason}</p>}
                              </div>
                              <Button variant="outline" size="sm" onClick={() => handleUnblockTime(slot.id)}>
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
