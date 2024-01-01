/* eslint-disable react/prop-types */
import React from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Card = ({ book }) => {
  return (
    <div>
      <div className='card  h-40 bg-base-100 shadow-xl hover:bg-sky-500 hover:text-white ease-in duration-200'>
        <div className='card-body'>
          <h2 className='card-title'>
            {book.title}
            <div className='badge badge-secondary'>{book.publishedYear}</div>
          </h2>
          <p>{book.author}</p>
          <div className='card-actions justify-end gap-4'>
            <div>
              <Link to={`/books/details/${book._id}`}>
                <BsInfoCircle size={24} color='blue' />
              </Link>
            </div>
            <div>
              <Link to={`/books/update/${book._id}`}>
                <FaEdit size={24} color='green' />
              </Link>
            </div>
            <div>
              <Link to={`/books/delete/${book._id}`}>
                <MdDelete size={24} color='red' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
