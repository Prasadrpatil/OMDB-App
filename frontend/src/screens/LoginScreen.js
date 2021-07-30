import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import axios from 'axios'

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, seterror] = useState('')
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'))

    if (user) {
      history.push('/movies')
    }
  }, [])

  const submitHandler = async (e) => {
    setloading(true)
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    seterror('')
    const res = await axios
      .post('/api/users/login', { email, password }, config)
      .then(({ data }) => {
        localStorage.setItem('userInfo', JSON.stringify(data))
        history.push('/movies')
        setloading(false)
      })
      .catch((error) => {
        error.response && error.response.data.message
          ? seterror(error.response.data.message)
          : seterror(error.response)

        setloading(false)
      })
  }

  return (
    <>
      <FormContainer>
        <h1 style={{ color: 'white' }} className='mt-5'>
          Sign In
        </h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='btn-block'>
            Log In
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link to={'/register'} style={{ color: 'white' }}>
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default LoginScreen
