import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const research = {
  title: 'Название исследования',
  text: 'Это текст исследования. Здесь можно описать все детали, результаты и выводы исследования.',
  date: '2024-05-23',
};

const Research = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{research.title}</Card.Title>
              <Card.Text>{research.text}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted text-end">{research.date}</Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Research;
