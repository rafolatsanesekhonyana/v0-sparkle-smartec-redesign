"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, BookOpen, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CiscoLearningPage() {
  const enrollFormRef = useRef<HTMLDivElement>(null)
  const [selectedCourse, setSelectedCourse] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course: "",
    experience: "",
    motivation: "",
    terms: false,
  })

  const handleEnrollClick = (courseId: string) => {
    setSelectedCourse(courseId)
    setFormData({ ...formData, course: courseId })

    // Scroll to enrollment form
    if (enrollFormRef.current) {
      enrollFormRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Enrollment submitted successfully! We will contact you soon.")
  }

  const courseCategories = [
    {
      category: "Networking",
      courses: [
        {
          id: "ccna-intro",
          title: "CCNA: Introduction to Networks",
          description:
            "Learn fundamental networking concepts and protocols. Build a foundation for advanced networking studies.",
          duration: "70 hours",
          level: "Beginner",
          students: 245,
          accredited: true,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "ccna-switching",
          title: "CCNA: Switching, Routing, and Wireless Essentials",
          description:
            "Master switching and routing concepts, VLAN configuration, and wireless networking fundamentals.",
          duration: "70 hours",
          level: "Intermediate",
          students: 189,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "ccna-enterprise",
          title: "CCNA: Enterprise Networking, Security, and Automation",
          description:
            "Advanced enterprise networking concepts including security implementation and network automation.",
          duration: "70 hours",
          level: "Advanced",
          students: 156,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "networking-essentials",
          title: "Networking Essentials",
          description:
            "Essential networking concepts for beginners including network types, protocols, and basic troubleshooting.",
          duration: "50 hours",
          level: "Beginner",
          students: 312,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "network-addressing",
          title: "Network Addressing and Basic Troubleshooting",
          description: "Learn IP addressing schemes, subnetting, and fundamental network troubleshooting techniques.",
          duration: "40 hours",
          level: "Beginner",
          students: 278,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "networking-devices",
          title: "Networking Devices and Initial Configuration",
          description: "Hands-on experience with network devices, initial setup, and basic configuration procedures.",
          duration: "45 hours",
          level: "Intermediate",
          students: 198,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "iot-intro",
          title: "Introduction to IoT and Digital Transformation",
          description: "Explore Internet of Things concepts and their role in digital transformation initiatives.",
          duration: "35 hours",
          level: "Intermediate",
          students: 167,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
    },
    {
      category: "Cybersecurity",
      courses: [
        {
          id: "cybersecurity-intro",
          title: "Introduction to Cybersecurity",
          description: "Fundamental cybersecurity concepts, threat landscape, and basic security principles.",
          duration: "30 hours",
          level: "Beginner",
          students: 423,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "cybersecurity-essentials",
          title: "Cybersecurity Essentials",
          description:
            "Comprehensive cybersecurity training covering threats, vulnerabilities, and defense strategies.",
          duration: "50 hours",
          level: "Intermediate",
          students: 298,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "network-security",
          title: "Network Security",
          description: "Advanced network security concepts, firewalls, VPNs, and security monitoring techniques.",
          duration: "60 hours",
          level: "Advanced",
          students: 187,
          accredited: true,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "ethical-hacker",
          title: "Ethical Hacker",
          description: "Learn ethical hacking techniques, penetration testing, and vulnerability assessment methods.",
          duration: "80 hours",
          level: "Advanced",
          students: 134,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "cyberops",
          title: "CyberOps Associate",
          description: "Security operations center fundamentals, incident response, and threat analysis techniques.",
          duration: "70 hours",
          level: "Intermediate",
          students: 156,
          accredited: true,
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
    },
    {
      category: "Programming & Development",
      courses: [
        {
          id: "python-essentials",
          title: "Python Essentials 2",
          description: "Advanced Python programming concepts, object-oriented programming, and data structures.",
          duration: "40 hours",
          level: "Intermediate",
          students: 367,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "css-essentials",
          title: "CSS Essentials",
          description: "Master CSS styling, responsive design, and modern web development techniques.",
          duration: "35 hours",
          level: "Beginner",
          students: 289,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
    },
    {
      category: "AI & Data Science",
      courses: [
        {
          id: "data-science-intro",
          title: "Introduction to Data Science",
          description: "Fundamental data science concepts, data analysis techniques, and statistical methods.",
          duration: "45 hours",
          level: "Beginner",
          students: 234,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "data-analytics",
          title: "Data Analytics Essentials",
          description: "Essential data analytics skills, visualization techniques, and business intelligence concepts.",
          duration: "50 hours",
          level: "Intermediate",
          students: 198,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "data-science-python",
          title: "Data Science Essentials with Python",
          description: "Comprehensive data science training using Python, including machine learning fundamentals.",
          duration: "60 hours",
          level: "Intermediate",
          students: 167,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
          beta: true,
        },
      ],
    },
    {
      category: "Cisco Packet Tracer",
      courses: [
        {
          id: "packet-tracer-networking",
          title: "Exploring Networking with Cisco Packet Tracer",
          description: "Hands-on network simulation and design using Cisco Packet Tracer software.",
          duration: "25 hours",
          level: "Beginner",
          students: 345,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "packet-tracer-iot",
          title: "Exploring Internet of Things with Cisco Packet Tracer",
          description: "IoT network design and simulation using advanced Packet Tracer features and IoT components.",
          duration: "30 hours",
          level: "Intermediate",
          students: 178,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
    },
    {
      category: "Information Technology",
      courses: [
        {
          id: "operating-systems",
          title: "Operating Systems Basics",
          description: "Fundamental operating system concepts, file management, and system administration basics.",
          duration: "40 hours",
          level: "Beginner",
          students: 267,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "computer-hardware",
          title: "Computer Hardware Basics",
          description: "Computer hardware components, assembly, troubleshooting, and maintenance procedures.",
          duration: "35 hours",
          level: "Beginner",
          students: 234,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
    },
    {
      category: "Digital Literacy & Professional Skills",
      courses: [
        {
          id: "digital-safety",
          title: "Digital Safety and Security Awareness",
          description: "Essential digital safety practices, privacy protection, and online security awareness.",
          duration: "20 hours",
          level: "Beginner",
          students: 456,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "computer-mobile",
          title: "Using Computer and Mobile Devices",
          description:
            "Practical skills for using computers and mobile devices effectively in personal and professional settings.",
          duration: "25 hours",
          level: "Beginner",
          students: 389,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "business-launch",
          title: "Launching a Business Venture",
          description: "Entrepreneurship fundamentals, business planning, and startup development strategies.",
          duration: "40 hours",
          level: "Intermediate",
          students: 198,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "business-manage",
          title: "Managing a Business Venture",
          description: "Business management principles, operations, and growth strategies for entrepreneurs.",
          duration: "45 hours",
          level: "Intermediate",
          students: 167,
          accredited: false,
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
    },
  ]

  // Flatten all courses for the dropdown
  const allCourses = courseCategories.flatMap((category) =>
    category.courses.map((course) => ({
      id: course.id,
      title: course.title,
    })),
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-600 to-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cisco Learning Academy</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Master networking technologies with our comprehensive Cisco certification courses
          </p>
          <Button
            className="mt-8 bg-white text-teal-600 hover:bg-gray-100"
            onClick={() => enrollFormRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            Enroll Now <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Courses</h2>
            <p className="text-gray-600 text-lg">
              Choose from our selection of industry-recognized Cisco certification programs
            </p>
          </div>

          <div className="space-y-12">
            {courseCategories.map((category) => (
              <div key={category.category} id={category.category.toLowerCase().replace(/\s+/g, "-")}>
                <h3 className="text-2xl font-bold mb-6 text-center">
                  <span className="text-teal-600">{category.category}</span> Courses
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.courses.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gray-100 relative">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Badge className="bg-teal-600">{course.level}</Badge>
                          {course.accredited && <Badge className="bg-green-600">Accredited</Badge>}
                          {course.beta && <Badge className="bg-orange-600">Beta</Badge>}
                        </div>
                      </div>

                      <CardHeader>
                        <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                        <CardDescription className="text-gray-600 text-sm">{course.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{course.students} students</span>
                          </div>
                        </div>

                        <Button
                          className="w-full bg-gradient-to-r from-teal-600 to-red-500 hover:from-teal-700 hover:to-red-600"
                          onClick={() => handleEnrollClick(course.id)}
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Enroll Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Form Section */}
      <section className="bg-gray-50 py-16" ref={enrollFormRef} id="enrollment-form">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Course Enrollment</h2>
            <p className="text-gray-600 text-lg">
              Fill out the form below to enroll in your selected Cisco certification course
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enrollment Application</CardTitle>
              <CardDescription>Please provide your information to complete the enrollment process</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                {/* Course Selection */}
                <div className="space-y-2">
                  <Label htmlFor="course">Select Course *</Label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) => setFormData({ ...formData, course: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {allCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Level */}
                <div className="space-y-3">
                  <Label>Current Experience Level *</Label>
                  <RadioGroup
                    value={formData.experience}
                    onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beginner" id="beginner" />
                      <Label htmlFor="beginner">Beginner - New to networking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediate" id="intermediate" />
                      <Label htmlFor="intermediate">Intermediate - Some networking experience</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="advanced" id="advanced" />
                      <Label htmlFor="advanced">Advanced - Extensive networking background</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Motivation */}
                <div className="space-y-2">
                  <Label htmlFor="motivation">Why do you want to take this course?</Label>
                  <Textarea
                    id="motivation"
                    placeholder="Tell us about your goals and motivation..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    rows={4}
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.terms}
                    onCheckedChange={(checked) => setFormData({ ...formData, terms: checked as boolean })}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions and privacy policy *
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-red-500 hover:from-teal-700 hover:to-red-600"
                  disabled={!formData.terms}
                >
                  Submit Enrollment Application
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have any questions about the enrollment process or our courses, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong> info@sparklesmartec.com
                </p>
                <p>
                  <strong>Phone:</strong> +266-63651639
                </p>
                <p>
                  <strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
