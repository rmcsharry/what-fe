import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

function PrimaryNavbar({ currentUser, submitLogout }) {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>{currentUser ? "What.Test - Richard McSharry" : "Authentication App"}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {currentUser && (
              <form onSubmit={submitLogout}>
                <Button type="submit" variant="light">Log out</Button>
              </form>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PrimaryNavbar;