"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Code, Smartphone, Cloud, BarChart3, Palette, Shield, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: <Settings className="w-12 h-12" />,
      title: "IT Consultancy",
      description:
        "Strategic technology consulting and digital transformation guidance to optimize your business operations and drive growth.",
      features: [
        "Technology Strategy",
        "Digital Transformation",
        "Process Optimization",
        "IT Infrastructure Planning",
        "Security Assessment",
        "Training & Support",
      ],
      featured: true,
      priority: 1,
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "Web Development",
      description:
        "Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.",
      features: ["Responsive Design", "SEO Optimization", "Performance Optimization", "Custom CMS"],
      priority: 2,
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android platforms.",
      features: ["React Native", "Flutter", "Native iOS/Android", "App Store Deployment"],
      priority: 3,
    },
     {
      icon: <Shield className="w-12 h-12" />,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets and data.",
      features: ["Security Audits", "Penetration Testing", "Compliance", "Training"],
      priority: 7,
    },
    {
      icon: <Cloud className="w-12 h-12" />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services for modern businesses.",
      features: ["AWS/Azure/GCP", "DevOps", "Microservices", "Database Management"],
      priority: 4,
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Digital Marketing",
      description: "Data-driven marketing strategies to grow your online presence and reach.",
      features: ["SEO/SEM", "Social Media", "Content Marketing", "Analytics"],
      priority: 5,
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "UI/UX Design",
      description: "User-centered design solutions that create engaging and intuitive experiences.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      priority: 6,
    },
   
  ]

  const sortedServices = services.sort((a, b) => a.priority - b.priority)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-white via-teal-50/30 to-coral-50/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-teal-600 to-coral-500 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive digital solutions designed to transform your business and drive growth
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedServices.map((service, index) => (
              <Card
                key={index}
                className={`bg-white border-gray-200 hover:border-teal-300 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  service.featured ? "ring-2 ring-teal-200 bg-gradient-to-br from-teal-50/50 to-coral-50/50" : ""
                }`}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r from-teal-600 to-coral-500 rounded-full flex items-center justify-center mb-6 text-white shadow-lg ${
                      service.featured ? "ring-2 ring-teal-200" : ""
                    }`}
                  >
                    {service.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    {service.featured && <Badge className="bg-teal-100 text-teal-700 border-teal-200">Featured</Badge>}
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-500 flex items-center">
                        <CheckCircle className="w-4 h-4 text-teal-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/quote">
                    <Button className="w-full bg-gradient-to-r from-teal-600 to-coral-500 hover:from-teal-700 hover:to-coral-600 text-white shadow-lg">
                      Get Quote <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* IT Consultancy Highlight */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-gradient-to-r from-teal-100 to-coral-100 text-teal-700 border-teal-200 px-4 py-2 mb-6">
                🎯 Featured Service
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                IT Consultancy &{" "}
                <span className="bg-gradient-to-r from-teal-600 to-coral-500 bg-clip-text text-transparent">
                  Digital Transformation
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our IT consultancy services help businesses navigate the complex digital landscape. We provide strategic
                guidance, technology roadmaps, and hands-on support to ensure your digital transformation initiatives
                deliver real business value.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-600">Strategic Planning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-600">Technology Assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-600">Process Optimization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-600">Change Management</span>
                </div>
              </div>
              <Link href="/quote">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-coral-500 hover:from-teal-700 hover:to-coral-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Schedule Consultation <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="IT Consultancy Services"
                className="w-full h-auto rounded-2xl shadow-2xl border border-gray-100"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-coral-500/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
