import React, {useState} from 'react';
import { Card, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';


export const Exercise = ({ exercise }) => {
  const currentUrl = useLocation().pathname;
  console.log(exercise)
  return (
  <Container className="my-5" style={{ maxWidth: '90%' }}>
  {exercise != {} ? (
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="border-0 shadow-lg rounded overflow-hidden">
            <div style={{ width: '100%', height: '50vh', overflow: 'hidden', opacity: '0.8' }}>
              <Card.Img
                variant="top"
                src={exercise.gifUrl}
                className="w-100"
                style={{ objectFit: 'cover', height: '100%' }}
              />
            </div>
            <Card.Body className="bg-gradient-primary-to-secondary text-black" style={{ color: 'black' }}>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-1" style={{ fontSize: '2rem', textAlign: 'left' }}>{exercise.name}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted" style={{ fontSize: '1.2rem', color: '#6c757d' }}>{exercise.bodyPart}</Card.Subtitle>
              </div>
              <Card.Subtitle className="mb-3 text-muted" style={{ textAlign: 'left', fontSize: '1rem' }}>Equipment: {exercise.equipment}</Card.Subtitle>
              <hr />
              <Card.Text className="text-justify" style={{ fontSize: '1.1rem' }}>
                <strong>Target Muscle:</strong> {exercise.target}
              </Card.Text>
              <Card.Text className="text-justify" style={{ fontSize: '1.1rem' }}>
                <strong>Secondary Muscles:</strong>
                <div className="d-flex flex-wrap">
                  {exercise.secondaryMuscles.map((muscle, index) => (
                    <div key={index} className="p-2 m-1 border rounded bg-light" style={{ minWidth: '100px', textAlign: 'center' }}>
                      {muscle}
                    </div>
                  ))}
                </div>
              </Card.Text>
              <hr />
              <Card.Text className="text-justify" style={{ fontSize: '1.1rem' }}>
                <strong>Instructions:</strong>
                <ul className="list-unstyled">
                  {exercise.instructions.map((instruction, index) => (
                    <li key={index} className="p-2 ">
                      {instruction}
                    </li>
                  ))}
                </ul>
              </Card.Text>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    ): null}
    </Container>
    
    
  );
};

