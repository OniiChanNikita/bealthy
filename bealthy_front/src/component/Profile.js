import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import axios from "axios";

// Mock Data
const profile_example = {
  name: 'John Doe',
  rating: 4.5,
  qualification: 'yes',
  description: 'Fitness enthusiast and certified nutritionist.',
  dateJoined: '2020-05-20',
  profileImage: 'http://localhost:8000/profile_image.jpg',
  reviews: [
    'Great trainer, highly recommend!',
    'Very knowledgeable about nutrition.',
    'Helped me achieve my fitness goals.',
  ],
  subscriptions: 1200,
};



export const Profile = () => {
  const [filterType, setFilterType] = useState('');
  const [userData, setUserData] = useState({profile:
          {name: {username: '', date_joined: ''}, rating: 0, qualification: null, description: '', subscriptions: 0, image_profile: ''
        }, posts: [
          {user: {name: {}}, main_image: {}, image: [{}], title: '', type_post: '', content: '', research: [{}]

        }]})
  const [filteredPosts, setFilteredPosts] = useState([]);


  const currentUrl = useLocation().pathname;
  console.log(userData)

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
          setUserData(data)
          setFilteredPosts(data.posts)
          console.log(filteredPosts)
      })();

    };
  }, []);

  useEffect(() => {

    if (filterType) {
      setFilteredPosts(userData.posts.filter(post => post.type_post === filterType));
    } else {
      setFilteredPosts(userData.posts);
    }
  }, [filterType]);

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <Card className="border-0 shadow-sm mb-4" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Img variant="top" src={`http://localhost:8000${userData.profile.image_profile}`} />
            <Card.Body>
              <Card.Title className="text-primary">{userData.profile.name.username}</Card.Title>
              <Card.Text>
                <strong>Rating:</strong> <span className="text-success">{userData.profile.rating} / 5</span>
              </Card.Text>
              <Card.Text>
                <strong>Qualification:</strong> {userData.profile.qualification ? 'Qualified' : 'Not Qualified'}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {userData.profile.description}
              </Card.Text>
              <Card.Text>
                <strong>Date Joined:</strong> {userData.profile.name.date_joined.substring(0, 10)}
              </Card.Text>
              <Card.Text>
                <strong>Subscriptions:</strong> {userData.profile.subscriptions}
              </Card.Text>
              <div>
                <strong>Reviews:</strong>
                <ul className="list-unstyled">
                  {profile_example.reviews.map((review, index) => (
                    <li key={index} className="border-bottom py-2">{review}</li>
                  ))}
                </ul>
              </div>
              <Button variant="primary" className="mt-3">Contact</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Form.Group controlId="postTypeFilter" className="mb-4">
            <Form.Label className="text-info">Filter by Post Type</Form.Label>
            <Form.Control as="select" value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="">All</option>
              <option value="traning">Training Program</option>
              <option value="nutrion">Nutrition Program</option>
              <option value="product">Products Recommended</option>
            </Form.Control>
          </Form.Group>
          <Row>
            {filteredPosts.slice(0, 6).map((post, index) => (
              <Col md={6} key={index} className="mb-4">
                <Link to={'/post/'+post.slug_post+'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card className="border-0 shadow-sm h-100" style={{ backgroundColor: '#fff3cd' }}>
                  <Card.Img variant="top" src={`http://localhost:8000${post.main_image.image}`} style={{ height: '200px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title className="text-dark">{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{post.type_post}</Card.Subtitle>
                    <Card.Text className="text-muted">Published on: {new Date(post.datetime).toLocaleDateString()}</Card.Text>
                  </Card.Body>
                </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

