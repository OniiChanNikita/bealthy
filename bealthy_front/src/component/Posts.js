// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
// Define the Login function.
import { Container, Row, Col, Card, Form  } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Posts = ({ data }) => {

    const [filterType, setFilterType] = useState('');
    const [posts, setPosts] = useState(data); 
    const [filteredPosts, setFilteredPosts] = useState(data);
    /*useEffect(() => {    
        setPosts();
        setFilteredPosts(data);
        console.log(data);
        console.log(posts[0])  
    }, [posts]); */
    useEffect(() => {
    if (filterType) {
        setFilteredPosts(posts.filter(post => post.type_post === filterType));
        console.log(filteredPosts)
    } else {
      setFilteredPosts(posts);
    }
    }, [filterType]);    
    return <div >
    <div className="d-flex justify-content-center flex-column align-items-center"> 
    { posts[0] == undefined ? <p style={{width: '100%', margin: '5% 0 25px 0'}} className="text-center h3">У вас нету публикаций, хотите создать новую?</p> : null}
    { posts[0] == undefined ? <a style={{ width: '30%'}} href = 'upload_post/' className="btn btn-outline-warning">Создать публикацию</a> : null}
    </div>
    <Container className='my-5'>
    <Row>   
    <Col>
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
        {Object.keys(filteredPosts).map(key => (
          <Col md={3} key={key} className="mb-4">
            <Link to={'/post/'+filteredPosts[key].slug_post+'/'} style={{ textDecoration: 'none', color: 'inherit' }}>

            <Card className="border-0 shadow-sm h-100" /*style={{ backgroundColor: '#fff3cd' }}*/>
              <Card.Img variant="top" src={`http://localhost:8000${filteredPosts[key].main_image.image}`} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title className="text-dark">{filteredPosts[key].title}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">{filteredPosts[key].user.name.username}</Card.Subtitle>
                <Card.Subtitle className="text-muted">{filteredPosts[key].type_post}</Card.Subtitle>
                <Card.Text className="text-muted">{filteredPosts[key].content.substring(0, 25)+'...'}</Card.Text>
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


