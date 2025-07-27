import { Link } from 'react-router-dom'
import { FaBook, FaGithub, FaTwitter, FaLinkedin, FaHeart, FaEnvelope, FaPhone } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <FaBook className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-lora gradient-text">
                  BookLogix
                </h2>
                <p className="text-xs text-slate-400 font-inter">Library Management System</p>
              </div>
            </Link>

            <p className="text-slate-300 text-lg max-w-md font-inter leading-relaxed">
              Professional library management made simple. Organize, track, and discover books
              with our comprehensive digital platform designed for modern libraries.
            </p>

            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold font-lora">Quick Links</h3>
            <nav className="space-y-3">
              <Link
                to="/"
                className="block text-slate-300 hover:text-white transition-colors duration-200 font-inter"
              >
                Library Dashboard
              </Link>
              <Link
                to="/books/create"
                className="block text-slate-300 hover:text-white transition-colors duration-200 font-inter"
              >
                Add New Book
              </Link>
              <a
                href="#"
                className="block text-slate-300 hover:text-white transition-colors duration-200 font-inter"
              >
                Browse Collection
              </a>
              <a
                href="#"
                className="block text-slate-300 hover:text-white transition-colors duration-200 font-inter"
              >
                Search Books
              </a>
            </nav>
          </div>

          {/* Contact & Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold font-lora">Contact & Support</h3>
            <div className="space-y-3">
              <a
                href="mailto:support@booklogix.com"
                className="flex items-center text-slate-300 hover:text-white transition-colors duration-200 font-inter"
              >
                <FaEnvelope className="w-4 h-4 mr-3" />
                support@booklogix.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center text-slate-300 hover:text-white transition-colors duration-200 font-inter"
              >
                <FaPhone className="w-4 h-4 mr-3" />
                +1 (234) 567-890
              </a>
              <a
                href="#"
                className="block text-slate-300 hover:text-white transition-colors duration-200 font-inter"
              >
                Help Center
              </a>
              <a
                href="#"
                className="block text-slate-300 hover:text-white transition-colors duration-200 font-inter"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-slate-400 font-inter">
              <span>Made with</span>
              <FaHeart className="text-red-500 w-4 h-4 animate-pulse" />
              <span>by the BookLogix Team</span>
            </div>

            <div className="text-slate-400 font-inter">
              © {currentYear} BookLogix. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
