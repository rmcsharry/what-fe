import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import RegisterLoginButton from './RegisterLoginButton';

function PrimaryNavbar({ currentUser, submitLogout }) {
  const userEmail = localStorage.getItem('userEmail');

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>What.Test</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {currentUser && userEmail}
          </Navbar.Text>
          <Navbar.Text className="ms-4">
            {currentUser ? (
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