/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaBook } from 'react-icons/fa'
import { BsInfoCircle } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'

const BookTable = ({ books }) => {
  if (!books || books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center bg-white rounded-lg shadow-sm border">
        <FaBook className="text-6xl text-gray-300 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Books Found</h3>
        <p className="text-gray-500">Start building your library by adding some books!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-sm font-semibold text-gray-700 py-4">#</th>
              <th className="text-sm font-semibold text-gray-700 py-4">Book Details</th>
              <th className="text-sm font-semibold text-gray-700 py-4">Author</th>
              <th className="text-sm font-semibold text-gray-700 py-4">Published</th>
              <th className="text-sm font-semibold text-gray-700 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id || index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-4">
                  <span className="text-sm font-medium text-gray-600">
                    {index + 1}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaBook className="text-white text-sm" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-500">Book</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div>
                    <p className="font-medium text-gray-800">{book.author}</p>
                    <span className="badge badge-outline badge-sm mt-1">
                      Author
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="badge badge-accent text-sm font-medium">
                    {book.publishedYear}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex justify-center gap-1">
                    {/* View Details Button */}
                    <Link
                      to={`/books/details/${book._id}`}
                      className="btn btn-xs btn-primary hover:scale-110 transition-all duration-200 tooltip shadow-sm group/view relative overflow-hidden"
                      data-tip="📖 View Details"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/view:opacity-30 transform -skew-x-12 -translate-x-full group-hover/view:translate-x-full transition-all duration-500"></div>
                      <BsInfoCircle size={12} className="group-hover/view:animate-pulse relative z-10" />
                    </Link>

                    {/* Edit Button */}
                    <Link
                      to={`/books/update/${book._id}`}
                      className="btn btn-xs btn-outline btn-success hover:btn-success hover:scale-110 transition-all duration-200 tooltip shadow-sm group/edit relative overflow-hidden"
                      data-tip="✏️ Edit Book"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover/edit:opacity-100 transition-opacity duration-200"></div>
                      <FaEdit size={12} className="group-hover/edit:rotate-12 transition-transform duration-200 relative z-10" />
                    </Link>

                    {/* Delete Button */}
                    <Link
                      to={`/books/delete/${book._id}`}
                      className="btn btn-xs btn-outline btn-error hover:btn-error hover:scale-110 transition-all duration-200 tooltip shadow-sm group/delete relative overflow-hidden"
                      data-tip="🗑️ Delete Book"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover/delete:opacity-100 transition-opacity duration-200"></div>
                      <MdDelete size={12} className="group-hover/delete:animate-bounce relative z-10" />
                    </Link>
                  </div>

                  {/* Action Indicator */}
                  <div className="flex justify-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-0.5">
                      <div className="w-0.5 h-0.5 bg-blue-400 rounded-full"></div>
                      <div className="w-0.5 h-0.5 bg-green-400 rounded-full"></div>
                      <div className="w-0.5 h-0.5 bg-red-400 rounded-full"></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookTable
