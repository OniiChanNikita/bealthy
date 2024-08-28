import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Card, Form, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

export const MessageUsersVoidBox = () => {
  const [chats, setChats] = useState(null)



  useEffect(() =>{
    const funcGetChats = async () =>{
      const response = await axios.get('http://localhost:8000/getChats/', //get participant
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
      });
      setChats(response.data)
    }
    funcGetChats()
  }, [])

  

 /* useEffect(() => {
    //if newMessage !== null 
  }, [setNewMessage])*/


  

  

 /* const handleUserClick = (user) => {
    setSelectedUser(user);
  };*/

  if (!chats) {
    return <LoadingSpinner/>
  }
  else{
    console.log(chats)
  }
  return (
    <Container className="my-5 w-90">
      <Row className="justify-content-center">
        <Col md={3}>
          <Card className="border-0 shadow-lg rounded overflow-hidden">
            <Card.Body>
              <Card.Title className="mb-3">Users</Card.Title>
              <ListGroup>
                {chats.map(userChat => (
                  <ListGroup.Item 
                    style={{padding: ""}}
                    key={userChat.user.name.id} 
                    //onClick={() => handleUserClick(userChat)} 
                    active
                    className="d-flex align-items-center overflow-hidden"
                  >
                  <Link to={'/message/t/'+userChat.conversation.id_chat} style={{margin: "5px", width: '100%', color: 'white', textDecoration: 'none'}}>
                  <Image  roundedCircle className="mr-3" width="40" height="40" />
                    &nbsp;{userChat.user.name.username}
                  </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>

            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <Card className="border-0 shadow-lg rounded overflow-hidden">
            <Card.Body style={{minHeight: '500px'}}>
            
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

