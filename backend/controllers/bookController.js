import Book from '../models/bookModel.js'

// Create a new Book
export const createBooks = async (req, res) => {
  try {
    // Check the required fields
    const { title, author, publishedYear } = req.body
    if (!title || !author || !publishedYear) {
      return res.status(400).json({ message: 'Send all the required fields' })
    }

    // Create Book Object
    const newBook = {
      title,
      author,
      publishedYear,
    }

    // Create Book Model
    const books = await Book.create(newBook)

    // Book created successful response
    return res.status(201).json(books)
  } catch (error) {
    console.log(error.message)
    return res.status(500).send({ message: error.message })
  }
}

// Gets the books
export const getBooks = async (req, res) => {
  try {
    // Find books from mongodb
    const books = await Book.find({})
    return res.status(200).json({
      count: books.length,
      data: books,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: error.message })
  }
}

// Get the books by using id
export const getBooksById = async (req, res) => {
  try {
    const { id } = req.params
    const book = await Book.findById(id)
    return res.status(200).json(book)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: error.message })
  }
}

// Update book
export const updateBook = async (req, res) => {
  try {
    //  Check if all required fields are provided
    const { title, author, publishedYear } = req.body
    if (!title || !author || !publishedYear) {
      return res.status(400).send({ message: 'Send all the required fields' })
    }

    const { id } = req.params

    //Find and update the book
    const result = await Book.findByIdAndUpdate(id, req.body)

    // Check
    if (!result) {
      return res.status(404).json({ message: 'Book not found' })
    }

    // Update Successfully
    return res.status(200).json({ message: 'Book Update Successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
}

// Delete a book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params

    const result = await Book.findByIdAndDelete(id)

    // Check the book
    if (!result) {
      return res.status(404).json({
        message: 'Book not found',
      })
    }
    // Delete the book message
    return res.status(200).send({ message: 'Book Deleted Successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
}
