/* eslint-disable react/prop-types */
import { FaBook, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Card from './Card'

const BookCard = ({ books }) => {
  if (!books || books.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-full mb-8">
            <FaBook className="text-4xl text-slate-400" />
          </div>

          <h3 className="text-3xl font-bold text-slate-900 mb-4 font-lora">
            Your Library Awaits
          </h3>

          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto font-inter">
            Start building your digital library by adding your first book.
            Organize, track, and discover books with ease.
          </p>

          <Link
            to="/books/create"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-inter"
          >
            <FaPlus className="w-5 h-5 mr-2" />
            Add Your First Book
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-lora">
          Your Book Collection
        </h2>
        <p className="text-lg text-slate-700 max-w-3xl mx-auto font-inter">
          Explore and manage your carefully curated library of books.
          Each book tells a story, and together they tell yours.
        </p>
      </div>

      {/* Books Grid - 3 cards per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {books.map((book, index) => (
          <div
            key={book._id || index}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Card book={book} />
          </div>
        ))}
      </div>

      {/* Collection Stats */}
      {books.length > 0 && (
        <div className="bg-white rounded-2xl shadow-elegant p-8 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2 font-lora">
                {books.length}
              </div>
              <div className="text-slate-600 font-inter">
                {books.length === 1 ? 'Book' : 'Books'} in Collection
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold text-secondary-600 mb-2 font-lora">
                {new Set(books.map(book => book.author)).size}
              </div>
              <div className="text-slate-600 font-inter">
                Unique Authors
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold text-accent-600 mb-2 font-lora">
                {new Date().getFullYear() - Math.min(...books.map(book => book.publishedYear))}+
              </div>
              <div className="text-slate-600 font-inter">
                Years of Literature
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookCard
