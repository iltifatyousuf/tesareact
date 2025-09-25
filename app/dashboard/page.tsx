// app/dashboard/page.tsx - Complete Premium Corporate Dashboard
'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  User as UserIcon,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  Brain,
  Globe,
  Shield,
  Activity,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Plus
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
  status: 'processing' | 'completed' | 'failed'
  uploadedAt: Date
  type: string
}

interface Activity {
  id: string
  type: 'upload' | 'chat' | 'translation' | 'analysis'
  title: string
  description: string
  timestamp: Date
  status: 'success' | 'pending' | 'error'
}

export default function DashboardPage() {
  const [stats] = useState<DashboardStats>({
    documentsProcessed: 1247,
    tokensUsed: 89432,
    conversationsStarted: 342,
    translationsCompleted: 856
  })

  const [showChat, setShowChat] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. I can help you analyze documents, translate content, and answer questions about your uploaded files. What would you like to work on today?',
      timestamp: new Date()
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Annual_Report_2024.pdf',
      size: 2480000,
      status: 'completed',
      uploadedAt: new Date(Date.now() - 3600000),
      type: 'pdf'
    },
    {
      id: '2',
      name: 'Legal_Contract_EN.docx',
      size: 1200000,
      status: 'completed',
      uploadedAt: new Date(Date.now() - 7200000),
      type: 'docx'
    },
    {
      id: '3',
      name: 'Marketing_Strategy.pptx',
      size: 5600000,
      status: 'processing',
      uploadedAt: new Date(Date.now() - 900000),
      type: 'pptx'
    }
  ])
  
  const [recentActivity] = useState<Activity[]>([
    {
      id: '1',
      type: 'upload',
      title: 'Document uploaded',
      description: 'Annual_Report_2024.pdf processed successfully',
      timestamp: new Date(Date.now() - 1800000),
      status: 'success'
    },
    {
      id: '2',
      type: 'translation',
      title: 'Translation completed',
      description: 'Legal contract translated to Spanish',
      timestamp: new Date(Date.now() - 3600000),
      status: 'success'
    },
    {
      id: '3',
      type: 'analysis',
      title: 'Document analysis',
      description: 'Key insights extracted from quarterly report',
      timestamp: new Date(Date.now() - 5400000),
      status: 'success'
    }
  ])

  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const statCards = [
    {
      title: 'Documents Processed',
      value: stats.documentsProcessed,
      icon: FileText,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
      change: '+12.5%',
      changeType: 'positive' as const,
      description: 'This month'
    },
    {
      title: 'AI Conversations',
      value: stats.conversationsStarted,
      icon: MessageSquare,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      change: '+8.2%',
      changeType: 'positive' as const,
      description: 'This month'
    },
    {
      title: 'Translations',
      value: stats.translationsCompleted,
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      change: '+15.3%',
      changeType: 'positive' as const,
      description: 'This month'
    },
    {
      title: 'Tokens Used',
      value: stats.tokensUsed,
      icon: Zap,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      change: '+5.1%',
      changeType: 'positive' as const,
      description: 'This month'
    }
  ]

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isTyping) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput.trim(),
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsTyping(true)

    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about "${userMessage.content}". Based on your uploaded documents, I can help you with detailed analysis, translation, or specific insights. Would you like me to analyze any particular document or extract specific information?`,
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: file.size,
          status: 'processing',
          uploadedAt: new Date(),
          type: file.type.split('/')[1] || 'unknown'
        }
        setUploadedFiles(prev => [...prev, newFile])
        
        setTimeout(() => {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === newFile.id 
                ? { ...f, status: 'completed' }
                : f
            )
          )
        }, 3000)
      })
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files && fileInputRef.current) {
      fileInputRef.current.files = files
      handleFileUpload({ target: { files } } as any)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const formatTimeAgo = (date: Date): string => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    
    if (diffHours > 24) return `${Math.floor(diffHours / 24)}d ago`
    if (diffHours > 0) return `${diffHours}h ago`
    if (diffMinutes > 0) return `${diffMinutes}m ago`
    return 'Just now'
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Premium Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">TesaReact</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>
              
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">U</span>
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-semibold text-gray-900">User</div>
                  <div className="text-xs text-gray-500">Pro Plan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your AI workspace today.</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowUpload(true)}
                className="flex items-center px-4 py-2.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl font-medium transition-all shadow-sm hover:shadow"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </button>
              <button
                onClick={() => setShowChat(true)}
                className="flex items-center px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Ask AI
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl border ${stat.borderColor} p-6 hover:shadow-lg transition-all duration-300 group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className={`text-xs font-semibold ${stat.color} bg-white px-2 py-1 rounded-full border ${stat.borderColor}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Files Section */}
          <div className="xl:col-span-2 space-y-6">
            {/* Recent Files */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Recent Documents</h2>
                      <p className="text-sm text-gray-500">{uploadedFiles.length} files</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {uploadedFiles.map((file, index) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900 truncate">{file.name}</p>
                            <div className={`w-2 h-2 rounded-full ${
                              file.status === 'completed' ? 'bg-emerald-500' :
                              file.status === 'processing' ? 'bg-amber-500 animate-pulse' :
                              'bg-red-500'
                            }`}></div>
                          </div>
                          <div className="flex items-center space-x-3 mt-1">
                            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                            <span className="text-gray-300">•</span>
                            <p className="text-sm text-gray-500">{formatTimeAgo(file.uploadedAt)}</p>
                            <span className="text-gray-300">•</span>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              file.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                              file.status === 'processing' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {file.status === 'completed' ? 'Ready' :
                               file.status === 'processing' ? 'Processing...' :
                               'Failed'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Analytics Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Usage Analytics</h2>
                    <p className="text-sm text-gray-500">Last 30 days</p>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { month: 'Week 1', documents: 85, chats: 142 },
                  { month: 'Week 2', documents: 92, chats: 156 },
                  { month: 'Week 3', documents: 78, chats: 134 },
                  { month: 'Week 4', documents: 95, chats: 167 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 text-sm font-medium text-gray-600">{item.month}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-violet-600">Documents</span>
                        <span className="font-medium">{item.documents}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(item.documents / 100) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-600">Chats</span>
                        <span className="font-medium">{item.chats}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-600 to-teal-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(item.chats / 170) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Activity Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowUpload(true)}
                  className="w-full flex items-center p-4 bg-gradient-to-r from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 border border-violet-200 rounded-xl transition-all group"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Upload Document</div>
                    <div className="text-sm text-gray-600">Process new files</div>
                  </div>
                </button>
                
                <button
                  onClick={() => setShowChat(true)}
                  className="w-full flex items-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200 rounded-xl transition-all group"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Start Chat</div>
                    <div className="text-sm text-gray-600">Ask AI questions</div>
                  </div>
                </button>
                
                <button className="w-full flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border border-blue-200 rounded-xl transition-all group">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">View Analytics</div>
                    <div className="text-sm text-gray-600">Usage insights</div>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <p className="text-sm text-gray-500">Last 24 hours</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.status === 'success' ? 'bg-emerald-100' :
                      activity.status === 'pending' ? 'bg-amber-100' :
                      'bg-red-100'
                    }`}>
                      {activity.status === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : activity.status === 'pending' ? (
                        <Clock className="w-4 h-4 text-amber-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                      <div className="text-xs text-gray-600 mt-1">{activity.description}</div>
                      <div className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.timestamp)}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {showUpload && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
              onClick={() => setShowUpload(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Upload Documents</h2>
                  <button
                    onClick={() => setShowUpload(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                    onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false) }}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
                      isDragOver 
                        ? 'border-violet-500 bg-violet-50' 
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-violet-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Drop files here or click to browse
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Support for PDF, DOCX, TXT, images and more
                    </p>
                    <div className="inline-flex items-center px-4 py-2 bg-violet-600 text-white rounded-lg font-medium">
                      Choose Files
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.txt,.jpg,.png,.pptx"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Modal */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
              onClick={() => setShowChat(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">AI Assistant</h2>
                      <p className="text-sm text-gray-500">Ask questions about your documents</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChat(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <AnimatePresence>
                    {chatMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`flex max-w-[80%] ${
                            message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.role === 'user'
                                ? 'ml-3 bg-gradient-to-br from-violet-600 to-purple-600'
                                : 'mr-3 bg-gradient-to-br from-emerald-600 to-teal-600'
                            }`}
                          >
                            {message.role === 'user' ? (
                              <UserIcon className="w-5 h-5 text-white" />
                            ) : (
                              <Bot className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div
                            className={`px-6 py-4 rounded-2xl shadow-sm ${
                              message.role === 'user'
                                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                                : 'bg-gray-50 text-gray-900 border border-gray-200'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <p className={`text-xs mt-2 ${
                              message.role === 'user' ? 'text-violet-100' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center mr-3">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-gray-50 border border-gray-200 px-6 py-4 rounded-2xl">
                          <div className="flex items-center space-x-1">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="border-t border-gray-200 p-6">
                  <div className="flex space-x-4">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      placeholder="Ask me anything about your documents..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      disabled={isTyping}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim() || isTyping}
                      className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
    }
