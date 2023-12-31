import React from 'react'

const Header = () => {
  const navList = [
    <>
      <li className='text-base'>
        <a>Home</a>
      </li>
      <li className='text-base'>
        <a>Store</a>
      </li>
      <li className='text-base'>
        <a>Contact Us</a>
      </li>
      <li className='text-base'>
        <a>Blog</a>
      </li>
    </>,
  ]
  return (
    <div className='max-w-screen-2xl mx-auto lg:px-24 px-4 font-poppins bg-gray-100'>
      <div className='navbar'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              {navList}
            </ul>
          </div>
          <a className='text-2xl font-bold' href='/'>
            Quill<span className=' text-sky-600'>Quest</span>
          </a>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>{navList}</ul>
        </div>
        <div className='navbar-end'>
          <a className='px-6 py-2 rounded-full bg-sky-800 text-white cursor-pointer hover:bg-sky-500 ease-in duration-300'>
            Login
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header
