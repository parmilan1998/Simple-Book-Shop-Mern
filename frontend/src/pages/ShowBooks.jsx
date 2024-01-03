import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom'

const ShowBooks = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState()
  const { id } = useParams()
  useEffect(() => {
    setLoading(true)
    axios
      .get(`https://mern-book-store-8e39.onrender.com/books/${id}`)
      .then((res) => {
        setBooks(res.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [id])
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col justify-center items-center py-5 pb-10 font-poppins'>
          <span className='text-2xl text-center py-8'>Book Details</span>
          <div className='card bg-base-100 px-4 shadow-md border border-sky-200'>
            <div className='card-body'>
              <div className='mb-4'>
                <span className='text-lg'>Book Title: </span>
                <span className='px-3'>{books.title}</span>
              </div>
              <div className='mb-4'>
                <span className='text-lg'>Author: </span>
                <span className='px-3'>{books.author}</span>
              </div>
              <div className='mb-4'>
                <span className='text-lg'>Published Year: </span>
                <span className='px-3'>{books.publishedYear}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBooks
