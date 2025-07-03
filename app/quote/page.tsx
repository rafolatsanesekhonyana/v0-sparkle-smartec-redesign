"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function QuotePage() {
  const services = [
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
            Get A{" "}
            <span className="bg-gradient-to-r from-teal-600 to-coral-500 bg-clip-text text-transparent">Quote</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us about your project and we'll provide you with a detailed quote
          </p>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border-gray-200 shadow-xl">
            <CardContent className="p-8">
              <form className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <Input
                        className="bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <Input
                        className="bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <Input
                        type="email"
                        className="bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <Input
                        type="tel"
                        className="bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <Input className="bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500" />
                    </div>
                  </div>
                </div>

                {/* Project Information */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
                      <Input
                        className="bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">Services Needed *</label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {services.map((service, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Checkbox id={service} />
                            <label htmlFor={service} className="text-gray-700 cursor-pointer">
                              {service}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
                      <Textarea
                        rows={5}
                        className="bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500"
                        placeholder="Please describe your project in detail..."
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                        <select className="w-full p-3 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-teal-500 focus:ring-teal-500">
                          <option value="">Select budget range</option>
                          <option value="5000-10000">$5,000 - $10,000</option>
                          <option value="10000-25000">$10,000 - $25,000</option>
                          <option value="25000-50000">$25,000 - $50,000</option>
                          <option value="50000+">$50,000+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                        <select className="w-full p-3 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-teal-500 focus:ring-teal-500">
                          <option value="">Select timeline</option>
                          <option value="1-3months">1-3 months</option>
                          <option value="3-6months">3-6 months</option>
                          <option value="6-12months">6-12 months</option>
                          <option value="12months+">12+ months</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-coral-500 hover:from-teal-700 hover:to-coral-600 text-white py-4 text-lg shadow-lg"
                >
                  Submit Quote Request
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
