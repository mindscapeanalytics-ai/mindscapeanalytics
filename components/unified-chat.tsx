"use client"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageSquare, Bot, Send, X, Loader2, Maximize2, Minimize2, Brain } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  type?: "text" | "form"
}

type ChatStyle = "floating" | "sidebar"
type ChatTheme = "landing" | "dashboard"

interface UnifiedChatProps {
  initialStyle?: ChatStyle
  allowStyleToggle?: boolean
  theme?: ChatTheme
  embedded?: boolean
}

// Inline Lead Form Component for Chat
function ChatLeadForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: "Chat AI Lead",
          interest: "Consultation Request via AI Assistant"
        }),
      })

      if (response.ok) {
        toast({ title: "Request Sent!", description: "An expert will contact you soon." })
        onSuccess()
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to send request.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 bg-black/40 p-3 rounded-lg border border-red-500/20 mt-2">
      <Input
        placeholder="Full Name"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="h-8 text-xs bg-white/5 border-white/10"
      />
      <Input
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="h-8 text-xs bg-white/5 border-white/10"
      />
      <textarea
        placeholder="How can we help?"
        className="w-full h-16 p-2 text-xs bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-red-500/50"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />
      <Button size="sm" type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700 h-8 text-xs font-bold">
        {isSubmitting ? "Sending..." : "Connect with Expert"}
      </Button>
    </form>
  )
}

