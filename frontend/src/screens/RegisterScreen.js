import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import axios from 'axios'

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
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
    seterror('')

    if (password !== confirmPassword) {
      setMessage('Passwords do not Match...')
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios
        .post('/api/users', { name, email, password }, config)
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
      setloading(false)
    }
  }

  return (
    <>
      <FormContainer className='py-5'>
        <h1 style={{ color: 'white' }} className='mt-5'>
          Sign Up
        </h1>
        {message ? (
          <Message variant='danger'>{message}</Message>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : loading ? (
          <Loader />
        ) : null}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

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

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='btn-block'>
            Register
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link style={{ color: 'white' }} to={'/'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default RegisterScreen
