import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

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
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  return (
    <div className='flex justify-center items-center'>
      <h3 className='text-2xl my-3'>Delete Book</h3>
      <div>Hello</div>
    </div>
  )
}

export default DeleteBook
