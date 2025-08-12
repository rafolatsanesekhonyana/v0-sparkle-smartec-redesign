"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Sparkles, Star } from "lucide-react"
import type { Service } from "../types/booking"

interface ServiceSelectionProps {
  services: Service[]
  selectedService: Service | null
  onServiceSelect: (service: Service) => void
}

export function ServiceSelection({ services, selectedService, onServiceSelect }: ServiceSelectionProps) {
  const getServiceBadge = (service: Service) => {
    if (service.name.includes("Gel") || service.name.includes("Spa")) {
      return { icon: Star, text: "Popular", variant: "default" as const }
    }
    if (service.name.includes("Art") || service.name.includes("Acrylic")) {
      return { icon: Sparkles, text: "Premium", variant: "secondary" as const }
    }
    return null
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold gradient-text">Choose Your Perfect Service</h2>
        <p className="text-muted-foreground text-lg">Professional nail care tailored to your style</p>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 px-2 sm:px-0">
        {services.map((service, index) => {
          const badge = getServiceBadge(service)
          const isSelected = selectedService?.id === service.id

          return (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 min-h-[160px] sm:min-h-[140px] group animate-slide-up ${
                isSelected
                  ? "ring-2 ring-pink-500 shadow-elegant bg-gradient-to-br from-pink-50 to-purple-50"
                  : "hover:shadow-soft"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onServiceSelect(service)}
            >
              <CardHeader className="pb-3 relative">
                {badge && (
                  <div className="absolute top-3 right-3">
                    <Badge variant={badge.variant} className="flex items-center gap-1 text-xs">
                      <badge.icon className="h-3 w-3" />
                      {badge.text}
                    </Badge>
                  </div>
                )}

                <CardTitle className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 text-base sm:text-lg group-hover:text-pink-700 transition-colors">
                  <span className="leading-tight font-serif">{service.name}</span>
                  <Badge
                    variant="outline"
                    className="self-start sm:self-center text-sm font-bold bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200"
                  >
                    M{service.price}
                  </Badge>
                </CardTitle>

                <CardDescription className="text-sm leading-relaxed text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 flex-shrink-0 text-pink-500" />
                    <span className="font-medium">{service.duration} minutes</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                    <span className="font-medium">M{service.price}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-3 flex items-center gap-2 text-pink-600 text-sm font-medium animate-scale-in">
                    <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                    Selected
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 inline-block border border-pink-100">
          💡 All services include complimentary nail consultation and aftercare advice
        </p>
      </div>
    </div>
  )
}
