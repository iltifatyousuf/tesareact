"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  FileText,
  MessageSquare,
  BarChart3,
  Languages,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Translate", href: "/translate", icon: Languages },
  { name: "Documents", href: "/documents", icon: FileText },
];

interface NavigationProps {
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
  onLogout?: () => void;
}

export function Navigation({ user, onLogout }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  // Apple-style scroll detection for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
      setUserMenuOpen(false);
    };

    if (isOpen || userMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen, userMenuOpen]);

  const isAuthPage = pathname?.startsWith("/auth");

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "glass-effect shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Apple-inspired clean design */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 bg-gradient-to-br from-brand-600 to-brand-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Brain className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold gradient-text">TesaReact</span>
          </Link>

          {/* Desktop Navigation - Google-adaptive layout */}
          {!isAuthPage && (
            <div className="hidden md:flex items-center space-x-1">
              {user ? (
                <>
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link key={item.name} href={item.href}>
                        <motion.div
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                            isActive
                              ? "bg-brand-100 text-brand-700 shadow-sm"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          )}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </motion.div>
                      </Link>
                    );
                  })}

                  {/* User Menu with Adobe-inspired dropdown */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserMenuOpen(!userMenuOpen);
                      }}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="hidden lg:block text-sm font-medium text-gray-700">
                        {user.name}
                      </span>
                    </motion.button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ type: "spring", duration: 0.2 }}
                          className="absolute right-0 top-full mt-2 w-56 glass-effect rounded-xl shadow-xl border py-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="px-4 py-3 border-b border-gray-200">
                            <p className="text-sm font-medium text-gray-900">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>

                          <div className="py-2">
                            <Link
                              href="/profile"
                              className="flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <Settings className="w-4 h-4 text-gray-400" />
                              <span>Settings</span>
                            </Link>
                            <Link
                              href="/pricing"
                              className="flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <CreditCard className="w-4 h-4 text-gray-400" />
                              <span>Billing</span>
                            </Link>
                            <hr className="my-2 border-gray-200" />
                            <button
                              onClick={() => {
                                onLogout?.();
                                setUserMenuOpen(false);
                              }}
                              className="flex items-center space-x-3 w-full px-4 py-2 text-sm hover:bg-red-50 text-red-600 transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Sign out</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/auth/login"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link href="/auth/register">
                    <Button className="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 shadow-lg">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200 bg-white/90 backdrop-blur-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {user ? (
                  <>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors",
                          pathname === item.href
                            ? "text-brand-700 bg-brand-50"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                    <hr className="my-3 border-gray-200" />
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        onLogout?.();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block px-3 py-2 text-base font-medium text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
