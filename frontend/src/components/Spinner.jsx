import React from 'react'
import GridLoader from 'react-spinners/GridLoader'

const Spinner = () => {
  return (
    <div className='flex justify-center items-center'>
      <GridLoader color='hsla(256, 67%, 53%, 1)' />
    </div>
  )
}

export default Spinner
