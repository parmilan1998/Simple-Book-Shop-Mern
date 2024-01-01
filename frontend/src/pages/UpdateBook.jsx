import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

const UpdateBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  // Fetch the book Details
  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setTitle(res.data.title)
        setAuthor(res.data.author)
        setPublishedYear(res.data.publishedYear)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  const handleUpdateBook = () => {
    const data = { title, author, publishedYear }
    setLoading(true)
    axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then(() => {
        setLoading(false)
        toast.success('Book Update Successfully', {
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
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='px-4 py-20 flex flex-col justify-center items-center font-poppins'>
          <h3 className='text-2xl my-3'>Update Book</h3>
          <div className='card shrink-0 w-full max-w-md shadow-2xl bg-white'>
            <form className='card-body'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base'>Book Title</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter the title'
                  className='input-bordered py-2 px-3 rounded-lg focus:outline-none border border-gray-300 leading-normal'
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base'>Book Author</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter author name'
                  className='input-bordered py-2 px-3 rounded-lg focus:outline-none border border-gray-300 leading-normal'
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base'>Published Year</span>
                </label>
                <input
                  type='number'
                  placeholder='Enter the published Year'
                  className='input-bordered py-2 px-3 rounded-lg focus:outline-none border border-gray-300 leading-normal'
                  required
                  value={publishedYear}
                  onChange={(e) => setPublishedYear(e.target.value)}
                />
              </div>
              <div className='form-control mt-6'>
                <button
                  onClick={handleUpdateBook}
                  className='bg-sky-700 py-2 rounded-lg text-white hover:bg-sky-500 ease-in duration-300'
                >
                  Update Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateBook
