/* eslint-disable react/prop-types */
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { FaEdit, FaBook, FaUser, FaCalendar, FaEye, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Card = ({ book }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <article className="group h-full">
      <div className="bg-white border border-slate-200/60 shadow-sm hover:shadow-2xl transition-all duration-700 ease-out transform hover:-translate-y-3 rounded-3xl overflow-hidden relative h-full flex flex-col">
        {/* Book Cover Header */}
        <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 h-48 flex items-center justify-center overflow-hidden border-b border-slate-100">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
            }}></div>
          </div>

          {/* Book Icon */}
          <div className="relative z-10 transform group-hover:scale-110 group-hover:rotate-2 transition-all duration-700">
            <FaBook className="text-primary-600 text-6xl opacity-90 drop-shadow-lg" />
          </div>

          {/* Year Badge */}
          <div className="absolute top-5 right-5">
            <div className="bg-white/90 backdrop-blur-sm border border-primary-200 rounded-2xl px-4 py-2 shadow-sm">
              <div className="flex items-center space-x-2">
                <FaCalendar className="w-3 h-3 text-primary-600" />
                <span className="text-primary-800 font-semibold text-sm font-inter tracking-wide">
                  {book.publishedYear}
                </span>
              </div>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="absolute top-5 left-5 w-10 h-10 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl flex items-center justify-center hover:bg-white hover:shadow-md transition-all duration-300 group/bookmark"
          >
            {isBookmarked ? (
              <BsBookmarkFill className="w-4 h-4 text-amber-500 group-hover/bookmark:scale-110 transition-transform duration-300" />
            ) : (
              <BsBookmark className="w-4 h-4 text-slate-500 group-hover/bookmark:scale-110 transition-transform duration-300" />
            )}
          </button>

          {/* Floating Particles */}
          <div className="absolute top-8 left-1/4 w-2 h-2 bg-primary-300 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-8 right-1/3 w-1 h-1 bg-secondary-300 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-8">
          {/* Book Information */}
          <div className="flex-1 space-y-4 mb-6">
            <div>
              <h3 className="font-lora font-bold text-2xl text-slate-900 line-clamp-2 leading-tight mb-3 group-hover:text-primary-700 transition-colors duration-300">
                {book.title}
              </h3>

              <div className="flex items-center space-x-2 text-slate-600">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                  <FaUser className="w-3 h-3 text-slate-500" />
                </div>
                <span className="font-inter font-medium text-slate-700">{book.author}</span>
              </div>
            </div>

            {/* Book Stats */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-4 text-xs text-slate-500 font-inter">
                <span className="bg-slate-100 px-3 py-1 rounded-full">Literature</span>
                <span>Available</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Primary Action */}
            <Link
              to={`/books/details/${book._id}`}
              className="group/btn relative w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-2xl font-inter overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
              <FaEye className="w-5 h-5 mr-3 relative z-10 group-hover/btn:scale-110 transition-transform duration-300" />
              <span className="relative z-10 tracking-wide">View Details</span>
            </Link>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                to={`/books/update/${book._id}`}
                className="group/edit relative inline-flex items-center justify-center px-4 py-3 bg-white border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 font-semibold rounded-xl transition-all duration-300 font-inter shadow-sm hover:shadow-md"
              >
                <FaEdit className="w-4 h-4 mr-2 group-hover/edit:rotate-12 transition-transform duration-300" />
                <span className="text-sm">Edit</span>
              </Link>

              <Link
                to={`/books/delete/${book._id}`}
                className="group/delete relative inline-flex items-center justify-center px-4 py-3 bg-white border-2 border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-800 font-semibold rounded-xl transition-all duration-300 font-inter shadow-sm hover:shadow-md"
              >
                <FaTrashAlt className="w-4 h-4 mr-2 group-hover/delete:animate-bounce" />
                <span className="text-sm">Delete</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle Hover Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/0 via-transparent to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>

        {/* Border Glow Effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude'
        }}></div>
      </div>
    </article>
  )
}

export default Card
