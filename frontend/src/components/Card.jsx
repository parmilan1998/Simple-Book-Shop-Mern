/* eslint-disable react/prop-types */
import React from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import { FaEdit, FaBook } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Card = ({ book }) => {
  return (
    <div className="group">
      <div className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100 overflow-hidden relative">
        {/* Book Cover Placeholder */}
        <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 h-48 flex items-center justify-center">
          <FaBook className="text-white text-4xl opacity-80 group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute top-3 right-3">
            <div className="badge badge-accent text-xs font-semibold px-2 py-1 shadow-lg">
              {book.publishedYear}
            </div>
          </div>

          {/* Floating Action Indicators */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="card-body p-6">
          <h2 className="card-title text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {book.title}
          </h2>
          <p className="text-gray-600 text-sm mb-4 font-medium">
            by {book.author}
          </p>

          {/* Action Buttons */}
          <div className="card-actions flex flex-col gap-3 mt-auto">
            {/* Primary Action - View Details */}
            <Link
              to={`/books/details/${book._id}`}
              className="btn btn-primary btn-sm w-full group/btn hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg btn-hover-glow relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-all duration-700"></div>
              <BsInfoCircle size={16} className="group-hover/btn:animate-pulse relative z-10" />
              <span className="font-medium relative z-10">View Details</span>
            </Link>

            {/* Secondary Actions */}
            <div className="flex gap-2 w-full">
              <Link
                to={`/books/update/${book._id}`}
                className="btn btn-outline btn-success btn-sm flex-1 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md group/edit btn-hover-lift relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover/edit:opacity-100 transition-opacity duration-300"></div>
                <FaEdit size={14} className="group-hover/edit:rotate-12 transition-transform duration-200 relative z-10" />
                <span className="hidden sm:inline font-medium relative z-10">Edit</span>
                <span className="sm:hidden relative z-10">✏️</span>
              </Link>

              <Link
                to={`/books/delete/${book._id}`}
                className="btn btn-outline btn-error btn-sm flex-1 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md group/delete btn-hover-lift relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover/delete:opacity-100 transition-opacity duration-300"></div>
                <MdDelete size={14} className="group-hover/delete:animate-bounce relative z-10" />
                <span className="hidden sm:inline font-medium relative z-10">Delete</span>
                <span className="sm:hidden relative z-10">🗑️</span>
              </Link>
            </div>

            {/* Action Status Bar */}
            <div className="flex justify-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
              <div className="w-1 h-1 bg-green-400 rounded-full"></div>
              <div className="w-1 h-1 bg-red-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Hover Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  )
}

export default Card
