"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import type { Service } from "../types/booking"

interface ServiceSelectionProps {
  services: Service[]
  selectedService: Service | null
  onServiceSelect: (service: Service) => void
}

export function ServiceSelection({ services, selectedService, onServiceSelect }: ServiceSelectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold px-2 sm:px-0">Select a Service</h2>
      <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 px-2 sm:px-0">
        {services.map((service) => (
          <Card
            key={service.id}
            className={`cursor-pointer transition-all hover:shadow-md min-h-[140px] sm:min-h-[120px] ${
              selectedService?.id === service.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onServiceSelect(service)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-base sm:text-lg">
                <span className="leading-tight">{service.name}</span>
                <Badge variant="secondary" className="self-start sm:self-center text-sm">
                  M{service.price}
                </Badge>
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>M{service.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
