// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
// Define the Login function.
import { Container, Row, Col, Card, Form  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GifReader } from 'omggif';


export const Researches = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [firstFrameUrls, setFirstFrameUrls] = useState({});

    const [filterType, setFilterType] = useState('');
    const [researches, setResearches] = useState({}); 
    const [filteredResearches, setFilteredResearches] = useState({});


    useEffect(() => {    
        if(localStorage.getItem('access_token') === null){                               
            window.location.href = '/login'
        }
        else{         
            (async () => {
                try {
                    const data = await axios.get('https://exercisedb.p.rapidapi.com/exercises',  {
                        params: {
                            limit: '10',
                          },
                          headers: {
                            'X-RapidAPI-Key': '493ed86dd6msh68811499276d21bp1def8ejsn98e44127abce',
                            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                          }
                    });
                    setResearches(data.data);
                    console.log(data)

                    setFilteredResearches(data.data);
                    extractFirstFrames(data.data);

                } catch (error) {
                    console.error('Error:', error);
                }
            })()
        };
    }, [filterType]); 
    
    useEffect(() => {
    if (filterType) {
        /*setFilteredResearches(researches.filter(research => research.type_post === filterType));*/
        console.log(filteredResearches)
    } else {
      setFilteredResearches(researches);
    }
    }, [filterType]);    

    const extractFirstFrames = (researches) => {
        researches.forEach(async (research) => {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const response = await fetch(proxyUrl+research.gifUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch GIF: ${response.statusText}`);
            }
            const buffer = await response.arrayBuffer();
            const byteArray = new Uint8Array(buffer);
            const reader = new GifReader(byteArray);

            const width = reader.width;
            const height = reader.height;
            const image = new Uint8ClampedArray(width * height * 4);
            reader.decodeAndBlitFrameRGBA(0, image);

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            const imageData = new ImageData(image, width, height);
            ctx.putImageData(imageData, 0, 0);

            const firstFrameUrl = canvas.toDataURL();
            setFirstFrameUrls(prev => ({ ...prev, [research.id]: firstFrameUrl }));
        });
    };

    const handleMouseEnter = (id) => {
        console.log(isHovered)
        setIsHovered(prev => ({ ...prev, [id]: true }));
    };

    const handleMouseLeave = (id) => {
        setIsHovered(prev => ({ ...prev, [id]: false }));
    };

    return <div >
        <div className="d-flex justify-content-center flex-column align-items-center"> 
    { researches[0] == undefined ? <p style={{width: '100%', margin: '5% 0 25px 0'}} className="text-center h3">У вас нету публикаций, хотите создать новую?</p> : null}
    { researches[0] == undefined ? <a style={{ width: '30%'}} href = 'upload_post/' className="btn btn-outline-warning">Создать публикацию</a> : null}
    </div>
    <Container className='my-5'>
    <Row>   
    <Col>
      <Form.Group controlId="postTypeFilter" className="mb-4">
        <Form.Label className="text-info">Filter by Research Type</Form.Label>
        <Form.Control as="select" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="">All</option>
          <option value="traning">Training Program</option>
          <option value="nutrion">Nutrition Program</option>
          <option value="product">Products Recommended</option>
        </Form.Control>
      </Form.Group>
      <Row>
        {Object.keys(filteredResearches).map(key => (
          <Col md={3} key={key} className="mb-4">
            <Link to={'/post/'+filteredResearches[key].slug_post+'/'} style={{ textDecoration: 'none', color: 'inherit' }}>

            <Card onMouseEnter={() => handleMouseEnter(filteredResearches[key].id)} onMouseLeave={() => handleMouseLeave(filteredResearches[key].id)} className="border-0 shadow-sm h-100" /*style={{ backgroundColor: '#fff3cd' }}*/>
              <Card.Img
                    variant="top"
                    src={isHovered[filteredResearches[key].id] ? filteredResearches[key].gifUrl : firstFrameUrls[filteredResearches[key].id]}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
              <Card.Body>
                <Card.Title className="text-dark">{filteredResearches[key].name}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">{filteredResearches[key].target}</Card.Subtitle>
                <Card.Subtitle className="text-muted">{filteredResearches[key].type_post}</Card.Subtitle>
                <Card.Text className="text-muted">{filteredResearches[key].bodyPart/*.substring(0, 25)+'...'*/}</Card.Text>
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



