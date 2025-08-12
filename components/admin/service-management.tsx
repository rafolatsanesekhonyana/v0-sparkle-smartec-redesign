"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Clock } from "lucide-react"
import type { Service } from "../../types/booking"

interface ServiceManagementProps {
  services: Service[]
  onUpdateServices: (services: Service[]) => void
}

export function ServiceManagement({ services, onUpdateServices }: ServiceManagementProps) {
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isAddingService, setIsAddingService] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    duration: 30,
    price: 0,
    description: "",
  })

  const resetForm = () => {
    setFormData({ name: "", duration: 30, price: 0, description: "" })
    setEditingService(null)
    setIsAddingService(false)
  }

  const handleSaveService = () => {
    if (!formData.name || formData.price <= 0) return

    const serviceData = {
      id: editingService?.id || `service-${Date.now()}`,
      name: formData.name,
      duration: formData.duration,
      price: formData.price,
      description: formData.description,
    }

    if (editingService) {
      // Update existing service
      const updatedServices = services.map((service) => (service.id === editingService.id ? serviceData : service))
      onUpdateServices(updatedServices)
    } else {
      // Add new service
      onUpdateServices([...services, serviceData])
    }

    resetForm()
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      duration: service.duration,
      price: service.price,
      description: service.description,
    })
    setIsAddingService(true)
  }

  const handleDeleteService = (serviceId: string) => {
    const updatedServices = services.filter((service) => service.id !== serviceId)
    onUpdateServices(updatedServices)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Service Management</h2>
        <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingService(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service-name">Service Name</Label>
                <Input
                  id="service-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Gel Manicure"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service-duration">Duration (minutes)</Label>
                  <Input
                    id="service-duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                    min="15"
                    step="15"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-price">Price (M)</Label>
                  <Input
                    id="service-price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    min="0"
                    step="5"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-description">Description</Label>
                <Textarea
                  id="service-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the service..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveService} className="flex-1">
                  {editingService ? "Update Service" : "Add Service"}
                </Button>
                <Button variant="outline" onClick={resetForm} className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{service.name}</span>
                <Badge variant="secondary">M{service.price}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {service.duration} min
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteService(service.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
