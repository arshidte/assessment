import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearUserState } from "../Slices/authSlice";
import { clearLoginState } from "../Slices/userSlice";
const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.login);
  const { userInfo:userInfoAuth } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearUserState());
    dispatch(clearLoginState());
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Assessment</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo||userInfoAuth ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>Login/Signup</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
