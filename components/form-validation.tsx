"use client"

import { useState } from "react"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

interface ValidationRules {
  [key: string]: ValidationRule
}

export function useFormValidation(rules: ValidationRules) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateField = (name: string, value: string): string | null => {
    const rule = rules[name]
    if (!rule) return null

    if (rule.required && !value.trim()) {
      return `${name} is required`
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `${name} must be at least ${rule.minLength} characters`
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return `${name} must be no more than ${rule.maxLength} characters`
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return `${name} format is invalid`
    }

    if (rule.custom) {
      return rule.custom(value)
    }

    return null
  }

  const validateForm = (formData: Record<string, string>): boolean => {
    const newErrors: Record<string, string> = {}

    Object.keys(rules).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName] || "")
      if (error) {
        newErrors[fieldName] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const clearErrors = () => setErrors({})

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    hasErrors: Object.keys(errors).length > 0,
  }
}

interface FormErrorDisplayProps {
  errors: Record<string, string>
}

export function FormErrorDisplay({ errors }: FormErrorDisplayProps) {
  const errorList = Object.values(errors).filter(Boolean)

  if (errorList.length === 0) return null

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <ul className="space-y-1">
          {errorList.map((error, index) => (
            <li key={index} className="text-sm">
              {error}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )
}
