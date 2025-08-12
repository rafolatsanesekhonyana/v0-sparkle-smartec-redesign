import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, Mail, Phone, MapPin, Sparkles } from "lucide-react"
import type { Service, BookingFormData } from "../types/booking"
import { formatDate, formatTime } from "../utils/booking-utils"

interface BookingSummaryProps {
  service: Service
  formData: Partial<BookingFormData>
  selectedDate: Date | undefined
}

export function BookingSummary({ service, formData, selectedDate }: BookingSummaryProps) {
  return (
    <Card className="glass-effect shadow-elegant animate-scale-in">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 font-serif">
          <Sparkles className="h-5 w-5 text-pink-500" />
          Booking Summary
          <Badge variant="outline" className="ml-auto bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200">
            Review
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Service Details */}
        <div className="space-y-3 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg font-serif text-gray-800">{service.name}</span>
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold">
              M{service.price}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-pink-500" />
            <span className="font-medium">{service.duration} minutes of pure relaxation</span>
          </div>
        </div>

        {/* Date & Time */}
        {selectedDate && formData.time && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-pink-500" />
              Appointment Details
            </h4>

            <div className="grid gap-2 pl-6">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                <span className="font-medium">{formatDate(selectedDate.toISOString())}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span className="font-medium">
                  {formatTime(formData.time)} -{" "}
                  {formatTime(
                    `${Number.parseInt(formData.time.split(":")[0]) + Math.ceil(service.duration / 60)}:${formData.time.split(":")[1]}`,
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        <Separator className="bg-gradient-to-r from-pink-200 to-purple-200" />

        {/* Client Information */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
            <User className="h-4 w-4 text-pink-500" />
            Your Information
          </h4>

          <div className="space-y-2 pl-6">
            {formData.clientName && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="font-medium">{formData.clientName}</span>
              </div>
            )}
            {formData.clientEmail && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{formData.clientEmail}</span>
              </div>
            )}
            {formData.clientPhone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{formData.clientPhone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Special Notes */}
        {formData.notes && (
          <>
            <Separator className="bg-gradient-to-r from-pink-200 to-purple-200" />
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Special Requests</h4>
              <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200 italic">
                "{formData.notes}"
              </p>
            </div>
          </>
        )}

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
          <MapPin className="h-4 w-4 text-blue-500" />
          <span className="font-medium">Brights' Nails Studio, Maseru</span>
        </div>

        <Separator className="bg-gradient-to-r from-pink-200 to-purple-200" />

        {/* Total */}
        <div className="flex items-center justify-between font-bold text-lg p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg border border-pink-200">
          <span className="font-serif text-gray-800">Total Investment</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl gradient-text">M{service.price}</span>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200">
          ✨ Your beauty journey begins here
        </div>
      </CardContent>
    </Card>
  )
}
