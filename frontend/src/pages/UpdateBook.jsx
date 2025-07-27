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
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <FaEdit className="text-green-600 text-2xl" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Update Book
            </h1>
            <p className="text-gray-600 text-lg">
              Edit the details of your book
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleUpdateBook} className="space-y-6">
              {/* Book Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold text-gray-700">
                    Book Title *
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter the book title"
                  className={`input input-bordered w-full text-base ${
                    errors.title ? 'input-error' : 'focus:input-primary'
                  }`}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                    if (errors.title) {
                      setErrors({ ...errors, title: '' })
                    }
                  }}
                />
                {errors.title && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.title}</span>
                  </label>
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
              <div className="form-control mt-8">
                <button
                  type="submit"
                  className="btn btn-success btn-lg w-full text-base font-semibold group relative overflow-hidden"
                  disabled={loading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
                  <FaSave className="mr-2 relative z-10" />
                  <span className="relative z-10">Update Book</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            * Required fields. Make sure all information is accurate before updating.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UpdateBook
