import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect} from 'react';
import axios from 'axios'

export function Navigation() {   
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);
  return ( 
    <div>
      <Navbar bg="dark" variant="dark" >
        <Nav className="me-auto"> 
        {isAuth ? <Nav.Link href="/post">Home</Nav.Link> : null}
        </Nav>
        <Nav>
        {isAuth ? <Nav.Link href="/logout">Logout</Nav.Link> :  
                  <Nav.Link href="/login">Login</Nav.Link>}
        </Nav>
        <Nav>
        {isAuth ? <Nav.Link href="/profile">{localStorage.getItem('username')}</Nav.Link> : null}
        </Nav>
      </Navbar>
     </div>
   );
}
