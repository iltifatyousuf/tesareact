// app/page.tsx - Fixed TypeScript errors
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Brain, 
  FileText, 
  Languages, 
  MessageSquare, 
  BarChart3, 
  Upload,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Play,
  ChevronDown,
  CheckCircle,
  Star
} from 'lucide-react'

interface User {
  name: string
  email: string
}

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Processing',
    description: 'Advanced machine learning algorithms for document analysis and intelligent insights',
    color: 'from-purple-500 to-pink-500',
    delay: 0.1
  },
  {
    icon: Languages,
    title: 'Multi-Language Translation',
    description: 'Support for 100+ languages with context-aware, professional translations',
    color: 'from-blue-500 to-cyan-500',
    delay: 0.2
  },
  {
    icon: MessageSquare,
    title: 'Intelligent Chat Assistant',
    description: 'Conversational AI that understands your documents and provides contextual answers',
    color: 'from-green-500 to-emerald-500',
    delay: 0.3
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Deep insights and interactive visualizations from your document data',
    color: 'from-orange-500 to-red-500',
    delay: 0.4
  },
  {
    icon: Upload,
    title: 'Multi-Format Support',
    description: 'PDF, DOCX, TXT, images and more - we handle all major document formats',
    color: 'from-indigo-500 to-purple-500',
    delay: 0.5
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance with international security standards',
    color: 'from-teal-500 to-green-500',
    delay: 0.6
  }
]

const stats = [
  { value: '1M+', label: 'Documents Processed', suffix: '' },
  { value: '100', label: 'Languages Supported', suffix: '+' },
  { value: '99.9', label: 'Uptime Guarantee', suffix: '%' },
  { value: '10K', label: 'Happy Customers', suffix: '+' }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager at TechCorp',
    content: 'TesaReact transformed our document workflow. The AI insights are incredibly accurate and have saved us hours of manual work.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=64&h=64&fit=crop&crop=face',
    rating: 5
  },
  {
    name: 'Miguel Rodriguez',
    role: 'Legal Director at GlobalLaw',
    content: 'The translation quality is outstanding. We process international contracts daily, and TesaReact never disappoints.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    rating: 5
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Research Lead at BioTech Inc.',
    content: 'The analytics dashboard provides insights we never had before. It\'s like having a data scientist for our documents.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    rating: 5
  }
]

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setIsVisible(true)
    // Check for user authentication - simplified demo
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
      // Set demo user
      setUser({ name: 'Demo User', email: 'demo@tesareact.com' })
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
    setUser(null)
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TesaReact</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">Welcome, {user.name}</span>
                  <Link
                    href="/dashboard"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/auth/login"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-gradient-to-br from-green-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transform Documents</span>
                <span className="block text-gray-900">with AI Intelligence</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Process, analyze, and translate documents with cutting-edge AI. 
              From PDFs to conversations, TesaReact handles it all with enterprise-grade security.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link href={user ? "/dashboard" : "/dashboard"}>
                <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:scale-105 flex items-center">
                  {user ? "Go to Dashboard" : "Start Free Trial"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <button className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 rounded-xl transition-all duration-300 group backdrop-blur-sm flex items-center">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                  className="text-center group"
                >
                  <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:scale-110 transition-transform">
                    {stat.value}<span className="text-blue-600">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          >
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Modern Teams</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to transform your document workflow with AI-powered automation and enterprise-grade security
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-2xl transition-all duration-500 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-6 shadow-lg`}
                >
                  <feature.icon className="w-full h-full text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Industry Leaders</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our customers are saying about their experience with TesaReact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of teams already using TesaReact to revolutionize their document processing with AI intelligence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={user ? "/dashboard" : "/dashboard"}>
                <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold transform hover:scale-105 flex items-center">
                  {user ? "Go to Dashboard" : "Start Free Trial"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
              <Link href="/pricing">
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm">
                  View Pricing
                </button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-80">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span className="text-white font-medium">99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-white" />
                <span className="text-white font-medium">10K+ Customers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">TesaReact</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            © 2024 TesaReact. All rights reserved. Built with AI intelligence.
          </div>
        </div>
      </footer>
    </div>
  )
}
