/**
 * Enhanced Typography System
 * 
 * Provides utilities for responsive typography, accessibility compliance,
 * and consistent spacing across the hero section.
 */

import { TypographyConfig, ResponsiveScale } from "@/types/hero-enhancement"

// Typography utility functions
export class TypographySystem {
  private config: TypographyConfig

  constructor(config: TypographyConfig) {
    this.config = config
  }

  /**
   * Generate responsive font size classes
   */
  getResponsiveFontSize(): string {
    const { fontSize } = this.config.headlineStyles
    return `${fontSize.mobile} sm:${fontSize.tablet} lg:${fontSize.desktop}`
  }

  /**
   * Generate line height styles
   */
  getLineHeightStyles(): React.CSSProperties {
    return {
      lineHeight: this.config.headlineStyles.lineHeight
    }
  }

  /**
   * Generate text shadow styles if enabled
   */
  getTextShadowStyles(): React.CSSProperties {
    if (!this.config.textShadow.enabled) return {}
    
    return {
      textShadow: `0 2px 4px ${this.config.textShadow.color}`
    }
  }

  /**
   * Generate gradient text classes with fallback
   */
  getGradientTextClasses(gradientIndex: number = 0): {
    className: string
    style: React.CSSProperties
  } {
    const gradient = this.config.gradientText.colors[gradientIndex] || this.config.gradientText.colors[0]
    
    return {
      className: `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`,
      style: {
        color: this.config.gradientText.fallbackColor // Fallback for accessibility
      }
    }
  }

  /**
   * Validate contrast ratio for accessibility
   */
  validateContrastRatio(backgroundColor: string, textColor: string): boolean {
    // Simplified contrast ratio check - in production, use a proper color contrast library
    const bgLuminance = this.getLuminance(backgroundColor)
    const textLuminance = this.getLuminance(textColor)
    
    const contrast = (Math.max(bgLuminance, textLuminance) + 0.05) / 
                    (Math.min(bgLuminance, textLuminance) + 0.05)
    
    return contrast >= this.config.gradientText.contrastRatio
  }

  /**
   * Calculate relative luminance (simplified)
   */
  private getLuminance(color: string): number {
    // Simplified luminance calculation
    // In production, use a proper color library like chroma-js
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16) / 255
    const g = parseInt(hex.substr(2, 2), 16) / 255
    const b = parseInt(hex.substr(4, 2), 16) / 255
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  /**
   * Generate focus indicator styles
   */
  getFocusStyles(): string {
    return "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
  }

  /**
   * Generate spacing classes for consistent hierarchy with compact spacing
   */
  getSpacingClasses(): {
    badgeSpacing: string
    headlineSpacing: string
    descriptionSpacing: string
    ctaSpacing: string
  } {
    return {
      badgeSpacing: "mb-4", // Reduced from mb-6
      headlineSpacing: "mb-4", // Reduced from mb-6
      descriptionSpacing: "mb-6", // Reduced from mb-8
      ctaSpacing: "pt-1" // Reduced from pt-2
    }
  }
}

// Typography hooks for React components
export function useTypography(config?: Partial<TypographyConfig>) {
  const defaultConfig: TypographyConfig = {
    headlineStyles: {
      fontSize: {
        mobile: "text-2xl md:text-3xl",
        tablet: "text-4xl lg:text-5xl",
        desktop: "text-5xl xl:text-6xl"
      },
      lineHeight: 1.1,
      letterSpacing: "tracking-tight",
      fontWeight: 900
    },
    gradientText: {
      colors: [
        "from-red-400 via-red-500 to-red-600",
        "from-blue-400 via-blue-500 to-blue-600"
      ],
      fallbackColor: "#ef4444",
      contrastRatio: 4.5
    },
    textShadow: {
      enabled: true,
      color: "rgba(0, 0, 0, 0.5)",
      blur: "2px"
    }
  }

  const mergedConfig = {
    ...defaultConfig,
    ...config,
    headlineStyles: {
      ...defaultConfig.headlineStyles,
      ...config?.headlineStyles
    },
    gradientText: {
      ...defaultConfig.gradientText,
      ...config?.gradientText
    },
    textShadow: {
      ...defaultConfig.textShadow,
      ...config?.textShadow
    }
  }

  const typography = new TypographySystem(mergedConfig)

  return {
    typography,
    config: mergedConfig,
    getResponsiveFontSize: () => typography.getResponsiveFontSize(),
    getLineHeightStyles: () => typography.getLineHeightStyles(),
    getTextShadowStyles: () => typography.getTextShadowStyles(),
    getGradientTextClasses: (index?: number) => typography.getGradientTextClasses(index),
    getFocusStyles: () => typography.getFocusStyles(),
    getSpacingClasses: () => typography.getSpacingClasses()
  }
}

// Responsive breakpoint utilities
export const breakpoints = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)'
} as const

// Typography validation utilities
export function validateTypographyConfig(config: TypographyConfig): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Validate line height
  if (config.headlineStyles.lineHeight < 1.1) {
    errors.push('Line height should be at least 1.1 for accessibility')
  }

  // Validate contrast ratio
  if (config.gradientText.contrastRatio < 4.5) {
    errors.push('Contrast ratio should be at least 4.5 for WCAG AA compliance')
  }

  // Validate font sizes
  const fontSizes = Object.values(config.headlineStyles.fontSize)
  if (fontSizes.some(size => !size.includes('text-'))) {
    errors.push('Font sizes should use Tailwind text- classes')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// CSS custom properties for dynamic typography
export function generateTypographyCSS(config: TypographyConfig): string {
  return `
    :root {
      --hero-line-height: ${config.headlineStyles.lineHeight};
      --hero-letter-spacing: ${config.headlineStyles.letterSpacing};
      --hero-font-weight: ${config.headlineStyles.fontWeight};
      --hero-text-shadow: ${config.textShadow.enabled ? `0 2px 4px ${config.textShadow.color}` : 'none'};
      --hero-fallback-color: ${config.gradientText.fallbackColor};
    }

    .hero-headline {
      line-height: var(--hero-line-height);
      letter-spacing: var(--hero-letter-spacing);
      font-weight: var(--hero-font-weight);
      text-shadow: var(--hero-text-shadow);
    }

    .hero-gradient-text {
      color: var(--hero-fallback-color);
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .hero-gradient-text {
        background: none !important;
        color: #ffffff !important;
        -webkit-background-clip: unset !important;
        background-clip: unset !important;
      }
      
      .hero-headline {
        text-shadow: none;
        font-weight: 700;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .hero-gradient-text {
        background-attachment: fixed;
      }
    }
  `
}