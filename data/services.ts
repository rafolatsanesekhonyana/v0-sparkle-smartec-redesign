import type { Service } from "../types/booking"

export const services: Service[] = [
  {
    id: "manicure-basic",
    name: "Basic Manicure",
    duration: 45,
    price: 35,
    description: "Nail shaping, cuticle care, and regular polish",
  },
  {
    id: "manicure-gel",
    name: "Gel Manicure",
    duration: 60,
    price: 50,
    description: "Long-lasting gel polish with nail care",
  },
  {
    id: "pedicure-basic",
    name: "Basic Pedicure",
    duration: 60,
    price: 45,
    description: "Foot soak, nail care, and regular polish",
  },
  {
    id: "pedicure-spa",
    name: "Spa Pedicure",
    duration: 90,
    price: 65,
    description: "Luxury foot treatment with exfoliation and massage",
  },
  {
    id: "nail-art",
    name: "Nail Art Design",
    duration: 30,
    price: 25,
    description: "Custom nail art and decorative designs",
  },
  {
    id: "acrylic-full",
    name: "Full Set Acrylics",
    duration: 120,
    price: 80,
    description: "Complete acrylic nail extension set",
  },
  {
    id: "acrylic-fill",
    name: "Acrylic Fill",
    duration: 90,
    price: 60,
    description: "Acrylic nail maintenance and fill",
  },
]
