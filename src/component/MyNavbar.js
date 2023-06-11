import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from '../context/Firebase';

const MyNavbar = () => {
    const firebase=useFirebase();
  return (
    <div>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {firebase.isLoggedIn?(
              <Nav>
               <Nav.Link href="/logout">Logout</Nav.Link> 
               <Nav.Link href="/book/list">Add Listing</Nav.Link>
               <Nav.Link href='/book/orders'>Orders</Nav.Link>
               </Nav>
            ):(<Nav>
                <Nav.Link href="/register">Register</Nav.Link> 
                <Nav.Link href="/login">Login</Nav.Link> 
                
                </Nav>
            )}
            
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default MyNavbar