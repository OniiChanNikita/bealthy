import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Card } from 'react-bootstrap';

export const MessageTest = () => {
  const [filledForm, setFilledForm] = useState(false);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [receiver, setReceiver] = useState('');
  const [room, setRoom] = useState('test');
  const client = useRef(null);

  useEffect(() => {

    const token = localStorage.getItem('access_token');  // замените на фактический токен

    client.current = new W3CWebSocket(`ws://127.0.0.1:8000/ws/${room}/?token=${token}`);

    client.current.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.current.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { msg: dataFromServer.text, name: dataFromServer.sender },
        ]);
      }
    };

    return () => {
      if (client.current) {
        client.current.close();
      }
    };
  }, [room]);

  const onButtonClicked = (e) => {
    e.preventDefault();
    client.current.send(
      JSON.stringify({
        type: "message",
        text: value,
        sender: name,
        receiver: receiver,
      })
    );
    setValue("");
  };

  return (
    <Container className="mt-5">
      {filledForm ? (
        <div style={{ marginTop: 50 }}>
          <h4>Room Name: {room}</h4>
          <div style={{ height: 500, maxHeight: 500, overflow: "auto", boxShadow: "none" }}>
            {messages.map((message, index) => (
              <Card key={index} className="mb-2">
                <Card.Body>
                  <Card.Title>{message.name}</Card.Title>
                  <Card.Text>{message.msg}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
          <Form onSubmit={onButtonClicked} className="mt-3">
            <Form.Group controlId="formMessage">
              <Form.Label>Write text</Form.Label>
              <Form.Control type="text" placeholder="Enter message" value={value} onChange={(e) => setValue(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2">Send Message</Button>
          </Form>
        </div>
      ) : (
        <div>
          <Form className="mt-5" onSubmit={(e) => { e.preventDefault(); setFilledForm(true); }}>
            <Form.Group controlId="formRoom">
              <Form.Label>Room name</Form.Label>
              <Form.Control type="text" placeholder="Enter room name" value={room} onChange={(e) => setRoom(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formSender">
              <Form.Label>Sender</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formReceiver">
              <Form.Label>Receiver</Form.Label>
              <Form.Control type="text" placeholder="Enter receiver's name" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2">Submit</Button>
          </Form>
        </div>
      )}
    </Container>
  );
};

