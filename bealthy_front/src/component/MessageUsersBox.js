import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Card, Form, Button, Image } from 'react-bootstrap';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import MessageBox from './MessageBox'

export const MessageUsersBox = () => {
  const [chats, setChats] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null);
  const [yourUser, setYourUser] = useState(null)
  const [participant, setParticipant] = useState(null)



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
      setSelectedUser(response.data[0])
    }
    funcGetChats()
  }, [])

  useEffect(() =>{
    const funcGetChats = async () =>{
      const response = await axios.get('http://localhost:8000/data/user/', //get participant
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
      });
      console.log(response.data)
      setYourUser(response.data)
    }
    funcGetChats()
  }, [])

  
  if (!chats || !selectedUser) {
    return <LoadingSpinner/>
  }
  else{
    console.log(chats)
    console.log(selectedUser)
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
                    style={{padding: "", paddingBottom: '10px'}}
                    key={userChat.user.name.id} 
                    //onClick={() => handleUserClick(userChat)} 
                    active={selectedUser.user.name.id === userChat.user.name.id}
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
            <MessageBox 
             selectedUser={{selectedUser}}
             yourUser={{yourUser}}
             />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

