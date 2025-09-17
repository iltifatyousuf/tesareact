// app/dashboard/page.tsx - Working version with no external dependencies
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Users,
  TrendingUp,
  Clock,
  Zap,
  Send,
  X,
  Bot,
  User as UserIcon
} from 'lucide-react'

interface DashboardStats {
  documentsProcessed: number
  tokensUsed: number
  conversationsStarted: number
  translationsCompleted: number
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface UploadedFile {
  id: string
  name: string
  size: number
}

export default function DashboardPage() {
  const [stats] = useState<DashboardStats>({
    documentsProcessed: 12,
    tokensUsed: 2450,
    conversationsStarted: 8,
    translationsCompleted: 7
  })

  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const statCards = [
    {
      title: 'Documents Processed',
      value: stats.documentsProcessed,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%'
    },
    {
      title: 'AI Conversations',
      value: stats.conversationsStarted,
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%'
    },
    {
      title: 'Translations',
      value: stats.translationsCompleted,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+15%'
    },
    {
      title: 'Tokens Used',
      value: stats.tokensUsed,
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+5%'
    }
  ]

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput.trim(),
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you said: "${userMessage.content}". This is a demo response. In production, this would connect to an AI service.`,
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, aiMessage])
    }, 1000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: file.size
        }
        setUploadedFiles(prev => [...prev, newFile])
      })
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files) {
      Array.from(files).forEach(file => {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: file.size
        }
        setUploadedFiles(prev => [...prev, newFile])
      })
    }
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Your AI workspace</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => setShowChat(!showChat)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Chat
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600 font-medium">
                      {stat.change} from last month
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Upload Zone */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex items-center mb-6">
              <Upload className="w-5 h-5 mr-2 text-blue-600" />
              <h2 className="text-xl font-semibold">Upload Documents</h2>
            </div>
            
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false) }}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload your documents
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop files or click to browse
              </p>
              <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer inline-block transition-colors">
                Choose Files
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                />
              </label>
            </div>

            {/* File List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6 space-y-2">
                <h4 className="font-medium text-gray-900">Uploaded Files</h4>
                {uploadedFiles.map(file => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex items-center mb-6">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </div>
            
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No recent activity</p>
              <p className="text-sm text-gray-400">Start by uploading a document</p>
            </div>
          </motion.div>
        </div>

        {/* Analytics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border p-6"
        >
          <div className="flex items-center mb-6">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            <h2 className="text-xl font-semibold">Usage Analytics</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { month: 'Jan', value: 45 },
              { month: 'Feb', value: 52 },
              { month: 'Mar', value: 61 },
              { month: 'Apr', value: 68 },
              { month: 'May', value: 75 },
              { month: 'Jun', value: 82 }
            ].map((item) => (
              <div key={item.month} className="flex items-center space-x-4">
                <div className="w-12 text-sm text-gray-600">{item.month}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(item.value / 82) * 100}%` }}
                  />
                </div>
                <div className="w-12 text-sm text-gray-900 text-right">{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Chat Interface Modal */}
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowChat(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold">AI Assistant</h2>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex max-w-[70%] ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user'
                            ? 'ml-2 bg-blue-600'
                            : 'mr-2 bg-gray-600'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <UserIcon className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
                }
