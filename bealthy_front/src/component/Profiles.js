// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
// Define the Login function.
import { Container, Row, Col, Card, Form  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

export const Profiles = () => {

    const [profiles, setProfiles] = useState(null); 
    
    useEffect(() => {
      const fetchProfiles = async () => {
        const response = await axios.get('http://localhost:8000/profiles/', {
                headers: {
              'Content-Type': 'application/json',
          }
        })
        console.log(response.data)
        setProfiles(response.data)
      }
      fetchProfiles()
    }, []);    
    if (!profiles) {
      return <LoadingSpinner />;
    }
    return <div >
    <Container className='my-5'>
    <Row>   
    <Col>
      <Row>
        {Object.keys(profiles).map(key => (
          <Col md={3} key={key} className="mb-4">
            <Link to={'/profile/'+profiles[key].slug_profile+'/'} style={{ textDecoration: 'none', color: 'inherit' }}>

            <Card className="border-0 shadow-sm h-100" /*style={{ backgroundColor: '#fff3cd' }}*/>
              <Card.Img variant="top" src={`http://localhost:8000${profiles[key].image_profile}`} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Subtitle className="mb-3 text-muted">{profiles[key].name.username}</Card.Subtitle>
              </Card.Body>
            </Card>
            </Link>

          </Col>
        ))}
      </Row>
    </Col>
    </Row>
    </Container>
    </div>      
     

}


