import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, ListGroup, Card, Form, Button, Image } from 'react-bootstrap';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const MessageBox = (props) => {
  const [chatMessages, setChatMessages] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  /*const [receiver, setReceiver] = useState('');*/

  const client = useRef(null);
  const room = useParams().slug;

  console.log(localStorage.getItem('username'))



  useEffect(() =>{
    if (props.selectedUser.selectedUser){
      const funcGetChats = async () =>{
        console.log(props.selectedUser.selectedUser)
        const response_messages = await axios.post('http://localhost:8000/getMessage/', {'name': props.selectedUser.selectedUser.user.name},
            {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
          });
        console.log(response_messages)
        setChatMessages(response_messages.data)
      }
      funcGetChats()

    }
    
  }, [props.selectedUser.selectedUser])

    useEffect(() => {


    const token = localStorage.getItem('access_token');  // замените на фактический токен

    client.current = new W3CWebSocket(`ws://127.0.0.1:8000/ws/${room}/?token=${token}`);

    client.current.onopen = () => {
      console.log("WebSocket Client Connected", chatMessages);
    };

    client.current.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        if (dataFromServer.sender == localStorage.getItem("username")){
          setChatMessages((prevMessages) => [
            ...prevMessages,
            { conversation: props.selectedUser.selectedUser.conversation, content: dataFromServer.message, sender: props.yourUser.yourUser},
          ]);
        }else{
          setChatMessages((prevMessages) => [
            ...prevMessages,
            { conversation: props.selectedUser.selectedUser.conversation, content: dataFromServer.message, sender: props.selectedUser.selectedUser.user},
          ]);
        }



        
      }
    };

    return () => {
      if (client.current) {
        client.current.close();
      }
    };
  }, [chatMessages]);


  const onButtonClicked = (e) => {
    e.preventDefault();
    client.current.send(
      JSON.stringify({
        type: "message",
        message: newMessage,
        sender: localStorage.getItem('username'),
        /*receiver: props.selectedUser.selectedUser.user.name.username,*/
      })
    );
    setNewMessage("");
  };

  if (chatMessages) {
    return (
      <div>
        <Card.Title className="mb-3">{props.selectedUser.selectedUser.user.name.username}</Card.Title>
        <div style={{ height: '300px', overflowY: 'scroll', marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd' }}>
          {chatMessages.map((message, index) => (
            <Col 
              key={index} 
              className={`mb-2 p-2 rounded ${message.sender.name['username'] == localStorage.getItem('username') ? 'bg-primary text-white text-end ms-auto ' : 'bg-light text-start mr-auto'}`}
              style={{ minWidth: '20%', width: '20%' }}
              >
              {message.content}
            </Col>
          ))}
        </div>
      <Form onSubmit={onButtonClicked}>
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
    </div>
  );}
}

export default MessageBox