import { Router } from 'express'
import {
  createBooks,
  getBooks,
  getBooksById,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js'

const router = Router()

router.route('/').post(createBooks)
router.route('/').get(getBooks)
router.route('/:id').get(getBooksById)
router.route('/:id').put(updateBook)
router.route('/:id').delete(deleteBook)

export default router
