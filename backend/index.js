import express from 'express'
import colors from 'colors'
import mongoose from 'mongoose'
import { PORT, MONGODB_URL } from './Config.js'
import bookRoute from './routes/bookRoute.js'
import cors from 'cors'

// Initialize the express App
const app = express()

// Middleware for request body
app.use(express.json())

// middleware for cors policy
app.use(cors())

// Allow the custom origin
// app.use({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowHeaders: ['content-type'],
// })

// Sample APT configuration
app.get('/', (req, res) => {
  console.log(`API is running successfully!..`.blue.bold)
})

// Routes for Books
app.use('/books', bookRoute)

// mongoose connection
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `DB connection successfully & listening port on ${PORT}`.yellow.bold
      )
    })
  })
  .catch((error) => {
    console.log('Mongodb connection Error: ', error)
  })
