import React from 'react'

const Movie = (props) => {
  const FavouriteComponent = props.favouriteComponent
  return (
    <div className='movie-container'>
      {props?.movies?.map((movie, index) => (
        <div className='movie'>
          <img src={movie.Poster} alt={movie.Title} />
          <div className='movie-info'>
            <span className='movie-title'>{movie.Title}</span>
          </div>
          <div className='movie-over'>
            <h5>Overview:</h5>
            <span className='movie-title'>Title: {movie.Title}</span>
            <br />
            <span className='movie-title'>Type: {movie.Type}</span>
            <br />
            <span className='movie-title'>Year: {movie.Year}</span>
            <br />
            <span className='movie-title'>imdbID: {movie.imdbID}</span>
            <br />
            <br />

            <div
              onClick={() => props.handleFavouritesClick(movie)}
              style={{ cursor: 'pointer' }}
            >
              <FavouriteComponent />
            </div>

            <br />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Movie
