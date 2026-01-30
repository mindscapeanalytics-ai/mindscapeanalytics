'use client'

import React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ReactNode
    onReset?: () => void
}

interface ErrorBoundaryState {
    hasError: boolean
    error?: Error
}

/**
 * Error boundary for graceful degradation of dynamic components
 * Prevents entire page crash if a section fails to load
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log to error reporting service in production
        console.error('Error caught by boundary:', error, errorInfo)
    }

    handleReset = () => {
        this.setState({ hasError: false, error: undefined })
        this.props.onReset?.()
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="w-full min-h-[400px] flex items-center justify-center bg-black/20 rounded-lg border border-white/10 my-8">
                    <div className="text-center p-6 max-w-md">
                        <AlertCircle className="w-12 h-12 text-red-500/50 mx-auto mb-4" />
                        <h3 className="text-white/80 text-lg font-semibold mb-2">
                            Something went wrong
                        </h3>
                        <p className="text-white/60 text-sm mb-6">
                            This section couldn't load properly. Please try refreshing the page.
                        </p>
                        <button
                            onClick={this.handleReset}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

/**
 * Functional wrapper for error boundary with hooks support
 */
export function withErrorBoundary<P extends object>(
    Component: React.ComponentType<P>,
    fallback?: React.ReactNode
) {
    return function WithErrorBoundary(props: P) {
        return (
            <ErrorBoundary fallback={fallback}>
                <Component {...props} />
            </ErrorBoundary>
        )
    }
}
