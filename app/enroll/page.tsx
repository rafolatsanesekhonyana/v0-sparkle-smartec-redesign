"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

export default function EnrollPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCourseChange = (value: string) => {
    setFormData((prev) => ({ ...prev, course: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Enrollment Successful",
          description: "Thank you for enrolling. We will be in touch shortly.",
        })
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          course: "",
        })
      } else {
        const errorData = await response.json()
        toast({
          title: "Enrollment Failed",
          description: errorData.message || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Enrollment Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const courses = [
    "Web Development",
    "Mobile App Development",
    "Cloud Solutions",
    "Digital Marketing",
    "UI/UX Design",
    "Cybersecurity",
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-white via-teal-50/30 to-coral-50/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Enroll in a{" "}
            <span className="bg-gradient-to-r from-teal-600 to-coral-500 bg-clip-text text-transparent">Course</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your learning journey with our expert-led courses
          </p>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border-gray-200 shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Course</h2>
                  <RadioGroup
                    value={formData.course}
                    onValueChange={handleCourseChange}
                    className="space-y-4"
                  >
                    {courses.map((course, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={course} id={course} />
                        <Label htmlFor={course} className="cursor-pointer">
                          {course}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-coral-500 hover:from-teal-700 hover:to-coral-600 text-white py-4 text-lg shadow-lg"
                >
                  Enroll Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
