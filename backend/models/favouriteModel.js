import mongoose from 'mongoose'

const favouriteSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Year: {
      type: String,
      required: true,
    },
    Type: {
      type: String,
      required: true,
    },
    imdbID: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Favourite = mongoose.model('Favourites', favouriteSchema)

export default Favourite
