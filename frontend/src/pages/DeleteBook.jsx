import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const handleDeleteBook = () => {
    setLoading(true)
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false)
        toast.success('Book Deleted Successfully', {
          position: 'top-center',
          autoClose: 5000,
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
        console.log(error)
      })
  }

  return (
    <div className='flex flex-col justify-center items-center font-poppins py-20'>
      <h3 className='text-2xl my-3'>Delete Book</h3>
      {loading ? (
        <Spinner />
      ) : (
        <div className='py-14 flex flex-col justify-center items-center shadow-sm bg-gray-200 rounded-xl mx-4'>
          <span className='text-xl px-8 py-6 text-center'>
            Are You want sure Delete this book?
          </span>
          <button
            onClick={handleDeleteBook}
            className='px-6 py-2 bg-red-700 text-white text-lg rounded-md hover:bg-red-400 ease-in duration-200'
          >
            Yes, Delete it ?
          </button>
        </div>
      )}
    </div>
  )
}

export default DeleteBook