export default function UnifiedChat({
  initialStyle = "floating",
  allowStyleToggle = false,
  theme = "landing",
  embedded = false
}: UnifiedChatProps) {
  const [chatStyle, setChatStyle] = useState<ChatStyle>(initialStyle)
  const [isOpen, setIsOpen] = useState(embedded ? true : false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Mindscape AI Assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const triggerLeadForm = () => {
    const formMessage: Message = {
      id: Date.now().toString(),
      content: "I'd be happy to connect you with one of our AI experts. Please provide your details below:",
      role: "assistant",
      timestamp: new Date(),
      type: "form"
    }
    setMessages((prev) => [...prev, formMessage])
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Intent Detection
    const leadKeywords = ["pricing", "consultation", "expert", "contact", "talk to human", "sales", "demo", "cost"]
    const hasLeadIntent = leadKeywords.some(kw => input.toLowerCase().includes(kw))

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    if (hasLeadIntent) {
      setTimeout(triggerLeadForm, 500)
      return
    }

    setIsLoading(true)

    try {
      // Prepare messages array for API
      const apiMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Add the new user message
      apiMessages.push({
        role: "user",
        content: userMessage.content
      });

      // Call our API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chat API');
      }

      const data = await response.json();

      // Add assistant response
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: data.content,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Error in chat request:', error);

      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const toggleChatStyle = () => {
    setChatStyle(prev => prev === "floating" ? "sidebar" : "floating")
  }

  // Use dashboard styling
  const isDashboard = theme === "dashboard"

  // Apply different styling based on theme
  const getButtonBaseClass = () => {
    if (embedded) return ""
    if (isDashboard) {
      return `fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-md z-40 ${isOpen ? "bg-primary/90 hover:bg-primary/100" : "bg-primary hover:bg-primary/90"
        }`
    }
    return `fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 ${isOpen ? "bg-red-700 hover:bg-red-800" : "bg-red-600 hover:bg-red-700"
      }`
  }

  // Render the floating chat bubble style
  const renderFloatingChat = () => (
    <>
      {!embedded && (
        <Button
          onClick={() => setIsOpen(true)}
          className={getButtonBaseClass()}
          size="icon"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      )}

      <AnimatePresence>
        {(isOpen || embedded) && (
          <motion.div
            initial={embedded ? undefined : { opacity: 0, y: 20, scale: 0.9 }}
            animate={embedded ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={embedded ? undefined : { opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={embedded
              ? "w-full h-full flex flex-col overflow-hidden"
              : "fixed bottom-20 right-6 w-80 sm:w-96 h-96 bg-black border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col"
            }
          >
            {!embedded && (
              <div className={isDashboard
                ? "bg-primary p-3 flex items-center justify-between"
                : "bg-gradient-to-r from-red-600 to-red-500 p-3 flex items-center justify-between"
              }>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-white/20">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className={isDashboard ? "bg-primary-foreground" : "bg-red-700"}>
                      <Brain className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-white">Mindscape AI Assistant</h3>
                    <p className="text-xs text-white/70">Online | Powered by AI</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={triggerLeadForm}
                    className="h-7 px-2 text-[10px] text-white/70 hover:text-white border border-white/10 hover:bg-white/10 rounded-full"
                  >
                    Consult Expert
                  </Button>
                  {allowStyleToggle && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleChatStyle}
                      className="h-8 w-8 text-white/70 hover:text-white"
                    >
                      <Bot className="h-4 w-4" />
                    </Button>
                  )}
                  {!embedded && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 text-white/70 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${embedded ? "" : "bg-black/50 backdrop-blur-sm"}`}>
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${message.role === "user"
                      ? isDashboard ? "bg-primary text-primary-foreground" : "bg-red-600 text-white"
                      : embedded ? "bg-accent" : "bg-white/5 border border-white/10 text-white"
                      }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.type === "form" && (
                      <ChatLeadForm onSuccess={() => {
                        setMessages(prev => [...prev, {
                          id: Date.now().toString(),
                          content: "Thank you! We've received your request.",
                          role: "assistant",
                          timestamp: new Date()
                        }])
                      }} />
                    )}
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${embedded ? "bg-accent" : "bg-white/5 border border-white/10 text-white"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p className="text-sm">AI is thinking...</p>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className={`p-3 border-t ${embedded ? "border-border" : "border-white/10 bg-black/30 backdrop-blur-sm"}`}>
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  className={embedded ? "" : "bg-white/5 border-white/10 text-white"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  className={isDashboard ? "" : "bg-red-600 hover:bg-red-700 text-white"}
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {!embedded && (
                <p className="text-xs text-white/50 mt-2 text-center">
                  Powered by Mindscape AI |{" "}
                  <a href="#" className="underline">
                    Privacy Policy
                  </a>
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )

  // Render the sidebar chat style
  const renderSidebarChat = () => (
    <>
      {!embedded && (
        <Button
          onClick={() => setIsOpen(true)}
          className={getButtonBaseClass()}
          size="icon"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      <AnimatePresence>
        {(isOpen || embedded) && (
          <motion.div
            initial={embedded ? undefined : { opacity: 0, y: 20 }}
            animate={embedded ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={embedded ? undefined : { opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={embedded
              ? "w-full h-full flex flex-col overflow-hidden"
              : `fixed ${isExpanded ? "inset-4 md:inset-10" : "bottom-6 right-6 w-80 md:w-96 h-[500px]"} z-50`
            }
          >
            <Card className="h-full flex flex-col bg-black/90 backdrop-blur-lg border border-white/10 shadow-xl overflow-hidden">
              <CardHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className={isDashboard ? "bg-primary" : "bg-red-600"}>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Mindscape AI Assistant</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-white/70">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={triggerLeadForm}
                    className="h-7 px-2 text-[10px] text-white/70 hover:text-white border border-white/10 hover:bg-white/10 rounded-full"
                  >
                    Consult Expert
                  </Button>
                  {allowStyleToggle && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleChatStyle}
                      className="h-8 w-8 text-white/70 hover:text-white"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  )}
                  {!embedded && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleExpand}
                        className="h-8 w-8 text-white/70 hover:text-white"
                      >
                        {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="h-8 w-8 text-white/70 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${message.role === "user"
                        ? isDashboard ? "bg-primary text-primary-foreground" : "bg-red-600 text-white"
                        : "bg-white/10 text-white"
                        }`}
                    >
                      <p>{message.content}</p>
                      {message.type === "form" && (
                        <ChatLeadForm onSuccess={() => {
                          setMessages(prev => [...prev, {
                            id: Date.now().toString(),
                            content: "Thank you! We've received your request.",
                            role: "assistant",
                            timestamp: new Date()
                          }])
                        }} />
                      )}
                      <div className="text-xs mt-1 opacity-70 text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-white/10 text-white">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              <CardFooter className="p-4 border-t border-white/10">
                <div className="flex items-center gap-2 w-full">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-white/5 border-white/10"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                    className={isDashboard ? "" : "bg-red-600 hover:bg-red-700 text-white"}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )

  return chatStyle === "floating" ? renderFloatingChat() : renderSidebarChat()
} 