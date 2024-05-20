// Import the react JS packages 
import axios from "axios";
import { useState, useEffect } from "react";// Define the Login function.
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

export const Post = () => {
  const currentUrl = useLocation().pathname;

  const [post, setPost] = useState({user: {name: {}}, main_image: {}, image: [{}], title: '', type_post: '', content: '', research: [{}]})
  console.log(currentUrl)
  useEffect(() => {
    if(localStorage.getItem('access_token') === null){                               
      window.location.href = '/login'

    }
    else{
      (async () => {
          console.log('http://localhost:8000'+currentUrl)
          const {data} = await axios.get(
            'http://localhost:8000'+currentUrl,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
              },
            }
          );
          console.log(data)
          setPost(data)

        
      })();

    };
  }, []);    

  return(      
        
      <Container className="my-5 w-90">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="border-0 shadow-lg rounded overflow-hidden">
            <div style={{ width: '100%', height: '10vw', overflow: 'hidden', opacity: '0.8' }}>
              <Card.Img
                variant="top"
                src={`http://localhost:8000${post.main_image.image}`}
                className="w-100"
                style={{ objectFit: 'cover', height: '100%' }}
              />
            </div>
            <Card.Body className="bg-gradient-primary-to-secondary text-black" style={{ color: 'black' }}>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-1" style={{ fontSize: '2rem', textAlign: 'left' }}>{post.title}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted" style={{ fontSize: '1.2rem', color: '#6c757d' }}>{post.type_post}</Card.Subtitle>
              </div>
              <Card.Subtitle className="mb-3 text-muted" style={{ textAlign: 'left', fontSize: '0.9rem' }}>Published by: {post.user.name.username}</Card.Subtitle>
              <hr />
              <Card.Text className="text-justify" style={{ fontSize: '1.1rem' }}>{post.content}</Card.Text>
              <hr />
              <Card.Text className="font-italic text-muted" style={{ fontSize: '0.9rem' }}>Published on: {new Date(post.datetime).toLocaleString()}</Card.Text>
              <Card.Text className="font-weight-bold text-center mt-4 mb-3" style={{ fontSize: '1.5rem', color: '#007bff' }}>Research</Card.Text>
              <Row className="justify-content-center mb-3">
                {post.research.map((researchObj, index) => (
                  <Col key={index} md={5} className="mb-2">
                    <div className="p-3 border rounded shadow-sm d-flex align-items-center bg-light">
                      <i className="fas fa-flask text-primary mr-3"></i>
                      {researchObj.name}
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
            {post.image.length > 0 && (
              <Card.Body className="bg-light border-top">
                <Card.Text className="font-weight-bold text-success">Additional Images:</Card.Text>
                <Row>
                  {post.image.map((imgObj, index) => (
                    <Col key={index} md={4} className="mb-3">
                      <div className="border rounded p-2 bg-white shadow-sm">
                        <Card.Img src={`http://localhost:8000${imgObj.image}`} className="img-fluid rounded" />
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  )
}