import Book from '../models/bookModel.js'

const createBooks = async (req, res) => {
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
    const book = await Book.create(newBook)

    // Book created successful response
    return res.status(201).json(book)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default createBooks
