import React from 'react'
import { Link } from 'react-router-dom'
import { FaBook, FaPlus, FaUser } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'

const Header = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: <FaBook className="w-4 h-4" /> },
    { name: 'Add Book', path: '/books/create', icon: <FaPlus className="w-4 h-4" /> },
  ]

  return (
    <div className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto lg:px-24 px-4 font-poppins">
        <div className="navbar py-4">
          {/* Mobile Menu */}
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-2">
                <HiMenu className="h-6 w-6" />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-lg w-52 border"
              >
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="flex items-center gap-3 py-3 px-4 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded-lg"
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logo */}
            <Link to="/" className="text-2xl lg:text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
              Quill<span className="text-blue-600">Quest</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* User Actions */}
          <div className="navbar-end">
            <div className="flex items-center gap-3">
              <button className="btn btn-outline btn-primary hidden sm:flex">
                <FaUser className="w-4 h-4" />
                Login
              </button>
              <button className="btn btn-primary">
                <FaPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Book</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
