"use client"

import type React from "react"

import { useMemo, useRef, useEffect, useState } from "react"

// Debounce hook for performance optimization
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(elementRef: React.RefObject<Element>, options: IntersectionObserverInit = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting), options)

    observer.observe(element)
    return () => observer.disconnect()
  }, [elementRef, options])

  return isIntersecting
}

// Memoized date formatter for performance
export function useFormatDate() {
  const formatter = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }, [])

  return (date: Date) => formatter.format(date)
}

// Optimized time slot generation
export function generateTimeSlots(startHour = 9, endHour = 17, intervalMinutes = 30): string[] {
  return useMemo(() => {
    const slots: string[] = []
    const start = startHour * 60
    const end = endHour * 60

    for (let minutes = start; minutes < end; minutes += intervalMinutes) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      const time = `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
      slots.push(time)
    }

    return slots
  }, [startHour, endHour, intervalMinutes])
}

// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0)
  const startTime = useRef(performance.now())

  useEffect(() => {
    renderCount.current += 1
    const endTime = performance.now()
    const renderTime = endTime - startTime.current

    if (process.env.NODE_ENV === "development") {
      console.log(`${componentName} render #${renderCount.current} took ${renderTime.toFixed(2)}ms`)
    }

    startTime.current = performance.now()
  })
}
