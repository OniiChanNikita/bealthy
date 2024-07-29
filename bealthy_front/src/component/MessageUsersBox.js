import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Card, Form, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const users = [
  { id: 1, name: 'Alice', avatar: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Bob', avatar: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Charlie', avatar: 'https://via.placeholder.com/50' }
];

const messages = {
  1: [
    { text: 'Hello Alice!', fromMe: false },
    { text: 'How are you?', fromMe: true }
  ],
  2: [
    { text: 'Hi Bob!', fromMe: false },
    { text: 'What\'s up?', fromMe: true }
  ],
  3: [
    { text: 'Hey Charlie!', fromMe: false },
    { text: 'Long time no see!', fromMe: true }
  ]
};

export const MessageUsersBox = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState()

  useEffect(() =>{
    const funcGetChats = async () =>{
      const response = await axios.get('http://localhost:8000/getChats/', 
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
      });
      setChats(response)
      console.log(response)
      
    }
    funcGetChats()
  }, [])

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      messages[selectedUser.id].push({ text: newMessage, fromMe: true });
      setNewMessage('');
    }
  };

  return (
    <Container className="my-5 w-90">
      <Row className="justify-content-center">
        <Col md={3}>
          <Card className="border-0 shadow-lg rounded overflow-hidden">
            <Card.Body>
              <Card.Title className="mb-3">Users</Card.Title>
              <ListGroup>
                {users.map(user => (
                  <ListGroup.Item 
                    key={user.id} 
                    action 
                    onClick={() => handleUserClick(user)} 
                    active={selectedUser.id === user.id}
                    className="d-flex align-items-center overflow-hidden"
                  >
                  <Image src={user.avatar} roundedCircle className="mr-3" width="40" height="40" />
                    {user.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>

            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <Card className="border-0 shadow-lg rounded overflow-hidden">
            <Card.Body>
              <Card.Title className="mb-3">{selectedUser.name}</Card.Title>
              <div style={{ height: '300px', overflowY: 'scroll', marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd' }}>
                {messages[selectedUser.id].map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-2 p-2 rounded ${message.fromMe ? 'bg-primary text-white text-right ml-auto' : 'bg-light text-left mr-auto'}`}
                    style={{ maxWidth: '80%' }}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
              <Form onSubmit={handleSendMessage}>
                <Form.Group controlId="messageTextarea">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                  Send
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

