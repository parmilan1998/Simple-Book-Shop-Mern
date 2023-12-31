import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { BsInfoCircle } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { IoMdAddCircleOutline } from 'react-icons/io'

const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios
      .get('http://localhost:5000/books')
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
      <div className='flex justify-end mx-5'>
        <Link to={`/books/create`}>
          <IoMdAddCircleOutline size={25} />
        </Link>
      </div>
      <div className='overflow-x-auto overflow-y-hidden'>
        {loading ? (
          <Spinner />
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th className='text-base'>No</th>
                <th className='text-base'>Title</th>
                <th className='text-base'>Author</th>
                <th className='text-base'>Publish Year</th>
                <th className='text-base'>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <h2 className='font-bold'>{book.title}</h2>
                  </td>
                  <td>
                    {book.author}
                    <br />
                    <span className='badge badge-ghost badge-sm'>
                      Community Outreach Specialist
                    </span>
                  </td>
                  <td>{book.publishedYear}</td>
                  <th>
                    <div className='flex gap-6'>
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle size={24} color='blue' />
                      </Link>
                      <Link to={`/books/update/${book._id}`}>
                        <FaEdit size={24} color='green' />
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdDelete size={24} color='red' />
                      </Link>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        )}
      </div>
    </div>
  )
}

export default Home
