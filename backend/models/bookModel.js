import mongoose from 'mongoose'

const bookSchema = mongoose.Schema(
  {
    title: {
      type: 'string',
      required: true,
    },
    author: {
      type: 'string',
      required: true,
    },
    publishedYear: {
      type: 'number',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Book = mongoose.model('Book', bookSchema)

export default Book
