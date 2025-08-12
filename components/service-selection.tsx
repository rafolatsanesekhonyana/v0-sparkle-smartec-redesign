"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import type { Service } from "../types/booking"

interface ServiceSelectionProps {
  services: Service[]
  selectedService: Service | null
  onServiceSelect: (service: Service) => void
}

export const ServiceSelection = React.memo(function ServiceSelection({
  services,
  selectedService,
  onServiceSelect,
}: ServiceSelectionProps) {
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent, service: Service) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        onServiceSelect(service)
      }
    },
    [onServiceSelect],
  )

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold px-2 sm:px-0" id="service-selection-heading">
        Select a Service
      </h2>
      <div
        className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 px-2 sm:px-0"
        role="radiogroup"
        aria-labelledby="service-selection-heading"
      >
        {services.map((service) => (
          <Card
            key={service.id}
            className={`cursor-pointer transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 min-h-[140px] sm:min-h-[120px] ${
              selectedService?.id === service.id ? "ring-2 ring-primary bg-primary/5" : ""
            }`}
            onClick={() => onServiceSelect(service)}
            onKeyDown={(e) => handleKeyDown(e, service)}
            tabIndex={0}
            role="radio"
            aria-checked={selectedService?.id === service.id}
            aria-describedby={`service-${service.id}-description`}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-base sm:text-lg">
                <span className="leading-tight">{service.name}</span>
                <Badge
                  variant="secondary"
                  className="self-start sm:self-center text-sm"
                  aria-label={`Price: M${service.price}`}
                >
                  M{service.price}
                </Badge>
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed" id={`service-${service.id}-description`}>
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1" aria-label={`Duration: ${service.duration} minutes`}>
                  <Clock className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center gap-1" aria-label={`Price: M${service.price}`}>
                  <span>M{service.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {services.length === 0 && (
        <div className="text-center py-8 text-muted-foreground" role="status" aria-live="polite">
          No services available at the moment. Please try again later.
        </div>
      )}
    </div>
  )
})
