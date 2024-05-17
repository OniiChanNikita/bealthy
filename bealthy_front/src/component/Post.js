// Import the react JS packages 
import axios from "axios";
import { useState, useEffect } from "react";// Define the Login function.
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

export const Post = () => {
  const currentUrl = useLocation().pathname;

  const [post, setPost] = useState({main_image: {}, image: [{}], title: '', type_post: '', content: '', research: [{}]})
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
        
      <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="border-0 shadow-lg rounded overflow-hidden">
            <div style={{ width: '100%', height: '10vw', overflow: 'hidden', opacity: '0.5'}}>
              <Card.Img 
                variant="top" 
                src={`http://localhost:8000${post.main_image.image}`} 
                className="w-100" 
                style={{ objectFit: 'cover', height: '100%' }} 
              />
            </div>
            <Card.Body className="bg-gradient-primary-to-secondary text-black" style={{color: 'black'}}>
              <Card.Title className="mb-3 text-center">{post.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-center">{post.type_post}</Card.Subtitle>
              <Card.Text className="text-justify" style={{ fontSize: '1.2rem' }}>{post.content}</Card.Text>
              <Card.Text className="font-italic">Published by: {post.user}</Card.Text>
              <Card.Text className="font-italic">Published on: {new Date(post.datetime).toLocaleString()}</Card.Text>
              <Card.Text className="font-weight-bold">Research:</Card.Text>
              <Row className="justify-content-center mb-3">
                {post.research.map((researchObj, index) => (
                  <Col key={index} md={5} className="mb-2">
                    <div className="p-3 border rounded shadow-sm d-flex align-items-center" style = {{background: 'linear-gradient(60deg, #00ff87, #60efff)'}}>
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
                      <div className="border rounded p-2" /*style={{background: 'linear-gradient(90deg, #6c757d, #f8f9fa)'}}*/>
                        <Card.Img src={`http://localhost:8000${imgObj.image}`} className="img-fluid rounded shadow-sm" />
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