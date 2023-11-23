import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import RegisterLoginButton from './RegisterLoginButton';

function PrimaryNavbar({ isLoggedIn, submitLogout }) {

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>What.Test</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="ms-4">
            {isLoggedIn ? (
              <form onSubmit={submitLogout}>
                <Button type="submit" variant="light">Log out</Button>
              </form>
            ) : (
              <RegisterLoginButton />
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PrimaryNavbar;