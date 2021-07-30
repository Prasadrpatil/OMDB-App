import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import AllMoviesScreen from './screens/AllMoviesScreen'

const App = () => {
  return (
    <Router>
      <main>
        <>
          <Route path='/register' component={RegisterScreen} />
          <Route path='/movies' component={AllMoviesScreen} />
          <Route path='/' component={LoginScreen} exact />
        </>
      </main>
    </Router>
  )
}

export default App
