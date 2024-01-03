import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoMdAddCircleOutline } from 'react-icons/io'
import BookTable from '../components/BookTable'
import BookCard from '../components/BookCard'

const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [showType, setShowType] = useState('table')

  // Get the book details
  useEffect(() => {
    setLoading(true)
    axios
      .get('https://mern-book-store-8e39.onrender.com/books')
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
    <div className='max-w-screen-2xl mx-auto lg:px-24 px-4 font-poppins py-16'>
      <div className='flex justify-center items-center gap-3'>
        <button
          onClick={() => setShowType('table')}
          className='px-6 py-2 rounded-full bg-sky-800 text-white cursor-pointer hover:bg-sky-500 ease-in duration-300'
        >
          Table
        </button>
        <button
          onClick={() => setShowType('card')}
          className='px-6 py-2 rounded-full bg-sky-800 text-white cursor-pointer hover:bg-sky-500 ease-in duration-300'
        >
          Card
        </button>
      </div>
      <div className='mx-4 flex justify-end'>
        <Link to={`/books/create`}>
          <IoMdAddCircleOutline size={30} />
        </Link>
      </div>
      <div className='overflow-x-auto overflow-y-hidden'>
        {loading ? (
          <Spinner />
        ) : showType === 'table' ? (
          <BookTable books={books} />
        ) : (
          <BookCard books={books} />
        )}
      </div>
    </div>
  )
}

export default Home
