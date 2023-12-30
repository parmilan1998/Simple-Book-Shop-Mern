import express from 'express'
import colors from 'colors'
import mongoose from 'mongoose'
import { PORT, MONGODB_URL } from './Config.js'

// Initialize the express App
const app = express()

// Sample APT configuration
app.get('/', (req, res) => {
  console.log(`API is running successfully!..`.blue.bold)
})

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
