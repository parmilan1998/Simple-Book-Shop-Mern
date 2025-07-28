import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { HiViewGrid, HiViewList } from 'react-icons/hi'
import { FaPlus, FaBook } from 'react-icons/fa'
import BookTable from '../components/BookTable'
import BookCard from '../components/BookCard'
import axiosInstance from '../utils/axiosInstance'

const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [showType, setShowType] = useState('card')

  // Get the book details
  useEffect(() => {
    setLoading(true)
    axiosInstance
      .get('/books')
      .then((res) => {
        console.log(res.data)
        setBooks(res.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-secondary-900">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 animate-fade-in">
              <FaBook className="mr-2 w-4 h-4" />
              Professional Library Management System
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 font-lora tracking-tight animate-slide-up">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
                BookLogix
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-inter animate-slide-up" style={{animationDelay: '0.1s'}}>
              Streamline your library operations with our comprehensive book management platform.
              Organize, track, and discover books with professional-grade tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{animationDelay: '0.2s'}}>
              <Link
                to="/books/create"
                className="group relative inline-flex items-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl shadow-luxury hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 font-inter"
              >
                <FaPlus className="mr-3 w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Add New Book
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </Link>

              <button className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 font-inter">
                <HiViewGrid className="mr-3 w-5 h-5" />
                Browse Library
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-500/20 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2 font-lora">
                {books.length}
              </div>
              <div className="text-slate-600 font-inter">
                {books.length === 1 ? 'Book' : 'Books'} in Library
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary-600 mb-2 font-lora">
                100%
              </div>
              <div className="text-slate-600 font-inter">
                Digital Organization
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-600 mb-2 font-lora">
                24/7
              </div>
              <div className="text-slate-600 font-inter">
                Access Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            {/* View Toggle */}
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-slate-900 font-lora">Library View</h2>
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setShowType('card')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 font-medium font-inter ${
                    showType === 'card'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <HiViewGrid className="w-4 h-4" />
                  Cards
                </button>
                <button
                  onClick={() => setShowType('table')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 font-medium font-inter ${
                    showType === 'table'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <HiViewList className="w-4 h-4" />
                  Table
                </button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64 font-inter"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Spinner size="lg" message="Loading your library..." />
          </div>
        ) : (
          <div className="animate-fade-in">
            {showType === 'table' ? (
              <BookTable books={books} />
            ) : (
              <BookCard books={books} />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
