import express from 'express'
import {
  addFavourite,
  authUser,
  getFavourites,
  deleteFavourite,
  registerUser,
} from '../controllers/userController.js'

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router.get('/favourites', getFavourites)
router.post('/addFavourite', addFavourite)
router.delete('/deleteFavourite', deleteFavourite)

export default router
