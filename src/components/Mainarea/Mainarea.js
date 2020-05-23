import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Todo from '../Todo/todo';
import {Accordion, Card} from 'react-bootstrap';
import {ReactComponent as downArrowIcon} from '../../assets/down-arrow.svg';

const MainArea = (props) => {

  return (
    <Container fluid>
      <Row className='main-layout-row'>
        <Col sm="1" md="2" className="labels-menu">

        </Col>
        <Col className="todo-main-section" sm="1" md="7">
          <div className="todo-section-header">
            <Button className="todo-section-header-button btn btn-danger">Add Task</Button>
          </div>
          <Accordion>
          <Card>
              <Accordion.Toggle className="test" as={Button} variant="link" eventKey="0">
                <span>Check</span>
                <span><svg width="24" height="24" viewBox="0 0 24 24"> <path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" /> </svg></span>
              </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body><Todo/></Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
              <Accordion.Toggle className="test" as={Button} variant="link" eventKey="1">
                <span>Check</span>
                <span><svg width="24" height="24" viewBox="0 0 24 24"> <path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" /> </svg></span>
              </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body><Todo/></Card.Body>
                </Accordion.Collapse>
              </Card>
          </Accordion>
        </Col>
        <Col className="labels-menu" sm="1" md="3">
        </Col>
      </Row>
    </Container>
  );
}

export default MainArea;