import React from 'react'
import { Link } from 'react-router-dom'
import { FaBook, FaGithub, FaTwitter, FaLinkedin, FaHeart } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-screen-2xl mx-auto lg:px-24 px-4">
        <footer className="footer pt-16 pb-8 font-poppins grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <aside className="lg:col-span-2">
            <Link to="/" className="text-3xl font-bold mb-4 inline-block">
              Quill<span className="text-blue-400">Quest</span>
            </Link>
            <p className="text-gray-300 text-lg mb-6 max-w-md">
              Your digital companion for organizing and discovering books. Build your personal library with ease.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <FaGithub size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <FaLinkedin size={24} />
              </a>
            </div>
          </aside>

          {/* Quick Links */}
          <nav>
            <header className="text-white text-xl font-semibold mb-4">
              Quick Links
            </header>
            <Link to="/" className="link link-hover text-gray-300 hover:text-white transition-colors duration-200 block py-1">
              Home
            </Link>
            <Link to="/books/create" className="link link-hover text-gray-300 hover:text-white transition-colors duration-200 block py-1">
              Add Book
            </Link>
            <a href="#" className="link link-hover text-gray-300 hover:text-white transition-colors duration-200 block py-1">
              Browse Books
            </a>
            <a href="#" className="link link-hover text-gray-300 hover:text-white transition-colors duration-200 block py-1">
              My Library
            </a>
          </nav>

          {/* Support */}
          <nav>
            <header className="text-white text-xl font-semibold mb-4">
              Support
            </header>
            <a href="#" className="link link-hover text-gray-300 hover:text-white transition-colors duration-200 block py-1">
              Help Center
            </a>
            <a href="#" className="link link-hover text-gray-300 hover:text-white transition-colors duration-200 block py-1">
              Contact Us
            </a>
            <a href="#" className="link link-hover text-gray-300 hover:text-white transition-colors duration-200 block py-1">
              Privacy Policy
            </a>
            <a href="#" className="link link-hover text-gray-300 hover:text-white transition-colors duration-200 block py-1">
              Terms of Service
            </a>
          </nav>
        </footer>

        {/* Bottom Section */}
        <div className="divider divider-neutral opacity-20"></div>
        <footer className="footer footer-center pb-8 font-poppins">
          <aside>
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <span>Made with</span>
              <FaHeart className="text-red-500 text-sm" />
              <span>by QuillQuest Team</span>
            </div>
            <p className="text-gray-400 mt-2">
              Copyright © {currentYear} - All rights reserved
            </p>
          </aside>
        </footer>
      </div>
    </div>
  )
}

export default Footer
