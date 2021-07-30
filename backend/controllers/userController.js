import User from '../models/userModel.js'
import asycHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @des     Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asycHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})

// @des    Register a New User
// @route   POST /api/users
// @access  Public
const registerUser = asycHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User Already Exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

const getFavourites = asycHandler(async (req, res) => {
  const { userID } = req.body
  const favourite = await Favourite.find({ userID: userID })

  if (favourite) {
    res.json(favourite)
  } else {
    res.json('not found')
  }
})

const addFavourite = asycHandler(async (req, res) => {
  const { userID, movie } = req.body

  const existMovie = await Favourite.find({
    userID: userID,
    imdbID: movie.imdbID,
  })

  if (existMovie) {
    res.json('already exists...')
  } else {
    const favourite = new Favourite({
      userID: userID,
      Title: movie.Title,
      Type: movie.Type,
      Year: movie.Year,
      imdbID: movie.imdbID,
    })

    const createdFavourite = await favourite.save()
    res.status(201).json(createdFavourite)
  }
})

const deleteFavourite = asycHandler(async (req, res) => {
  const { userID, imdbID } = req.body
  const favourite = await Favourite.find({ userID: userID, imdbID: imdbID })

  if (favourite) {
    await favourite.remove()
    res.json({ message: 'favourite Removed' })
  } else {
    res.json({ message: 'favourite not found' })
  }
})

export { authUser, registerUser, getFavourites, addFavourite, deleteFavourite }
