import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { FaArrowLeft, FaTrash, FaExclamationTriangle, FaTimes, FaBook } from 'react-icons/fa'
import axiosInstance from '../utils/axiosInstance'

const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const [book, setBook] = useState({})
  const [bookLoading, setBookLoading] = useState(true)
  const navigate = useNavigate()
  const { id } = useParams()

  // Fetch book details for confirmation
  useEffect(() => {
    setBookLoading(true)
    axiosInstance.get(`/books/${id}`)
      .then((res) => {
        setBook(res.data)
        setBookLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setBookLoading(false)
        toast.error('Failed to load book details', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'colored',
        })
      })
  }, [id])

  const handleDeleteBook = () => {
    setLoading(true)
    axiosInstance.delete(`/books/${id}`)
      .then(() => {
        setLoading(false)
        toast.success('Book Deleted Successfully! 🗑️', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        toast.error('Failed to delete book. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'colored',
        })
        console.log(error)
      })
  }

  const handleCancel = () => {
    navigate('/')
  }

  if (bookLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600 font-medium">Loading book details...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600 font-medium">Deleting book...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200 mb-8 font-inter font-medium"
          >
            <FaArrowLeft className="mr-2 w-4 h-4" />
            Back to Library
          </Link>
        </div>

        {/* Confirmation Dialog */}
        <div className="glass-effect shadow-luxury rounded-2xl overflow-hidden">
          {/* Warning Header */}
          <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg">
                <FaExclamationTriangle className="text-white text-3xl" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-3 font-lora">
                Delete Book
              </h1>
              <p className="text-red-100 text-lg font-inter">
                This action cannot be undone
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12">
            {/* Book Preview */}
            <div className="bg-slate-50 rounded-2xl p-8 mb-10 border-l-4 border-red-500 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FaBook className="text-white text-2xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 font-lora">
                    {book.title}
                  </h3>
                  <div className="space-y-2 font-inter">
                    <p className="text-slate-600">
                      <span className="font-semibold text-slate-800">Author:</span> {book.author}
                    </p>
                    <p className="text-slate-600">
                      <span className="font-semibold text-slate-800">Published:</span> {book.publishedYear}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 font-lora">
                Are you sure you want to delete this book?
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed font-inter max-w-2xl mx-auto">
                This will permanently remove <span className="font-semibold text-slate-900">&ldquo;{book.title}&rdquo;</span> from your library.
                This action cannot be undone and all associated data will be lost.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCancel}
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 font-semibold rounded-xl transition-all duration-300 font-inter text-lg order-2 sm:order-1"
              >
                <FaTimes className="inline-block mr-3 w-5 h-5" />
                Cancel
              </button>

              <button
                onClick={handleDeleteBook}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-inter text-lg order-1 sm:order-2"
                disabled={loading}
              >
                <FaTrash className="inline-block mr-3 w-5 h-5" />
                Yes, Delete Book
              </button>
            </div>

            {/* Safety Note */}
            <div className="mt-10 p-6 bg-amber-50 border-2 border-amber-200 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaExclamationTriangle className="text-amber-600 w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2 font-lora">Safety Reminder</h4>
                  <p className="text-amber-800 font-inter leading-relaxed">
                    Make sure you have a backup of any important information before proceeding with the deletion.
                    Once deleted, this book cannot be recovered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteBook
