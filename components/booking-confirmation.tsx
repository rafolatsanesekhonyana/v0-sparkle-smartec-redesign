"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, Clock, MapPin, Phone, Mail, Sparkles, Heart, Gift } from "lucide-react"
import type { Booking } from "../types/booking"
import { formatDate, formatTime } from "../utils/booking-utils"

interface BookingConfirmationProps {
  booking: Booking
  onNewBooking: () => void
}

export function BookingConfirmation({ booking, onNewBooking }: BookingConfirmationProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Success Header */}
      <div className="text-center space-y-6">
        <div className="relative">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto animate-scale-in" />
          <div className="absolute -top-2 -right-2">
            <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold gradient-text">Booking Confirmed!</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Your appointment has been successfully scheduled. We can't wait to pamper you!
          </p>
        </div>

        <div className="flex justify-center gap-4 text-2xl animate-bounce">
          <span>💅</span>
          <span>✨</span>
          <span>💖</span>
        </div>
      </div>

      {/* Booking Details Card */}
      <Card className="glass-effect shadow-elegant animate-slide-up">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-2 font-serif text-xl">
            <Heart className="h-5 w-5 text-pink-500" />
            Your Appointment Details
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">Confirmed</Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Service & Client Info Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Service Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 border-b border-pink-200 pb-2">Service Information</h4>

              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100">
                  <p className="font-semibold text-lg font-serif text-gray-800">{booking.service.name}</p>
                  <p className="text-sm text-gray-600">{booking.service.description}</p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-pink-500" />
                  <span className="font-medium">{booking.service.duration} minutes</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Gift className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">Investment: M{booking.service.price}</span>
                </div>
              </div>
            </div>

            {/* Client Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 border-b border-pink-200 pb-2">Contact Information</h4>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {booking.clientName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{booking.clientName}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <a href={`mailto:${booking.clientEmail}`} className="text-blue-600 hover:underline">
                    {booking.clientEmail}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <a href={`tel:${booking.clientPhone}`} className="text-blue-600 hover:underline">
                    {booking.clientPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Date, Time & Location */}
          <div className="grid gap-4 sm:grid-cols-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                <p className="font-semibold text-gray-800">{formatDate(booking.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Time</p>
                <p className="font-semibold text-gray-800">{formatTime(booking.time)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                <p className="font-semibold text-gray-800">Brights' Nails Studio</p>
              </div>
            </div>
          </div>

          {/* Special Notes */}
          {booking.notes && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-gray-800 mb-2">Special Requests</h4>
              <p className="text-sm text-gray-600 italic">"{booking.notes}"</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Steps & Actions */}
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              What's Next?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                <span>You'll receive a confirmation email shortly with all the details</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                <span>We'll send you a reminder 24 hours before your appointment</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                <span>Please arrive 5 minutes early for the best experience</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact & Actions */}
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 inline-block border border-gray-200">
            Need to make changes? Call us at{" "}
            <a href="tel:+266123-4567" className="text-pink-600 font-semibold hover:underline">
              +266 123-4567
            </a>
          </p>

          <Button
            onClick={onNewBooking}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow-elegant hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
          >
            <Heart className="h-4 w-4 mr-2" />
            Book Another Appointment
          </Button>
        </div>
      </div>
    </div>
  )
}
