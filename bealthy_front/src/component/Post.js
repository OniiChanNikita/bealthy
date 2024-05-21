// Import the necessary packages
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

export const Post = () => {
  const currentUrl = useLocation().pathname;
  const [post, setPost] = useState({user: {name: {}}, image: [''], main_image: {}, image: [{}], title: '', type_post: '', content: '', research: [{}]});
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('username'));
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      if(localStorage.getItem('access_token') === null){                               
        window.location.href = '/login';
      } else {
        try {
          const {data: postData} = await axios.get(
            `http://localhost:8000${currentUrl}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
              },
            }
          );
          setPost(postData);
          console.log(currentUser, post)

          const {data: reviewsData} = await axios.get(
            `http://localhost:8000${currentUrl}reviews/`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
              },
            }
          );
          console.log(reviewsData)
          setReviews(reviewsData);
          setReviewSubmitted(false)

        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchPostData();
  }, [currentUrl, reviewSubmitted]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8000${currentUrl}reviews/`,
        { content: review },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
          },
        }
      );
      setReview('');
      setReviewSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

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
          {currentUser !== post.user.name.username && (
            <Card className="border-0 shadow-lg rounded overflow-hidden mt-4">
              <Card.Body>
                <Card.Title className="mb-4" style={{ fontSize: '1.5rem', textAlign: 'left' }}>Leave a Review</Card.Title>
                <Form onSubmit={handleReviewSubmit}>
                  <Form.Group controlId="reviewTextarea">
                    <Form.Label>Your Review</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="mt-3">
                    Submit Review
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
          {reviews.length > 0 && (
            <Card className="border-0 shadow-lg rounded overflow-hidden mt-4">
              <Card.Body>
                <Card.Title className="mb-4" style={{ fontSize: '1.5rem', textAlign: 'left' }}>Reviews</Card.Title>
                {reviews.map((reviewObj, index) => (
                  <Alert key={index} variant="secondary" className="text-left">
                    {reviewObj.text} - <i>by {reviewObj.user.name.username}</i> on {new Date(reviewObj.created_at).toLocaleString()}
                  </Alert>
                ))}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};
