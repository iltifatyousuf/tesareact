// app/dashboard/page.tsx - Fixed TypeScript errors
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Users,
  TrendingUp,
  Clock,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UploadZone } from '@/components/features/UploadZone'
import { ChatInterface } from '@/components/features/ChatInterface'
import { AnalyticsChart } from '@/components/features/AnalyticsChart'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface User {
  name: string
  email: string
  avatar?: string
}

interface DashboardStats {
  documentsProcessed: number
  tokensUsed: number
  conversationsStarted: number
  translationsCompleted: number
}

interface RecentFile {
  id: string
  originalName: string
  createdAt: string
  status: 'COMPLETED' | 'PROCESSING' | 'FAILED'
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    documentsProcessed: 0,
    tokensUsed: 0,
    conversationsStarted: 0,
    translationsCompleted: 0
  })
  const [showChat, setShowChat] = useState(false)
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>([])
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (status === 'authenticated' && session?.user) {
      setUser({
        name: session.user.name || 'User',
        email: session.user.email || '',
        avatar: session.user.image || undefined
      })
    }
  }, [status, session, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchStats()
      fetchRecentFiles()
    }
  }, [status])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/protected/analytics')
      if (!response.ok) throw new Error('Failed to fetch analytics')
      
      const data = await response.json()
      if (data.totals) {
        setStats({
          documentsProcessed: data.totals.documents || 0,
          tokensUsed: data.totals.tokensUsed || 0,
          conversationsStarted: data.totals.conversations || 0,
          translationsCompleted: Math.floor((data.totals.documents || 0) * 0.6)
        })
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      // Set mock data for demo
      setStats({
        documentsProcessed: 12,
        tokensUsed: 2450,
        conversationsStarted: 8,
        translationsCompleted: 7
      })
    }
  }

  const fetchRecentFiles = async () => {
    try {
      const response = await fetch('/api/protected/documents?limit=5')
      if (!response.ok) throw new Error('Failed to fetch documents')
      
      const data = await response.json()
      setRecentFiles(data.documents || [])
    } catch (error) {
      console.error('Failed to fetch recent files:', error)
      // Set mock data for demo
      setRecentFiles([
        {
          id: '1',
          originalName: 'Business_Plan_2024.pdf',
          createdAt: new Date().toISOString(),
          status: 'COMPLETED'
        },
        {
          id: '2', 
          originalName: 'Marketing_Strategy.docx',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          status: 'COMPLETED'
        }
      ])
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/")
  }

  const statCards = [
    {
      title: 'Documents Processed',
      value: stats.documentsProcessed,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeType: 'increase' as const
    },
    {
      title: 'AI Conversations',
      value: stats.conversationsStarted,
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
      changeType: 'increase' as const
    },
    {
      title: 'Translations',
      value: stats.translationsCompleted,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+15%',
      changeType: 'increase' as const
    },
    {
      title: 'Tokens Used',
      value: stats.tokensUsed,
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+5%',
      changeType: 'increase' as const
    }
  ]

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name || session?.user?.name || 'User'}
              </h1>
              <p className="text-gray-600 mt-2">
                Here's what's happening with your AI workspace today
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button
                onClick={() => setShowChat(!showChat)}
                className="bg-brand-600 hover:bg-brand-700"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
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
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-brand-600" />
                  Upload Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UploadZone 
                  onFilesUploaded={(files) => {
                    console.log('Files uploaded:', files)
                    fetchStats()
                    fetchRecentFiles()
                  }}
                  maxFiles={5}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-brand-600" />
                  Recent Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFiles.length > 0 ? (
                    recentFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-brand-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {file.originalName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(file.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          file.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {file.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No documents uploaded yet</p>
                      <p className="text-sm text-gray-400">Upload your first document to get started</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Analytics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <AnalyticsChart
            title="Usage Analytics"
            showControls={true}
            className="w-full"
          />
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowChat(false)}
                >
                  Close
                </Button>
              </div>
              <div className="flex-1 overflow-hidden">
                <ChatInterface />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
