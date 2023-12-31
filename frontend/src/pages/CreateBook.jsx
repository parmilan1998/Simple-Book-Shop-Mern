import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

const CreateBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSaveBook = () => {
    const data = { title, author, publishedYear }
    setLoading(true)
    axios
      .post(`http://localhost:5000/books`, data)
      .then(() => {
        setLoading(false)
        navigate('/')
        toast.success('🦄 Book Added Successfully', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
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
        <div className='px-4 py-20 flex justify-center items-center font-poppins'>
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
                  type='text'
                  placeholder='Enter the published Year'
                  className='input-bordered py-2 px-3 rounded-lg focus:outline-none border border-gray-300 leading-normal'
                  required
                  value={publishedYear}
                  onChange={(e) => setPublishedYear(e.target.value)}
                />
              </div>
              <div className='form-control mt-6'>
                <button
                  onClick={handleSaveBook}
                  className='bg-sky-700 py-2 rounded-lg text-white hover:bg-sky-500 ease-in duration-300'
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateBook
