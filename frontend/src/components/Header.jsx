import { Link } from 'react-router-dom'
import { FaBook, FaPlus, FaUser, FaSearch, FaBell } from 'react-icons/fa'
import { HiMenu, HiX } from 'react-icons/hi'
import { useState } from 'react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Library', path: '/', icon: <FaBook className="w-4 h-4" /> },
    { name: 'Add Book', path: '/books/create', icon: <FaPlus className="w-4 h-4" /> },
  ]

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <FaBook className="text-white text-lg" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold font-lora">
                  <span className="gradient-text">BookLogix</span>
                </h1>
                <p className="text-xs text-slate-500 font-inter -mt-1">Library Management</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 hover:text-primary-600 hover:bg-primary-50/50 transition-all duration-200 font-medium font-inter group"
              >
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 font-inter"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <button className="relative p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 hidden sm:block">
              <FaBell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="hidden sm:flex items-center space-x-2">
              <button className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium font-inter">
                <FaUser className="w-4 h-4" />
                <span>Account</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/60 animate-slide-up">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium font-inter"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              {/* Mobile Search */}
              <div className="px-4 py-2">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-inter"
                  />
                </div>
              </div>

              {/* Mobile User Actions */}
              <div className="px-4 pt-2 border-t border-slate-200/60">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium font-inter">
                  <FaUser className="w-4 h-4" />
                  Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
