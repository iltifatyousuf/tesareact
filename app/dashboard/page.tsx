"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FileText,
  Languages,
  MessageSquare,
  BarChart3,
  Upload,
  TrendingUp,
  Users,
  Clock,
  Plus,
  ArrowUpRight,
  Download,
  Filter,
  Search,
  Star,
  Award,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/layout/Navigation";

const stats = [
  {
    title: "Documents Processed",
    value: "1,247",
    change: "+12%",
    changeType: "increase",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    description: "Total documents processed this month",
  },
  {
    title: "Translations",
    value: "856",
    change: "+8%",
    changeType: "increase",
    icon: Languages,
    color: "from-green-500 to-emerald-500",
    description: "Multi-language translations completed",
  },
  {
    title: "Chat Sessions",
    value: "324",
    change: "+24%",
    changeType: "increase",
    icon: MessageSquare,
    color: "from-purple-500 to-pink-500",
    description: "AI chat conversations this month",
  },
  {
    title: "API Calls",
    value: "2,891",
    change: "+16%",
    changeType: "increase",
    icon: BarChart3,
    color: "from-orange-500 to-red-500",
    description: "Total API requests processed",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "document",
    title: "Annual Report.pdf processed",
    description: "Extracted insights and key metrics from 45-page report",
    time: "2 minutes ago",
    status: "completed",
    user: "John Doe",
  },
  {
    id: 2,
    type: "translation",
    title: "Contract translated to Spanish",
    description: "Legal document translation with 98% confidence",
    time: "15 minutes ago",
    status: "completed",
    user: "Sarah Chen",
  },
  {
    id: 3,
    type: "chat",
    title: "Chat session with AI assistant",
    description: "Document analysis and Q&A session",
    time: "1 hour ago",
    status: "completed",
    user: "Mike Johnson",
  },
  {
    id: 4,
    type: "analysis",
    title: "Market research analysis",
    description: "Processing sentiment analysis on customer feedback",
    time: "2 hours ago",
    status: "in-progress",
    user: "Emily Watson",
  },
  {
    id: 5,
    type: "document",
    title: "Invoice batch processing",
    description: "Automated extraction from 12 invoice files",
    time: "3 hours ago",
    status: "completed",
    user: "David Kim",
  },
];

const quickActions = [
  {
    title: "Upload Document",
    description: "Process new files with AI analysis",
    icon: Upload,
    color: "from-blue-500 to-blue-600",
    href: "/upload",
  },
  {
    title: "Start Translation",
    description: "Translate documents to 100+ languages",
    icon: Languages,
    color: "from-green-500 to-green-600",
    href: "/translate",
  },
  {
    title: "Chat with AI",
    description: "Get insights from your documents",
    icon: MessageSquare,
    color: "from-purple-500 to-purple-600",
    href: "/chat",
  },
  {
    title: "View Analytics",
    description: "Detailed reports and visualizations",
    icon: BarChart3,
    color: "from-orange-500 to-orange-600",
    href: "/analytics",
  },
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState({
    name: "Demo User",
    email: "demo@tesareact.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onLogout={handleLogout} />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600">
                  Here's what's happening with your TesaReact workspace today.
                </p>
              </div>

              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search documents, translations, or chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white shadow-sm"
              />
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  onClick={() => router.push(action.href)}
                  className="p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} p-3 shadow-lg`}
                        >
                          <stat.icon className="w-full h-full text-white" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-gray-400" />
                      </div>

                      <div>
                        <p className="text-2xl font-bold text-gray-900 mb-1">
                          {stat.value}
                        </p>
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          {stat.title}
                        </p>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`flex items-center text-sm ${
                              stat.changeType === "increase"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {stat.change}
                          </div>
                          <span className="text-xs text-gray-500">
                            vs last month
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                      <CardDescription>
                        Your latest document processing and AI interactions
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      View All
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          activity.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {activity.type === "document" && (
                          <FileText className="w-5 h-5" />
                        )}
                        {activity.type === "translation" && (
                          <Languages className="w-5 h-5" />
                        )}
                        {activity.type === "chat" && (
                          <MessageSquare className="w-5 h-5" />
                        )}
                        {activity.type === "analysis" && (
                          <BarChart3 className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {activity.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {activity.description}
                            </p>
                            <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {activity.time}
                              </span>
                              <span className="flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                {activity.user}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ml-4 ${
                              activity.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {activity.status === "completed"
                              ? "Completed"
                              : "In Progress"}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-6"
            >
              {/* Usage This Month */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Usage This Month</CardTitle>
                  <CardDescription>
                    Your current plan usage and limits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Documents</span>
                        <span className="font-medium">247 / 1,000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "25%" }}
                          transition={{ delay: 1, duration: 0.8 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">API Calls</span>
                        <span className="font-medium">2,891 / 5,000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "58%" }}
                          transition={{ delay: 1.2, duration: 0.8 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Storage</span>
                        <span className="font-medium">4.2 GB / 10 GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "42%" }}
                          transition={{ delay: 1.4, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-6 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600"
                    onClick={() => router.push("/pricing")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          Total Files
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        1,247
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Languages className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          Languages Used
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        12
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          Team Members
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        3
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          Success Rate
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-green-600">
                        98.5%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievement Card */}
              <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">
                        Achievement Unlocked!
                      </h3>
                      <p className="text-sm text-green-600">
                        Document Processing Pro
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    You've processed over 1,000 documents this month! 🎉
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-green-600">
                    <Star className="w-3 h-3" />
                    <span>Milestone Reached</span>
                    <span>•</span>
                    <span>+50 Bonus Credits</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-12"
          >
            <Card className="border-0 bg-gradient-to-r from-brand-600 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-yellow-300 mr-2" />
                  <h3 className="text-2xl font-bold">Ready for More?</h3>
                </div>
                <p className="text-brand-100 mb-6 max-w-2xl mx-auto">
                  Unlock advanced features and higher limits with our Pro plan.
                  Get priority support, advanced analytics, and unlimited team
                  collaboration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-white text-brand-600 hover:bg-gray-100 shadow-lg"
                    onClick={() => router.push("/pricing")}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-brand-600"
                    onClick={() => router.push("/chat")}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Start AI Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
