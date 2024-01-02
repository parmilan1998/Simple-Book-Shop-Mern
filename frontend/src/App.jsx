import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RootLayout from './Layouts/RootLayout'
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import UpdateBook from './pages/UpdateBook'
import ShowBooks from './pages/ShowBooks'
import DeleteBook from './pages/DeleteBook'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/books/create' element={<CreateBook />} />
            <Route path='/books/update/:id' element={<UpdateBook />} />
            <Route path='/books/details/:id' element={<ShowBooks />} />
            <Route path='/books/delete/:id' element={<DeleteBook />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
