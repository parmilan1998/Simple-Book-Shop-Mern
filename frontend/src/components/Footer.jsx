import React from 'react'

const Footer = () => {
  return (
    <div className='bg-sky-800'>
      <div className=' max-w-screen-2xl mx-auto lg:px-24 px-4'>
        <footer className='footer pt-10 text-base-content font-poppins grid lg:col-span-4 md:col-span-2 sm:col-span-1'>
          <aside>
            <a className='text-2xl font-bold'>
              Quill<span className=' text-white'>Quest</span>
            </a>
            <p className='text-base text-gray-400'>DuoCode Innovation.</p>
          </aside>
          <nav>
            <header className='text-white text-xl font-semibold'>
              Services
            </header>
            <a className='link link-hover text-base font-normal py-1 text-gray-400'>
              Branding
            </a>
            <a className='link link-hover text-base font-normal py-1 text-gray-400'>
              Design
            </a>
            <a className='link link-hover text-base font-normal py-1 text-gray-400'>
              Marketing
            </a>
            <a className='link link-hover text-base font-normal py-1 text-gray-400'>
              Advertisement
            </a>
          </nav>
          <nav>
            <header className='text-white text-xl font-semibold'>
              Company
            </header>
            <a className='link link-hover text-base font-normal py-1 text-gray-400'>
              About us
            </a>
            <a className='link link-hover text-base font-normal py-1 text-gray-400'>
              Contact
            </a>
            <a className='link link-hover text-base font-normal py-1 text-gray-400'>
              Jobs
            </a>
            <a className='link link-hover text-base font-normal py-1 text-gray-400'>
              Press kit
            </a>
          </nav>
          <nav>
            <header className='text-white text-xl font-semibold'>Legal</header>
            <a className='link link-hover text-base font-normal py-1 text-gray-400'>
              Terms of use
            </a>
            <a className='link link-hover text-base font-normal py-1 text-gray-400'>
              Privacy policy
            </a>
            <a className='link link-hover text-base font-normal py-1 text-gray-400'>
              Cookie policy
            </a>
          </nav>
        </footer>
        <div className="divider"></div> 
        <footer className='footer footer-center pb-4 font-poppins text-base-content'>
          <aside>
            <p className='text-base text-gray-400 py-3'>
              Copyright © 2023 - All right reserved by DuoCode Innovation
            </p>
          </aside>
        </footer>
      </div>
    </div>
  )
}

export default Footer
