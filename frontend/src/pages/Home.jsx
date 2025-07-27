import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { HiViewGrid, HiViewList } from 'react-icons/hi'
import { FaPlus } from 'react-icons/fa'
import BookTable from '../components/BookTable'
import BookCard from '../components/BookCard'
import FloatingActionButton from '../components/FloatingActionButton'
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-screen-2xl mx-auto lg:px-24 px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 font-poppins">
              Your Digital Library
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Organize, discover, and manage your book collection with ease
            </p>
            <Link
              to="/books/create"
              className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100 border-none shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaPlus className="mr-2" />
              Add New Book
            </Link>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-screen-2xl mx-auto lg:px-24 px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium mr-3">View:</span>
              <div className="btn-group">
                <button
                  onClick={() => setShowType('card')}
                  className={`btn btn-sm ${
                    showType === 'card'
                      ? 'btn-primary'
                      : 'btn-outline btn-primary'
                  } transition-all duration-200`}
                >
                  <HiViewGrid className="mr-2" />
                  Cards
                </button>
                <button
                  onClick={() => setShowType('table')}
                  className={`btn btn-sm ${
                    showType === 'table'
                      ? 'btn-primary'
                      : 'btn-outline btn-primary'
                  } transition-all duration-200`}
                >
                  <HiViewList className="mr-2" />
                  Table
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                {books.length} {books.length === 1 ? 'Book' : 'Books'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-screen-2xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Spinner />
          </div>
        ) : showType === 'table' ? (
          <div className="lg:px-24 px-6 py-8">
            <BookTable books={books} />
          </div>
        ) : (
          <BookCard books={books} />
        )}
      </div>

      {/* Floating Action Button */}
      {/* <FloatingActionButton
        to="/books/create"
        icon={<FaPlus size={20} />}
        label="Add New Book"
        variant="primary"
        size="lg"
      /> */}
    </div>
  )
}

export default Home
