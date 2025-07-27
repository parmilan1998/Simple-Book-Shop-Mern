import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { FaEdit, FaArrowLeft, FaSave } from 'react-icons/fa'
import axiosInstance from '../utils/axiosInstance'

const UpdateBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  // Fetch the book Details
  useEffect(() => {
    setInitialLoading(true)
    axiosInstance.get(`/books/${id}`)
      .then((res) => {
        setTitle(res.data.title)
        setAuthor(res.data.author)
        setPublishedYear(res.data.publishedYear)
        setInitialLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setInitialLoading(false)
        toast.error('Failed to load book details', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'colored',
        })
      })
  }, [id])

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

  const handleUpdateBook = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const data = { title: title.trim(), author: author.trim(), publishedYear: parseInt(publishedYear) }
    setLoading(true)

    axiosInstance.put(`/books/${id}`, data)
      .then(() => {
        setLoading(false)
        toast.success('Book Updated Successfully! 📚', {
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
        toast.error('Failed to update book. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'colored',
        })
        console.log(error)
      })
  }

  if (initialLoading) {
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
          <p className="mt-4 text-gray-600 font-medium">Updating your book...</p>
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl mb-6 shadow-lg">
              <FaEdit className="text-white text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 font-lora">
              Update Book
            </h1>
            <p className="text-xl text-slate-600 font-inter">
              Edit the details of your book
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="glass-effect shadow-luxury rounded-2xl overflow-hidden">
          <div className="p-8 lg:p-12">
            <form onSubmit={handleUpdateBook} className="space-y-8">
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold text-gray-700">
                    Author *
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  className={`input input-bordered w-full text-base ${
                    errors.author ? 'input-error' : 'focus:input-primary'
                  }`}
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value)
                    if (errors.author) {
                      setErrors({ ...errors, author: '' })
                    }
                  }}
                />
                {errors.author && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.author}</span>
                  </label>
                )}
              </div>

              {/* Published Year */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold text-gray-700">
                    Published Year *
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="Enter the published year"
                  min="1000"
                  max={new Date().getFullYear()}
                  className={`input input-bordered w-full text-base ${
                    errors.publishedYear ? 'input-error' : 'focus:input-primary'
                  }`}
                  value={publishedYear}
                  onChange={(e) => {
                    setPublishedYear(e.target.value)
                    if (errors.publishedYear) {
                      setErrors({ ...errors, publishedYear: '' })
                    }
                  }}
                />
                {errors.publishedYear && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.publishedYear}</span>
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-inter text-lg"
                  disabled={loading}
                >
                  <FaSave className="inline-block mr-3 w-5 h-5" />
                  Update Book
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 font-inter">
            * Required fields. Ensure all information is accurate before updating.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UpdateBook
