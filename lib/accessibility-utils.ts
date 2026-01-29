/**
 * Accessibility Utilities for Hero Section Enhancement
 * 
 * Provides utilities for WCAG compliance, keyboard navigation,
 * and screen reader support.
 */

import { AccessibilityFeatures } from "@/types/hero-enhancement"

// ARIA label configurations
export const ariaLabels = {
  hero: {
    main: "Hero section showcasing Mindscape Analytics capabilities",
    badges: "Professional service categories",
    headline: "Main company value proposition",
    description: "Company description and capabilities",
    primaryCTA: "Get started with Mindscape Analytics - Contact us for consultation",
    secondaryCTA: "View our solutions and services",
    timeline: "Interactive timeline showing development phases",
    trustBanner: "Company credentials and system status"
  },
  timeline: {
    container: "Development phases timeline",
    phase: (title: string, status: string) => `${title} phase - ${status}`,
    metrics: (metric: string, value: string) => `${metric} improvement: ${value}`
  },
  mobile: {
    showcase: "Mobile-friendly capability showcase",
    card: (title: string) => `${title} capability details`,
    accordion: (title: string, isOpen: boolean) => 
      `${title} details ${isOpen ? 'expanded' : 'collapsed'}`
  }
} as const

// Focus management utilities
export class FocusManager {
  private static focusableSelectors = [
    'button',
    'a[href]',
    'input',
    'select',
    'textarea',
    '[tabindex]:not([tabindex="-1"])',
    'details',
    'summary'
  ].join(', ')

  /**
   * Get all focusable elements within a container
   */
  static getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll(this.focusableSelectors))
      .filter(el => !el.hasAttribute('disabled') && this.isVisible(el)) as HTMLElement[]
  }

  /**
   * Check if element is visible
   */
  private static isVisible(element: Element): boolean {
    const style = window.getComputedStyle(element)
    return style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           style.opacity !== '0'
  }

  /**
   * Create skip link for keyboard navigation
   */
  static createSkipLink(targetId: string, text: string): HTMLElement {
    const skipLink = document.createElement('a')
    skipLink.href = `#${targetId}`
    skipLink.textContent = text
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
    
    return skipLink
  }

  /**
   * Trap focus within a container
   */
  static trapFocus(container: HTMLElement): () => void {
    const focusableElements = this.getFocusableElements(container)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    
    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }
}

// Screen reader utilities
export class ScreenReaderUtils {
  /**
   * Announce content to screen readers
   */
  static announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcer = document.createElement('div')
    announcer.setAttribute('aria-live', priority)
    announcer.setAttribute('aria-atomic', 'true')
    announcer.className = 'sr-only'
    announcer.textContent = message

    document.body.appendChild(announcer)

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer)
    }, 1000)
  }

  /**
   * Create visually hidden text for screen readers
   */
  static createScreenReaderText(text: string): HTMLElement {
    const span = document.createElement('span')
    span.className = 'sr-only'
    span.textContent = text
    return span
  }

  /**
   * Update dynamic content for screen readers
   */
  static updateLiveRegion(regionId: string, content: string): void {
    const region = document.getElementById(regionId)
    if (region) {
      region.textContent = content
    }
  }
}

// Contrast ratio utilities
export class ContrastUtils {
  /**
   * Calculate contrast ratio between two colors
   */
  static calculateContrastRatio(color1: string, color2: string): number {
    const luminance1 = this.getLuminance(color1)
    const luminance2 = this.getLuminance(color2)
    
    const lighter = Math.max(luminance1, luminance2)
    const darker = Math.min(luminance1, luminance2)
    
    return (lighter + 0.05) / (darker + 0.05)
  }

  /**
   * Get relative luminance of a color
   */
  private static getLuminance(color: string): number {
    // Convert color to RGB values
    const rgb = this.hexToRgb(color)
    if (!rgb) return 0

    // Convert to relative luminance
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  /**
   * Convert hex color to RGB
   */
  private static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  /**
   * Check if contrast ratio meets WCAG standards
   */
  static meetsWCAGStandards(
    color1: string, 
    color2: string, 
    level: 'AA' | 'AAA' = 'AA',
    size: 'normal' | 'large' = 'normal'
  ): boolean {
    const ratio = this.calculateContrastRatio(color1, color2)
    
    if (level === 'AAA') {
      return size === 'large' ? ratio >= 4.5 : ratio >= 7
    } else {
      return size === 'large' ? ratio >= 3 : ratio >= 4.5
    }
  }
}

// Keyboard navigation utilities
export class KeyboardNavigation {
  /**
   * Handle arrow key navigation for timeline
   */
  static handleTimelineNavigation(
    event: KeyboardEvent, 
    currentIndex: number, 
    totalItems: number,
    onNavigate: (newIndex: number) => void
  ): void {
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        newIndex = (currentIndex + 1) % totalItems
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        newIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1
        break
      case 'Home':
        newIndex = 0
        break
      case 'End':
        newIndex = totalItems - 1
        break
      default:
        return
    }

    event.preventDefault()
    onNavigate(newIndex)
  }

  /**
   * Handle escape key for closing modals/dropdowns
   */
  static handleEscapeKey(event: KeyboardEvent, onEscape: () => void): void {
    if (event.key === 'Escape') {
      event.preventDefault()
      onEscape()
    }
  }

  /**
   * Handle enter/space for button activation
   */
  static handleButtonActivation(
    event: KeyboardEvent, 
    onActivate: () => void
  ): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onActivate()
    }
  }
}

// Accessibility validation utilities
export function validateAccessibility(features: AccessibilityFeatures): {
  isValid: boolean
  warnings: string[]
  errors: string[]
} {
  const warnings: string[] = []
  const errors: string[] = []

  // Check required features
  if (!features.ariaLabels || Object.keys(features.ariaLabels).length === 0) {
    errors.push('ARIA labels are required for screen reader support')
  }

  if (!features.focusManagement) {
    warnings.push('Focus management should be implemented for keyboard navigation')
  }

  if (!features.screenReaderSupport) {
    errors.push('Screen reader support is required for accessibility compliance')
  }

  if (!features.keyboardNavigation) {
    errors.push('Keyboard navigation is required for accessibility compliance')
  }

  if (!features.contrastCompliance) {
    errors.push('Color contrast compliance is required for WCAG standards')
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors
  }
}

// CSS classes for accessibility
export const accessibilityClasses = {
  // Screen reader only content
  srOnly: 'sr-only',
  
  // Focus indicators
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
  
  // Skip links
  skipLink: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded',
  
  // High contrast support
  highContrast: 'contrast-more:bg-white contrast-more:text-black contrast-more:border-black',
  
  // Reduced motion
  reducedMotion: 'motion-reduce:animate-none motion-reduce:transition-none'
} as const
