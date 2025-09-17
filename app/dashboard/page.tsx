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

interface DashboardStats {
  documentsProcessed: number
  tokensUsed: number
  conversationsStarted: number
  translationsCompleted: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    documentsProcessed: 12,
    tokensUsed: 2450,
    conversationsStarted: 8,
    translationsCompleted: 7
  })
  const [showChat, setShowChat] = useState(false)

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome to TesaReact
              </h1>
              <p className="text-gray-600 mt-2">
                Your AI workspace dashboard
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button onClick={() => setShowChat(!showChat)}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
            </div>
          </motion.div>
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-blue-600" />
                  Upload Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UploadZone 
                  onFilesUploaded={(files) => {
                    console.log('Files uploaded:', files)
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No recent activity</p>
                  <p className="text-sm text-gray-400">Start by uploading a document</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AnalyticsChart title="Usage Analytics" showControls={true} />
        </motion.div>

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
                <Button variant="outline" onClick={() => setShowChat(false)}>
                  Close
                </Button>
              </div>
              <div className="flex-1">
                <ChatInterface />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
