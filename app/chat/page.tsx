// app/chat/page.tsx - FIXED VERSION
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, Upload, Loader2, Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Navigation } from '@/components/layout/Navigation'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m TesaReact AI, your intelligent document processing assistant. I can help you analyze documents, translate text, answer questions, and provide insights. What would you like to work on today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // FIXED: Added missing 'id' property
  const [user] = useState({ 
    id: 'demo-user-1',
    name: 'CEO Iltifat Nath', 
    email: 'iltifaatyousuf@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
    } catch (err) {
      console.error('Failed to copy message:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onLogout={() => {}} />
      
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-screen flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-xl border border-purple-200/30 rounded-full px-6 py-2 mb-4">
                <Bot className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">AI Assistant</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, CEO Iltifat Nath! 👑</h1>
              <p className="text-gray-600">
                Your intelligent AI assistant for document processing and analysis
              </p>
            </div>
          </motion.div>

          {/* Chat Container */}
          <Card className="flex-1 flex flex-col overflow-hidden card-premium">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-premium">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex group ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex max-w-3xl ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                        message.role === 'user'
                          ? 'ml-3 bg-gradient-to-br from-purple-500 to-pink-600'
                          : 'mr-3 bg-gradient-to-br from-emerald-500 to-teal-600'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`px-6 py-4 rounded-2xl shadow-lg relative group transition-all duration-300 hover:shadow-xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-sm'
                          : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm hover-glow'
                      }`}
                    >
                      <div className="prose prose-sm max-w-none">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap mb-2">
                          {message.content}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <p
                          className={`text-xs ${
                            message.role === 'user' ? 'text-purple-100' : 'text-gray-500'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>

                        {/* Message actions */}
                        {message.role === 'assistant' && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2">
                            <button
                              onClick={() => copyMessage(message.content)}
                              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Copy message"
                            >
                              <Copy className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                            </button>
                            <button
                              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Good response"
                            >
                              <ThumbsUp className="w-3 h-3 text-gray-400 hover:text-green-600" />
                            </button>
                            <button
                              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Bad response"
                            >
                              <ThumbsDown className="w-3 h-3 text-gray-400 hover:text-red-600" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mr-3 shadow-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 px-6 py-4 rounded-2xl rounded-bl-sm shadow-lg">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-purple-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-purple-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-purple-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-6">
              <div className="flex items-end space-x-4 max-w-4xl mx-auto">
                <Button
                  variant="outline"
                  size="icon"
                  className="mb-1 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                  title="Upload file"
                >
                  <Upload className="w-4 h-4" />
                </Button>

                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about document processing, translation, or analysis..."
                    className="pr-14 min-h-[48px] py-3 border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-2xl text-sm"
                    disabled={isLoading}
                  />
                  {input.trim() && (
                    <Button
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={isLoading}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-9 px-4 rounded-xl"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Quick suggestions */}
              <div className="mt-4 max-w-4xl mx-auto">
                <p className="text-sm text-gray-600 mb-3">💡 Try these commands:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Analyze a business document",
                    "Translate to Hindi",
                    "Summarize key insights",
                    "Create a financial report",
                    "Extract data from PDF"
                  ].map((suggestion) => (
                    <motion.button
                      key={suggestion}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setInput(suggestion)}
                      className="px-4 py-2 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors border border-purple-200 hover:border-purple-300"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
      
