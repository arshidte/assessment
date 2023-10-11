import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../Slices/userSlice";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const { userInfo } = useSelector((state) => state.login);


  const { userInfo: userInfoAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo != null || userInfoAuth != null) {
      navigate("/");
    }
  }, [userInfo, navigate, userInfoAuth]);


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the loginUser action
      await dispatch(loginUser({ email, password }));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Container>
      <h4 className="mt-5">Login</h4>

      <Form onSubmit={submitHandler}>
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
          Login
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New here? <Link to={"/register"}>Register</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
