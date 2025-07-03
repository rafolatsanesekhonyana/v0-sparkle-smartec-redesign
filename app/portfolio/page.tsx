"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export default function PortfolioPage() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with advanced features",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React", "Node.js", "MongoDB"],
      category: "Web Development",
    },
    {
      title: "Mobile Banking App",
      description: "Secure mobile banking application for iOS and Android",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React Native", "Firebase", "Stripe"],
      category: "Mobile Development",
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable cloud infrastructure for enterprise client",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["AWS", "Docker", "Kubernetes"],
      category: "Cloud Solutions",
    },
    {
      title: "Digital Marketing Dashboard",
      description: "Analytics dashboard for marketing campaigns",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Vue.js", "Python", "PostgreSQL"],
      category: "Digital Marketing",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-white via-teal-50/30 to-coral-50/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-teal-600 to-coral-500 bg-clip-text text-transparent">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our latest projects and see how we've helped businesses transform digitally
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-white border-gray-200 hover:border-teal-300 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <CardContent className="p-0">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <div className="text-teal-600 text-sm font-medium mb-2">{project.category}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-teal-600 to-coral-500 hover:from-teal-700 hover:to-coral-600 text-white"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
