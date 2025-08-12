"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, ArrowRight, Settings, AlertCircle, CheckCircle2 } from "lucide-react"
import { ServiceSelection } from "./components/service-selection"
import { DateTimePicker } from "./components/date-time-picker"
import { ClientForm } from "./components/client-form"
import { BookingSummary } from "./components/booking-summary"
import { BookingConfirmation } from "./components/booking-confirmation"
import { AdminDashboard } from "./admin-dashboard"
import type { Service, BookingFormData, Booking } from "./types/booking"
import { useToast } from "@/hooks/use-toast"
import { handleApiResponse, getErrorMessage, retryOperation } from "@/utils/error-utils"

type BookingStep = "service" | "datetime" | "details" | "summary" | "confirmation"
type ViewMode = "booking" | "admin"

export default function BookingSystem() {
  const [viewMode, setViewMode] = useState<ViewMode>("booking")
  const [currentStep, setCurrentStep] = useState<BookingStep>("service")
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [formData, setFormData] = useState<Partial<BookingFormData>>({})
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null)
  const [allBookings, setAllBookings] = useState<Booking[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()
  const [retryCount, setRetryCount] = useState(0)

  // Load services and bookings from API on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await retryOperation(
          async () => {
            const response = await fetch("/api/services")
            return await handleApiResponse<Service[]>(response)
          },
          3,
          1000,
        )

        setServices(data)

        if (data.length === 0) {
          toast({
            title: "No services available",
            description: "Please contact us to schedule an appointment.",
            variant: "default",
          })
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        setError(errorMessage)

        toast({
          title: "Failed to load services",
          description: errorMessage,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
  }, [])

  const steps: { key: BookingStep; title: string; description: string }[] = [
    { key: "service", title: "Service", description: "Choose your service" },
    { key: "datetime", title: "Date & Time", description: "Pick your slot" },
    { key: "details", title: "Details", description: "Your information" },
    { key: "summary", title: "Summary", description: "Review booking" },
    { key: "confirmation", title: "Confirmed", description: "All set!" },
  ]

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const validateLesothoPhone = (phone: string): { isValid: boolean; error?: string } => {
    if (!phone.trim()) {
      return { isValid: false, error: "Phone number is required" }
    }

    const cleanPhone = phone.replace(/\s+/g, "")
    if (!cleanPhone.startsWith("+266")) {
      return { isValid: false, error: "Phone number must start with +266" }
    }

    const numberPart = cleanPhone.slice(4)
    if (numberPart.length !== 8) {
      return { isValid: false, error: "Phone number must have 8 digits after +266" }
    }

    const validPrefixes = ["62", "63", "64", "69", "68", "51", "53", "56", "57", "58", "59"]
    if (!validPrefixes.some((prefix) => numberPart.startsWith(prefix))) {
      return {
        isValid: false,
        error: "Invalid phone number prefix. Must start with 62, 63, 64, 69, 68, 51, 53, 56, 57, 58, or 59",
      }
    }

    return { isValid: true }
  }

  const validateEmail = (email: string): { isValid: boolean; error?: string } => {
    if (!email.trim()) {
      return { isValid: false, error: "Email address is required" }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { isValid: false, error: "Please enter a valid email address" }
    }

    return { isValid: true }
  }

  const validateName = (name: string): { isValid: boolean; error?: string } => {
    if (!name.trim()) {
      return { isValid: false, error: "Full name is required" }
    }

    if (name.trim().length < 2) {
      return { isValid: false, error: "Name must be at least 2 characters long" }
    }

    return { isValid: true }
  }

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {}
    setError(null)

    switch (currentStep) {
      case "service":
        if (!selectedService) {
          setError("Please select a service to continue")
          return false
        }
        break

      case "datetime":
        if (!selectedDate) {
          setError("Please select a date to continue")
          return false
        }
        if (!selectedTime) {
          setError("Please select a time slot to continue")
          return false
        }
        break

      case "details":
        const nameValidation = validateName(formData.clientName || "")
        if (!nameValidation.isValid) {
          errors.clientName = nameValidation.error!
        }

        const emailValidation = validateEmail(formData.clientEmail || "")
        if (!emailValidation.isValid) {
          errors.clientEmail = emailValidation.error!
        }

        const phoneValidation = validateLesothoPhone(formData.clientPhone || "")
        if (!phoneValidation.isValid) {
          errors.clientPhone = phoneValidation.error!
        }

        setValidationErrors(errors)
        return Object.keys(errors).length === 0

      case "summary":
        return true

      default:
        return false
    }

    setValidationErrors({})
    return true
  }

  const handleFormChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case "service":
        return selectedService !== null
      case "datetime":
        return selectedDate && selectedTime
      case "details":
        return (
          formData.clientName &&
          formData.clientEmail &&
          formData.clientPhone &&
          validateLesothoPhone(formData.clientPhone).isValid &&
          validateEmail(formData.clientEmail).isValid &&
          validateName(formData.clientName).isValid
        )
      case "summary":
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return
    }

    const stepOrder: BookingStep[] = ["service", "datetime", "details", "summary", "confirmation"]
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1])
      setError(null)
    }
  }

  const handlePrevious = () => {
    const stepOrder: BookingStep[] = ["service", "datetime", "details", "summary", "confirmation"]
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
      setError(null)
      setValidationErrors({})
    }
  }

  // Updated to use API for booking creation
  const handleConfirmBooking = async () => {
    if (!selectedService || !selectedDate || !formData.clientName) return

    setIsLoading(true)
    setError(null)

    try {
      const booking = await retryOperation(
        async () => {
          const response = await fetch("/api/bookings", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clientName: formData.clientName,
              clientEmail: formData.clientEmail,
              clientPhone: formData.clientPhone,
              serviceId: selectedService.id,
              date: selectedDate.toISOString(),
              time: selectedTime,
              notes: formData.notes,
            }),
          })

          return await handleApiResponse(response)
        },
        2,
        1500,
      )

      setConfirmedBooking(booking)
      setAllBookings((prev) => [...prev, booking])
      setCurrentStep("confirmation")

      toast({
        title: "Booking confirmed!",
        description: `Your appointment for ${selectedService.name} has been scheduled.`,
        variant: "success",
      })
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      setError(errorMessage)

      toast({
        title: "Booking failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewBooking = () => {
    setCurrentStep("service")
    setSelectedService(null)
    setSelectedDate(undefined)
    setSelectedTime("")
    setFormData({})
    setConfirmedBooking(null)
    setError(null)
    setValidationErrors({})
    setIsLoading(false)
  }

  useEffect(() => {
    const savedData = localStorage.getItem("nail-booking-draft")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        if (parsed.formData) setFormData(parsed.formData)
        if (parsed.selectedService) {
          // Find the service from loaded services
          const service = services.find((s) => s.id === parsed.selectedService.id)
          if (service) setSelectedService(service)
        }
        if (parsed.selectedDate) setSelectedDate(new Date(parsed.selectedDate))
        if (parsed.selectedTime) setSelectedTime(parsed.selectedTime)
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }, [services])

  useEffect(() => {
    if (currentStep !== "confirmation") {
      localStorage.setItem(
        "nail-booking-draft",
        JSON.stringify({
          formData,
          selectedService,
          selectedDate: selectedDate?.toISOString(),
          selectedTime,
        }),
      )
    } else {
      localStorage.removeItem("nail-booking-draft")
    }
  }, [formData, selectedService, selectedDate, selectedTime, currentStep])

  // Admin Dashboard View
  if (viewMode === "admin") {
    return (
      <AdminDashboard
        onBackToBooking={() => setViewMode("booking")}
        initialBookings={allBookings}
        onBookingsUpdate={setAllBookings}
        services={services}
        onServicesUpdate={setServices}
      />
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "service":
        return (
          <ServiceSelection
            services={services}
            selectedService={selectedService}
            onServiceSelect={setSelectedService}
          />
        )
      case "datetime":
        return (
          <DateTimePicker
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
            existingBookings={allBookings}
          />
        )
      case "details":
        return <ClientForm formData={formData} onFormChange={handleFormChange} validationErrors={validationErrors} />
      case "summary":
        return selectedService ? (
          <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
            <h2 className="text-xl sm:text-2xl font-semibold">Review Your Booking</h2>
            <BookingSummary
              service={selectedService}
              formData={{ ...formData, time: selectedTime }}
              selectedDate={selectedDate}
            />
          </div>
        ) : null
      case "confirmation":
        return confirmedBooking ? (
          <BookingConfirmation booking={confirmedBooking} onNewBooking={handleNewBooking} />
        ) : null
      default:
        return null
    }
  }

  if (currentStep === "confirmation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-2 sm:p-4">
        <div className="max-w-2xl mx-auto py-4 sm:py-8">{renderStepContent()}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8 px-2">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Brights' Nails Studio</h1>
            <p className="text-base sm:text-lg text-gray-600">Book your perfect nail appointment</p>
          </div>
          <Button variant="outline" onClick={() => setViewMode("admin")} className="self-center sm:self-auto">
            <Settings className="h-4 w-4 mr-2" />
            Admin Panel
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 mx-2 sm:mx-0">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Progress */}
        <Card className="mb-6 sm:mb-8 mx-2 sm:mx-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-lg sm:text-xl">Booking Progress</CardTitle>
              <span className="text-xs sm:text-sm text-muted-foreground">
                Step {currentStepIndex + 1} of {steps.length}
              </span>
            </div>
            <Progress value={progress} className="w-full h-2" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-1 sm:gap-2">
              {steps.map((step, index) => (
                <div
                  key={step.key}
                  className={`text-center ${index <= currentStepIndex ? "text-primary" : "text-muted-foreground"}`}
                >
                  <div className="text-xs sm:text-sm font-medium truncate flex items-center justify-center gap-1">
                    {index < currentStepIndex && <CheckCircle2 className="h-3 w-3" />}
                    {step.title}
                  </div>
                  <div className="text-xs hidden sm:block">{step.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 order-2 lg:order-1">{renderStepContent()}</div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2 px-2 sm:px-0">
            {selectedService && currentStep !== "service" && (
              <div className="lg:sticky lg:top-4">
                <BookingSummary
                  service={selectedService}
                  formData={{ ...formData, time: selectedTime }}
                  selectedDate={selectedDate}
                />
              </div>
            )}

            {/* Navigation */}
            <Card className="lg:sticky lg:top-4">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  {currentStep !== "service" && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="flex-1 bg-transparent min-h-[44px] order-2 sm:order-1"
                      disabled={isLoading}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                  )}

                  {currentStep === "summary" ? (
                    <Button
                      onClick={handleConfirmBooking}
                      className="flex-1 min-h-[44px] order-1 sm:order-2"
                      disabled={!canProceedToNext() || isLoading}
                    >
                      {isLoading ? "Confirming..." : "Confirm Booking"}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="flex-1 min-h-[44px] order-1 sm:order-2"
                      disabled={!canProceedToNext() || isLoading}
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
