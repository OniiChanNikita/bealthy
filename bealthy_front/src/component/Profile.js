import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useLocation, Link, useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import axios from "axios";



/*const profile_example = {
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
{profile:
  {name: {username: '', date_joined: ''}, rating: 0, qualification: null, description: '', subscriptions: 0, image_profile: ''
}, posts: [
  {user: {name: {}}, main_image: {}, image: [{}], title: '', type_post: '', content: '', research: [{}]
}]}
*/


export const Profile = () => {
  console.log(localStorage.getItem('access_token'))
  if(localStorage.getItem('access_token') === null){                               
      window.location.href = '/login'
  }
  const slug = useParams()

  const [filterType, setFilterType] = useState('');
  const [userDataProfile, setUserDataProfile] = useState()//data.data
  const [filteredPosts, setFilteredPosts] = useState();//data.data.posts
  const [reviews, setReviews] = useState();//data.reviewData
  const [research, setResearch] = useState()
  const [switchResearch, setSwitchResearch] = useState(false)
  const [itsYour, setItsYour] = useState(false)


  /*const currentUrl = useLocation().pathname;
  console.log(userData)

  console.log(currentUrl)*/

  useEffect(() => {
    const fetchData = async () => {

      const {data} = await axios.get(
        'http://localhost:8000/profile/'+slug.slug,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
          },
        }
      );

      setUserDataProfile(data)
      setFilteredPosts(data.posts)
      if (localStorage.getItem('userData') == data.profile.slug_profile){
        setItsYour(true)
        console.log('its your account')
      }

    }
    fetchData();
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      const {data: reviewData} = await axios.get(
        'http://localhost:8000/profile/'+slug.slug+'/reviews/',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
          },
        }
      );
      setReviews(reviewData)

    }
    fetchData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      const {data: researchData} = await axios.get(
        'http://localhost:8000/profile/'+slug.slug+'/researches/',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
          },
        }
      );
      setResearch(researchData)
    }
    fetchData()
  }, [])

    
  useEffect(() => {
    if (filterType) {
      setFilteredPosts(userDataProfile.posts.filter(post => post.type_post === filterType));
    } else {
      if (userDataProfile){
        setFilteredPosts(userDataProfile.posts);
      }
    }
  }, [filterType]);

  const funcSwitchResearch = () => {
    setSwitchResearch(!switchResearch);
    console.log(switchResearch)
  }

  const funcCreateConversationAndParticipant = async () =>{
    const response = await axios.post('http://localhost:8000/createParticipant/', {"user1": localStorage.getItem('username'), "user2": userDataProfile.profile.name.username},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
      }
    );
    console.log(response)
    window.location.href = '/message'
  }

  if (!userDataProfile || !filteredPosts || !reviews || !research) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <Card className="border-0 shadow-sm mb-4" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Img variant="top" src={`http://localhost:8000${userDataProfile.profile.image_profile}`} />
            <Card.Body>
              <Card.Title className="text-primary">{userDataProfile.profile.name.username}</Card.Title>
              <Card.Text>
                <strong>Rating:</strong> <span className="text-success">{userDataProfile.profile.rating} / 5</span>
              </Card.Text>
              <Card.Text>
                <strong>Qualification:</strong> {userDataProfile.profile.qualification ? 'Qualified' : 'Not Qualified'}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {userDataProfile.profile.description}
              </Card.Text>
              <Card.Text>
                <strong>Date Joined:</strong> {userDataProfile.profile.name.date_joined.substring(0, 10)}
              </Card.Text>
              <Card.Text>
                <strong>Subscriptions:</strong> {userDataProfile.profile.subscriptions}
              </Card.Text>
              
                  {reviews.length > 0 && (
                    <Card className="border-0  rounded overflow-hidden mt-4">
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
              
              {!itsYour && <Button onClick={funcCreateConversationAndParticipant} to="/chat" className="btn btn-secondary mt-3">Contact</Button>  }
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Row>
            <Form.Group controlId="postTypeFilter" className="mb-4" style={{width: '50%'}}>
              <Form.Control as="select" value={filterType} onChange={e => setFilterType(e.target.value)} style={{borderRadius: '100px', textAlign: 'center'}} >
                <option value="">All</option>
                <option value="traning">Training Program</option>
                <option value="nutrion">Nutrition Program</option>
                <option value="product">Products Recommended</option>
              </Form.Control>

            </Form.Group>
            <Button className='btn btn-light mb-4' onClick={funcSwitchResearch} style={{width: '50%', borderRadius: '100px', textAlign: 'center', border: '1px solid #dee2e6', backgroundColor: 'transparent '}}>Research</Button>
          </Row>
          {!switchResearch &&

          <Row>
            {filteredPosts.slice(0, 6).map((post, index) => (
              <Col md={6} key={index} className="mb-4">
                <Link to={'/post/'+post.slug_post+'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card className="border-0 shadow-sm h-100" /*style={{ backgroundColor: '#fff3cd' }}*/>
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
          }
          {switchResearch &&
          <Row>
            {research.slice(0, 6).map((research, index) => (
              <Col md={6} key={index} className="mb-4 position-relative">
                <Link to={'/study/' + research.id + '/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card className="border-0 shadow-sm h-100 research-card m-1">
                    <Card.Body>
                      <Card.Title className="text-dark">{research.name}</Card.Title>
                      <Card.Text className="text-muted">{research.text}</Card.Text>
                    </Card.Body>
                    <button
                      variant="danger"
                      className="btn btn-outline-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        //handleDelete(research.id);
                      }}
                      style={{
                        margin: '0px',
                        position: 'absolute',
                        bottom: '5px',
                        right: '5px',
                        display: 'block',
                      }}
                    >
                      Delete
                    </button>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          }

        </Col>
      </Row>
    </Container>
  );
};

