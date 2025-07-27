/* eslint-disable react/prop-types */
import React from 'react'
import { FaBook } from 'react-icons/fa'
import Card from './Card'

const BookCard = ({ books }) => {
  if (!books || books.length === 0) {
    return (
      <div className="max-w-screen-2xl mx-auto lg:px-24 px-6 font-poppins py-16">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <FaBook className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Books Found</h3>
          <p className="text-gray-500">Start building your library by adding some books!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto lg:px-24 px-6 font-poppins py-16">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          Book Collection
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover and manage your personal library with our curated collection of books
        </p>
        <div className="mt-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {books.length} {books.length === 1 ? 'Book' : 'Books'} Available
          </span>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {books.map((book, index) => (
          <Card key={book._id || index} book={book} />
        ))}
      </div>

      {/* Load More Section (for future pagination) */}
      {books.length > 0 && (
        <div className="mt-16 text-center">
          <div className="inline-flex items-center text-gray-500 text-sm">
            <span className="w-16 h-px bg-gray-300 mr-3"></span>
            Showing all books
            <span className="w-16 h-px bg-gray-300 ml-3"></span>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookCard
