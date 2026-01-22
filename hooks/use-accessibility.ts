/**
 * Accessibility Hook for Hero Section Enhancement
 * 
 * Provides accessibility features including focus management,
 * keyboard navigation, and screen reader support.
 */

import { useEffect, useRef, useCallback } from 'react'
import { 
  FocusManager, 
  ScreenReaderUtils, 
  KeyboardNavigation,
  ariaLabels 
} from '@/lib/accessibility-utils'

interface UseAccessibilityOptions {
  enableFocusTrap?: boolean
  enableSkipLinks?: boolean
  announceChanges?: boolean
  keyboardNavigation?: boolean
}

export function useAccessibility(options: UseAccessibilityOptions = {}) {
  const {
    enableFocusTrap = false,
    enableSkipLinks = true,
    announceChanges = true,
    keyboardNavigation = true
  } = options

  const containerRef = useRef<HTMLDivElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  // Setup focus management
  useEffect(() => {
    if (!containerRef.current || !enableFocusTrap) return

    const cleanup = FocusManager.trapFocus(containerRef.current)
    cleanupRef.current = cleanup

    return cleanup
  }, [enableFocusTrap])

  // Setup skip links
  useEffect(() => {
    if (!enableSkipLinks) return

    const skipLink = FocusManager.createSkipLink('hero-content', 'Skip to main content')
    document.body.insertBefore(skipLink, document.body.firstChild)

    return () => {
      if (document.body.contains(skipLink)) {
        document.body.removeChild(skipLink)
      }
    }
  }, [enableSkipLinks])

  // Announce content changes
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announceChanges) {
      ScreenReaderUtils.announce(message, priority)
    }
  }, [announceChanges])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!keyboardNavigation) return

    // Handle escape key
    if (event.key === 'Escape') {
      const activeElement = document.activeElement as HTMLElement
      activeElement?.blur()
    }

    // Handle tab navigation enhancement
    if (event.key === 'Tab' && containerRef.current) {
      const focusableElements = FocusManager.getFocusableElements(containerRef.current)
      
      if (focusableElements.length === 0) return

      const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)
      
      if (event.shiftKey) {
        // Shift + Tab (backward)
        if (currentIndex <= 0) {
          event.preventDefault()
          focusableElements[focusableElements.length - 1]?.focus()
        }
      } else {
        // Tab (forward)
        if (currentIndex >= focusableElements.length - 1) {
          event.preventDefault()
          focusableElements[0]?.focus()
        }
      }
    }
  }, [keyboardNavigation])

  // Setup keyboard event listeners
  useEffect(() => {
    if (!keyboardNavigation) return

    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, keyboardNavigation])

  // Timeline navigation handler
  const handleTimelineNavigation = useCallback((
    event: KeyboardEvent,
    currentIndex: number,
    totalItems: number,
    onNavigate: (newIndex: number) => void
  ) => {
    KeyboardNavigation.handleTimelineNavigation(event, currentIndex, totalItems, onNavigate)
  }, [])

  // Button activation handler
  const handleButtonActivation = useCallback((
    event: KeyboardEvent,
    onActivate: () => void
  ) => {
    KeyboardNavigation.handleButtonActivation(event, onActivate)
  }, [])

  // Focus management utilities
  const focusFirst = useCallback(() => {
    if (!containerRef.current) return
    
    const focusableElements = FocusManager.getFocusableElements(containerRef.current)
    focusableElements[0]?.focus()
  }, [])

  const focusLast = useCallback(() => {
    if (!containerRef.current) return
    
    const focusableElements = FocusManager.getFocusableElements(containerRef.current)
    focusableElements[focusableElements.length - 1]?.focus()
  }, [])

  // Screen reader utilities
  const updateLiveRegion = useCallback((regionId: string, content: string) => {
    ScreenReaderUtils.updateLiveRegion(regionId, content)
  }, [])

  const createScreenReaderText = useCallback((text: string) => {
    return ScreenReaderUtils.createScreenReaderText(text)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [])

  return {
    // Refs
    containerRef,
    
    // ARIA labels
    ariaLabels,
    
    // Announcement functions
    announce,
    updateLiveRegion,
    createScreenReaderText,
    
    // Navigation handlers
    handleTimelineNavigation,
    handleButtonActivation,
    
    // Focus management
    focusFirst,
    focusLast,
    
    // Utility functions
    getFocusableElements: () => 
      containerRef.current ? FocusManager.getFocusableElements(containerRef.current) : []
  }
}

// Specialized hook for timeline accessibility
export function useTimelineAccessibility(items: any[], currentIndex: number = 0) {
  const { announce, handleTimelineNavigation } = useAccessibility()

  const navigateToItem = useCallback((newIndex: number) => {
    if (newIndex >= 0 && newIndex < items.length) {
      const item = items[newIndex]
      announce(`Navigated to ${item.title}: ${item.status}`)
    }
  }, [items, announce])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    handleTimelineNavigation(event, currentIndex, items.length, navigateToItem)
  }, [handleTimelineNavigation, currentIndex, items.length, navigateToItem])

  return {
    handleKeyDown,
    navigateToItem,
    announce
  }
}

// Specialized hook for mobile showcase accessibility
export function useMobileShowcaseAccessibility() {
  const { announce, handleButtonActivation } = useAccessibility()

  const announceCardExpansion = useCallback((title: string, isExpanded: boolean) => {
    announce(`${title} ${isExpanded ? 'expanded' : 'collapsed'}`)
  }, [announce])

  const handleCardActivation = useCallback((
    event: KeyboardEvent,
    title: string,
    onToggle: () => void
  ) => {
    handleButtonActivation(event, () => {
      onToggle()
      announceCardExpansion(title, true) // Assume expansion for simplicity
    })
  }, [handleButtonActivation, announceCardExpansion])

  return {
    announceCardExpansion,
    handleCardActivation,
    announce
  }
}