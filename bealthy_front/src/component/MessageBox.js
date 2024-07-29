import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Card, Form, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const messages = {
  1: ['Hello Alice!', 'How are you?'],
  2: ['Hi Bob!', 'What\'s up?'],
  3: ['Hey Charlie!', 'Long time no see!']
};

export const MessageBox = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [newMessage, setNewMessage] = useState('');

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
                    className="d-flex align-items-center"
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

