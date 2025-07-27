/* eslint-disable react/prop-types */
import { BsInfoCircle } from 'react-icons/bs'
import { FaEdit, FaBook, FaUser, FaCalendar } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Card = ({ book }) => {
  return (
    <article className="group">
      <div className="glass-effect shadow-elegant hover:shadow-luxury transition-all duration-500 ease-out transform hover:-translate-y-2 rounded-2xl overflow-hidden relative animate-fade-in">
        {/* Book Cover */}
        <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 h-56 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          <FaBook className="text-white text-5xl opacity-90 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500" />

          {/* Year Badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30">
              <FaCalendar className="w-3 h-3 mr-1" />
              {book.publishedYear}
            </span>
          </div>

          {/* Status Indicator */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-3 h-3 bg-accent-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Book Info */}
          <div className="space-y-3">
            <h3 className="font-lora font-bold text-xl text-slate-900 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
              {book.title}
            </h3>

            <div className="flex items-center text-slate-600 font-inter">
              <FaUser className="w-4 h-4 mr-2 text-slate-400" />
              <span className="text-sm font-medium">{book.author}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            {/* Primary Action */}
            <Link
              to={`/books/details/${book._id}`}
              className="group/btn w-full inline-flex items-center justify-center px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-inter"
            >
              <BsInfoCircle className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
              View Details
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-all duration-700 rounded-xl"></div>
            </Link>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Link
                to={`/books/update/${book._id}`}
                className="group/edit inline-flex items-center justify-center px-3 py-2 border-2 border-accent-200 text-accent-700 hover:bg-accent-50 hover:border-accent-300 font-medium rounded-lg transition-all duration-300 font-inter"
              >
                <FaEdit className="w-4 h-4 mr-1 group-hover/edit:rotate-12 transition-transform duration-300" />
                <span className="hidden sm:inline">Edit</span>
                <span className="sm:hidden">✏️</span>
              </Link>

              <Link
                to={`/books/delete/${book._id}`}
                className="group/delete inline-flex items-center justify-center px-3 py-2 border-2 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 font-medium rounded-lg transition-all duration-300 font-inter"
              >
                <MdDelete className="w-4 h-4 mr-1 group-hover/delete:animate-bounce" />
                <span className="hidden sm:inline">Delete</span>
                <span className="sm:hidden">🗑️</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
      </div>
    </article>
  )
}

export default Card
