// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
// Define the Login function.
import { Container, Row, Col, Card, Form  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GifReader } from 'omggif';

const res_example = [
  {
    "bodyPart": "string",
    "equipment": "string",
    "gifUrl": "string",
    "id": "string",
    "name": "string",
    "target": "string",
    "secondaryMuscles": [
      "string"
    ],
    "instructions": [
      "string"
    ]
  }
]
export const Exercises = ({data}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [firstFrameUrls, setFirstFrameUrls] = useState({});

    const [filterType, setFilterType] = useState('');
    const [researches, setResearches] = useState(data.data); 
    const [filteredResearches, setFilteredResearches] = useState(data.data);

    const [bodyPart, setBodyPart] = useState('');


    useEffect(() => {         
        extractFirstFrames(researches);

    }, [researches]); 
    
    useEffect(() => {

    if (bodyPart!='') {
        console.log(researches.filter(research => research.bodyPart.includes(bodyPart) === true))
        setFilteredResearches(researches.filter(research => research.bodyPart.includes(bodyPart) === true));
        console.log(filteredResearches)
    } else {
        setFilteredResearches(researches);
    }
    }, [bodyPart]);    

    const extractFirstFrames = (researches) => {
        researches.forEach(async (research) => {
            console.log(research.gifUrl)
            const url = research.gifUrl;
            const parts = url.split('/');
            const lastEndpoint = parts[parts.length - 1]; /*vKAWsPzehvwbAa*/
            const response = await axios.get(`/research_image/${lastEndpoint}`, {responseType: "arraybuffer"});

            const byteArray = new Uint8Array(response.data);
            console.log(response.data, byteArray)

            console.log(byteArray)

            const reader = new GifReader(byteArray);

            if (reader.numFrames() > 0) {

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
            } else {
                console.error('No frames in GIF:', research.gifUrl);
            }
        
        });
    };

    const handleMouseEnter = (id) => {
        console.log(isHovered)
        setIsHovered(prev => ({ ...prev, [id]: true }));
    };

    const handleMouseLeave = (id) => {
        setIsHovered(prev => ({ ...prev, [id]: false }));
    };

    const handleSearchBodyPart = (e) => setBodyPart(e.target.value);

    return <div >
        <div className="d-flex justify-content-center flex-column align-items-center"> 
    { researches[0] == undefined ? <p style={{width: '100%', margin: '5% 0 25px 0'}} className="text-center h3">У вас нету публикаций, хотите создать новую?</p> : null}
    { researches[0] == undefined ? <a style={{ width: '30%'}} href = 'upload_post/' className="btn btn-outline-warning">Создать публикацию</a> : null}
    </div>
    <Container className='my-5'>
    <Row>   
    <Col>
      <Form.Group controlId="postTypeFilter" className="mb-4">
        <Form.Control value={bodyPart} onChange = {handleSearchBodyPart}  placeholder="Body Part..." style={{ borderBottom: '2px solid #8b8b8b' }} />
      </Form.Group>
      <Row>
        {Object.keys(filteredResearches).map(key => (
          <Col md={3} key={key} className="mb-4">
            <Link to={'/exercise/'+filteredResearches[key].id+'/'} style={{ textDecoration: 'none', color: 'inherit' }}>

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



