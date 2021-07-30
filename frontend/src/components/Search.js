import React from 'react'

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        className='search'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  )
}

export default Search
