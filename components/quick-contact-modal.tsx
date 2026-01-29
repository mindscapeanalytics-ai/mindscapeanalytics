"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CheckCircle2, Loader2, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const quickFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

interface QuickContactModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: string
    description?: string
    defaultMessage?: string
}
export function QuickContactModal({
    open,
    onOpenChange,
    title = "Quick Contact",
    description = "Send us a message and we'll get back to you shortly.",
    defaultMessage = ""
}: QuickContactModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof quickFormSchema>>({
        resolver: zodResolver(quickFormSchema),
        defaultValues: {
            name: "",
            email: "",
            message: defaultMessage,
        },
    })

    async function onSubmit(values: z.infer<typeof quickFormSchema>) {
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    subject: "Quick Contact Form",
                    interest: "quick-contact",
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to send message. Please try again.')
            }

            setIsSubmitting(false)
            setIsSuccess(true)

            toast({
                title: "Message sent successfully!",
                description: "We'll get back to you as soon as possible.",
            })

            // Reset form and close modal after 2 seconds
            setTimeout(() => {
                form.reset()
                setIsSuccess(false)
                onOpenChange(false)
            }, 2000)
        } catch (error) {
            console.error('Error submitting form:', error)
            setIsSubmitting(false)

            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[380px] bg-zinc-950 border-white/10 text-white p-5">
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
                    <DialogDescription className="text-red-400 text-xs">
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="flex flex-col items-center justify-center py-6"
                            >
                                <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center mb-3">
                                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                                </div>
                                <h3 className="text-base font-bold mb-1 text-white">Message Sent!</h3>
                                <p className="text-red-400 text-center text-xs">
                                    Thank you for reaching out. We'll get back to you shortly.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <FormLabel className="text-[10px] uppercase tracking-wider text-red-400 font-semibold">Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Your name"
                                                            className="bg-zinc-900/80 border-white/10 focus:border-red-500/50 focus:ring-red-500/20 h-8 text-sm transition-all placeholder:text-zinc-600"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-[10px]" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <FormLabel className="text-[10px] uppercase tracking-wider text-red-400 font-semibold">Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="your@email.com"
                                                            className="bg-zinc-900/80 border-white/10 focus:border-red-500/50 focus:ring-red-500/20 h-8 text-sm transition-all placeholder:text-zinc-600"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-[10px]" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <FormLabel className="text-[10px] uppercase tracking-wider text-red-400 font-semibold">Message</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="How can we help you?"
                                                            className="bg-zinc-900/80 border-white/10 focus:border-red-500/50 focus:ring-red-500/20 min-h-[70px] resize-none transition-all placeholder:text-zinc-600 text-sm"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-[10px]" />
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold h-8 text-xs rounded-md shadow-lg shadow-red-900/20 transition-all active:scale-[0.98] mt-3"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-1.5 h-3 w-3" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </Form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    )
}
