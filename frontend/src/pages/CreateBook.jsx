import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { FaBook, FaArrowLeft, FaPlus } from 'react-icons/fa'
import axiosInstance from '../utils/axiosInstance'

const CreateBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = 'Book title is required'
    }

    if (!author.trim()) {
      newErrors.author = 'Author name is required'
    }

    if (!publishedYear) {
      newErrors.publishedYear = 'Published year is required'
    } else if (publishedYear < 1000 || publishedYear > new Date().getFullYear()) {
      newErrors.publishedYear = 'Please enter a valid year'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveBook = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const data = { title: title.trim(), author: author.trim(), publishedYear: parseInt(publishedYear) }
    setLoading(true)

    axiosInstance
      .post('/books', data)
      .then(() => {
        setLoading(false)
        toast.success('Book Added Successfully! 📚', {
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
        toast.error('Failed to add book. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'colored',
        })
        console.log(error)
      })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" message="Adding your book to the library..." />
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

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-6 shadow-lg">
              <FaBook className="text-white text-2xl" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 font-lora">
              Add New Book
            </h1>

            <p className="text-xl text-slate-600 font-inter">
              Expand your digital library with a new addition
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="glass-effect shadow-luxury rounded-2xl overflow-hidden">
          <div className="p-8 lg:p-12">
            <form onSubmit={handleSaveBook} className="space-y-8">
              {/* Book Title */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-inter">
                  Book Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter the book title"
                  className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl transition-all duration-200 font-lora text-lg ${
                    errors.title
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-200 focus:border-primary-500 focus:ring-primary-500/20'
                  } focus:outline-none focus:ring-4`}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                    if (errors.title) {
                      setErrors({ ...errors, title: '' })
                    }
                  }}
                />
                {errors.title && (
                  <p className="text-red-600 text-sm font-inter">{errors.title}</p>
                )}
              </div>

              {/* Author */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-inter">
                  Author *
                </label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl transition-all duration-200 font-lora text-lg ${
                    errors.author
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-200 focus:border-primary-500 focus:ring-primary-500/20'
                  } focus:outline-none focus:ring-4`}
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value)
                    if (errors.author) {
                      setErrors({ ...errors, author: '' })
                    }
                  }}
                />
                {errors.author && (
                  <p className="text-red-600 text-sm font-inter">{errors.author}</p>
                )}
              </div>

              {/* Published Year */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-inter">
                  Published Year *
                </label>
                <input
                  type="number"
                  placeholder="Enter the published year"
                  min="1000"
                  max={new Date().getFullYear()}
                  className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl transition-all duration-200 font-lora text-lg ${
                    errors.publishedYear
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-200 focus:border-primary-500 focus:ring-primary-500/20'
                  } focus:outline-none focus:ring-4`}
                  value={publishedYear}
                  onChange={(e) => {
                    setPublishedYear(e.target.value)
                    if (errors.publishedYear) {
                      setErrors({ ...errors, publishedYear: '' })
                    }
                  }}
                />
                {errors.publishedYear && (
                  <p className="text-red-600 text-sm font-inter">{errors.publishedYear}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-inter text-lg"
                  disabled={loading}
                >
                  <FaPlus className="inline-block mr-3 w-5 h-5" />
                  Add Book to Library
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 font-inter">
            * Required fields. Ensure all information is accurate before submitting.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateBook
