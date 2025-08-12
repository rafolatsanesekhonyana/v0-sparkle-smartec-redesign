"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Sparkles } from "lucide-react"
import type { Service } from "../types/booking"

interface ServiceSelectionProps {
  services: Service[]
  selectedService: Service | null
  onServiceSelect: (service: Service) => void
}

export function ServiceSelection({ services, selectedService, onServiceSelect }: ServiceSelectionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">Select Your Service</h2>
        <p className="text-muted-foreground">Choose from our premium nail care treatments</p>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 px-2 sm:px-0">
        {services.map((service, index) => (
          <Card
            key={service.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group relative overflow-hidden ${
              selectedService?.id === service.id
                ? "ring-2 ring-primary shadow-lg scale-[1.02] bg-gradient-to-br from-primary/5 to-primary/10"
                : "hover:shadow-md"
            }`}
            onClick={() => onServiceSelect(service)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 text-lg sm:text-xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="leading-tight font-serif">{service.name}</span>
                </div>
                <Badge
                  variant={selectedService?.id === service.id ? "default" : "secondary"}
                  className="self-start sm:self-center text-sm font-semibold px-3 py-1"
                >
                  M{service.price}
                </Badge>
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed text-muted-foreground pl-7">
                {service.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0 relative z-10">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span>{service.duration} minutes</span>
                </div>
                {selectedService?.id === service.id && (
                  <Badge variant="default" className="text-xs">
                    Selected
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
