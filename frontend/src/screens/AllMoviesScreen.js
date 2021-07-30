import React, { useState, useEffect } from 'react'
import Movie from '../components/Movie'
import Search from '../components/Search'
import axios from 'axios'
import AddFavourites from '../components/AddFavourites'
import RemoveFavourites from '../components/RemoveFavourites'

const AllMoviesScreen = ({ history }) => {
  const [movies, setMovies] = useState([])
  const [favourites, setFavourites] = useState([])
  const [searchValue, setSearchValue] = useState('star')

  let user

  useEffect(() => {
    user = JSON.parse(localStorage.getItem('userInfo'))

    if (!user) {
      history.push('/')
    }
  }, [])

  const cancelToken = axios.CancelToken.source()

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=df6adc6e`

    const response = await axios.get(url, { cancelToken: cancelToken.token })

    if (response.data.Search) {
      setMovies(response.data.Search)
    }
  }

  useEffect(() => {
    getMovieRequest(searchValue)
    return () => cancelToken.cancel('cancelling prevoius requests!!!!!')
  }, [searchValue])

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('movie-favourites'))

    if (movieFavourites) {
      setFavourites(movieFavourites)
    }
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    history.push('/')
  }

  const saveToLocalStorage = (items) => {
    localStorage.setItem('movie-favourites', JSON.stringify(items))
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
    alert('Added to Favourites!!!!')
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    )

    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }

  const gotoFav = () => {
    document.getElementById('favourite').scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <header>
        <div className='search-container'>
          <span style={{ marginRight: 'auto' }} className='title'>
            OMDB
          </span>
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
          <a
            href='#favourite'
            style={{
              margin: '0px 10px',
              fontSize: '20px',
              cursor: 'pointer',
              color: 'white',
            }}
            className='title'
            onClick={(e) => gotoFav}
          >
            Favourites
          </a>
          <span
            style={{ margin: '0px 10px', fontSize: '20px', cursor: 'pointer' }}
            className='title'
            onClick={logoutHandler}
          >
            Logout
          </span>
        </div>
      </header>

      <div style={{ marginLeft: '15px' }}>
        <Movie
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>

      <span
        style={{ margin: '30px', marginRight: 'auto', fontWeight: '700' }}
        className='title'
        id='favourite'
      >
        Favourites
      </span>

      <div style={{ marginLeft: '15px' }}>
        <Movie
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  )
}

export default AllMoviesScreen
