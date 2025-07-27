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
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-poppins">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Library
          </Link>
        </div>

        {/* Confirmation Dialog */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Warning Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <FaExclamationTriangle className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Delete Book
            </h1>
            <p className="text-red-100 text-lg">
              This action cannot be undone
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Book Preview */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 border-l-4 border-red-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaBook className="text-white text-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Author:</span> {book.author}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Published:</span> {book.publishedYear}
                  </p>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Are you sure you want to delete this book?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                This will permanently remove <span className="font-semibold text-gray-800">&ldquo;{book.title}&rdquo;</span> from your library.
                This action cannot be undone and all associated data will be lost.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCancel}
                className="btn btn-outline btn-lg px-8 group relative overflow-hidden order-2 sm:order-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaTimes className="mr-2 relative z-10" />
                <span className="relative z-10">Cancel</span>
              </button>

              <button
                onClick={handleDeleteBook}
                className="btn btn-error btn-lg px-8 group relative overflow-hidden order-1 sm:order-2"
                disabled={loading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaTrash className="mr-2 relative z-10 group-hover:animate-bounce" />
                <span className="relative z-10">Yes, Delete Book</span>
              </button>
            </div>

            {/* Safety Note */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <FaExclamationTriangle className="text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">Safety Tip:</span> Make sure you have a backup of any important information
                    before proceeding with the deletion.
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
