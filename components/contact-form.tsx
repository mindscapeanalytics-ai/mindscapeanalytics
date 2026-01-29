"use client"

import { useState, useEffect, Suspense } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CheckCircle2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSearchParams } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  interest: z.string().min(1, { message: "Please select an area of interest." }),
})

function ContactFormContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: searchParams?.get("subject") || "",
      message: "",
      interest: searchParams?.get("interest") || "",
    },
  })

  // Update form values when URL parameters change
  useEffect(() => {
    if (searchParams) {
      const interest = searchParams.get("interest")
      const subject = searchParams.get("subject")

      if (interest) {
        form.setValue("interest", interest)
      }

      if (subject) {
        form.setValue("subject", subject)
      }
    }
  }, [searchParams, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
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

      // Reset form after 3 seconds
      setTimeout(() => {
        form.reset()
        setIsSuccess(false)
      }, 3000)
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
    <div className="relative">
      {isSuccess && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/95 backdrop-blur-md rounded-lg z-20 border border-green-500/20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Message Sent!</h3>
            <p className="text-red-400 text-center max-w-xs text-sm">
              Thank you for reaching out. We'll get back to you shortly.
            </p>
          </motion.div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs uppercase tracking-wider text-red-400 font-semibold ml-1">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      className="bg-zinc-900/80 border-white/10 focus:border-red-500/50 focus:ring-red-500/20 h-10 transition-all placeholder:text-zinc-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs uppercase tracking-wider text-red-400 font-semibold ml-1">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      className="bg-zinc-900/80 border-white/10 focus:border-red-500/50 focus:ring-red-500/20 h-10 transition-all placeholder:text-zinc-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs uppercase tracking-wider text-red-400 font-semibold ml-1">Company</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Company"
                      className="bg-zinc-900/80 border-white/10 focus:border-red-500/50 focus:ring-red-500/20 h-10 transition-all placeholder:text-zinc-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs uppercase tracking-wider text-red-400 font-semibold ml-1">Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+1 (555) 000-0000"
                      className="bg-zinc-900/80 border-white/10 focus:border-red-500/50 focus:ring-red-500/20 h-10 transition-all placeholder:text-zinc-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs uppercase tracking-wider text-red-400 font-semibold ml-1">Interest</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-900/80 border-white/10 focus:border-red-500/50 focus:ring-red-500/20 h-10 text-zinc-300">
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                      <SelectItem value="demo">Live Demo Request</SelectItem>
                      <SelectItem value="ai-analytics">AI Analytics Platform</SelectItem>
                      <SelectItem value="computer-vision">Computer Vision</SelectItem>
                      <SelectItem value="nlp">Natural Language Processing</SelectItem>
                      <SelectItem value="ml">Machine Learning Models</SelectItem>
                      <SelectItem value="custom">Custom AI Solutions</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs uppercase tracking-wider text-red-400 font-semibold ml-1">Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="How can we help?"
                      className="bg-zinc-900/80 border-white/10 focus:border-red-500/50 focus:ring-red-500/20 h-10 transition-all placeholder:text-zinc-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs uppercase tracking-wider text-red-400 font-semibold ml-1">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project requirements..."
                    className="bg-zinc-900/80 border-white/10 focus:border-red-500/50 focus:ring-red-500/20 min-h-[100px] resize-none transition-all placeholder:text-zinc-600"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold tracking-wide h-11 rounded-md shadow-lg shadow-red-900/20 transition-all active:scale-[0.98] mt-2 border border-red-500/20"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-red-600" />
    </div>}>
      <ContactFormContent />
    </Suspense>
  )
}

