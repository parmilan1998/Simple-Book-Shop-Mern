import { Router } from 'express'
import createBooks from '../controllers/bookController.js'

const router = Router()

router.route('/').post(createBooks)

export default router
