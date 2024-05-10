import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect} from 'react';

export function Navigation() {   
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => { 
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true); 
    }
  }, [isAuth]);
  return ( 
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">JWT Authentification</Navbar.Brand>            
        <Nav className="me-auto"> 
        {isAuth ? <Nav.Link href="/">Home</Nav.Link> : null}
        </Nav>
        <Nav>
        {isAuth ? <Nav.Link href="/logout">Logout</Nav.Link> :  
                  <Nav.Link href="/login">Login</Nav.Link>}
        </Nav>
      </Navbar>
     </div>
   );
}
/*
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxNTM4NDU5NSwiaWF0IjoxNzE1Mjk4MTk1LCJqdGkiOiI0OGQyMGQ5ODQ5ZTA0YmNlOGM1NDU2ZDg2MjMyMGM4NyIsInVzZXJfaWQiOjF9.FfObZnm-P8Z1yYZQ3OAqjhBYZlBTLkQUgkAN7OVw1PY",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1MzAxNzk1LCJpYXQiOjE3MTUyOTgxOTUsImp0aSI6ImUzZDkyNGFjODg1ODRkODhhZDcwNGE3OWVlNzFhZmRiIiwidXNlcl9pZCI6MX0.HL0yReZysQ9eHt-frsa_oH_SYGjd2nSCgZHpJqqUjrs"
}*/