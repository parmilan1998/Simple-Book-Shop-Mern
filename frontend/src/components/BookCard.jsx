/* eslint-disable react/prop-types */
import React from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Card from './Card'

const BookCard = ({ books }) => {
  return (
    <div className='max-w-screen-2xl mx-auto lg:px-24 px-6 font-poppins py-16'>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8'>
        {books.map((book, index) => (
          <Card key={index} book={book} />
        ))}
      </div>
    </div>
  )
}

export default BookCard
