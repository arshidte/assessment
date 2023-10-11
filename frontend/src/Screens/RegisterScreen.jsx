import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../Slices/authSlice';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const RegisterScreen = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.login);
  const { userInfo: userInfoAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo != null || userInfoAuth != null) {
      navigate('/');
    }
  }, [userInfo, navigate, userInfoAuth]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        // Dispatch the registerUser action
        await dispatch(registerUser({ name, email, password }));
  
        // After successful registration, immediately log in the user
        // await dispatch(loginUser({ email, password }));
      } catch (error) {
        console.error('Registration error:', error);
      }
  };

  return (
    <Container>
      <h4 className="mt-5">Register</h4>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mt-2">
          Register
        </Button>
      </Form>

      {/* <Row className="py-3">
        <Col>
          New here? <Link to={"/register"}>Register</Link>
        </Col>
      </Row> */}
    </Container>
  );
}

export default RegisterScreen;