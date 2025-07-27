/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { FaEdit, FaBook, FaUser, FaCalendar } from 'react-icons/fa'
import { BsInfoCircle } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'

const BookTable = ({ books }) => {
  if (!books || books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center bg-white rounded-2xl shadow-elegant border border-slate-200">
        <FaBook className="text-6xl text-slate-300 mb-4" />
        <h3 className="text-2xl font-semibold text-slate-600 mb-2 font-lora">No Books Found</h3>
        <p className="text-slate-500 font-inter">Start building your library by adding some books!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-elegant border border-slate-200/60 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <tr>
              <th className="text-left py-6 px-6 text-sm font-bold text-slate-700 font-inter tracking-wide">#</th>
              <th className="text-left py-6 px-6 text-sm font-bold text-slate-700 font-inter tracking-wide">Book Details</th>
              <th className="text-left py-6 px-6 text-sm font-bold text-slate-700 font-inter tracking-wide">Author</th>
              <th className="text-left py-6 px-6 text-sm font-bold text-slate-700 font-inter tracking-wide">Published</th>
              <th className="text-center py-6 px-6 text-sm font-bold text-slate-700 font-inter tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {books.map((book, index) => (
              <tr key={book._id || index} className="group hover:bg-slate-50/50 transition-all duration-300">
                <td className="py-6 px-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center shadow-sm border border-blue-200">
                    <span className="text-primary-700 font-bold text-sm font-inter">
                      {index + 1}
                    </span>
                  </div>
                </td>
                <td className="py-6 px-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300 border border-blue-200">
                      <FaBook className="text-primary-600 text-lg" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-lora font-bold text-slate-900 text-lg line-clamp-1 group-hover:text-primary-700 transition-colors duration-300">
                        {book.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 font-inter border border-blue-200">
                          Literature
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <FaUser className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 font-inter">{book.author}</p>
                      <p className="text-sm text-slate-500 font-inter">Author</p>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-6">
                  <div className="inline-flex items-center space-x-2">
                    <FaCalendar className="w-4 h-4 text-slate-400" />
                    <span className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 font-inter">
                      {book.publishedYear}
                    </span>
                  </div>
                </td>
                <td className="py-6">
                  <div className="flex justify-center gap-2">
                    {/* View Details Button */}
                    <Link
                      to={`/books/details/${book._id}`}
                      className="group/view relative inline-flex items-center justify-center w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                      title="View Details"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover/view:translate-x-full transition-transform duration-700 rounded-xl"></div>
                      <BsInfoCircle size={16} className="relative z-10 group-hover/view:scale-110 transition-transform duration-300" />
                    </Link>

                    {/* Edit Button */}
                    <Link
                      to={`/books/update/${book._id}`}
                      className="group/edit relative inline-flex items-center justify-center w-10 h-10 bg-white border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md"
                      title="Edit Book"
                    >
                      <FaEdit size={14} className="group-hover/edit:rotate-12 transition-transform duration-300" />
                    </Link>

                    {/* Delete Button */}
                    <Link
                      to={`/books/delete/${book._id}`}
                      className="group/delete relative inline-flex items-center justify-center w-10 h-10 bg-white border-2 border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-800 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md"
                      title="Delete Book"
                    >
                      <MdDelete size={14} className="group-hover/delete:animate-bounce" />
                    </Link>
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
