import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Todo from '../Todo/todo';
import {Accordion, Card} from 'react-bootstrap';
import TodoModal from '../Todo/TodoModal/todomodal';
const MainArea = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Container fluid>
      <Row className='main-layout-row'>
        <Col sm="1" md="2" className="labels-menu">

        </Col>
        <Col className="todo-main-section" sm="1" md="7">
          <div className="todo-section-header">
            <Button onClick={toggle} className="todo-section-header-button btn btn-danger">Add Task</Button>
          </div>
          <TodoModal modal={modal} toggle={toggle}/>
          <Accordion>
          <Card>
              <Accordion.Toggle className="test" as={Button} variant="link" eventKey="0">
                <span>Overdue Todos</span>
                <span><svg width="24" height="24" viewBox="0 0 24 24"> <path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" /> </svg></span>
              </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body><Todo/></Card.Body>
                </Accordion.Collapse>

              </Card>
              <Card>
              <Accordion.Toggle className="test" as={Button} variant="link" eventKey="1">
                <span>Today</span>
                <span><svg width="24" height="24" viewBox="0 0 24 24"> <path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" /> </svg></span>
              </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body><Todo/></Card.Body>
                </Accordion.Collapse>
              </Card>
          </Accordion>
           <svg className="test-svg" xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 50 50"><defs><style></style></defs><title>Clock</title><g id="Layer_2" data-name="Layer 2"><g id="Clock"><path class="cls-1 cls-a" d="M26.82 27.62l9-4.89a2.49 2.49 0 0 0 .79-3.44 2.5 2.5 0 0 0-3.44-.8l-9 4.89a2.49 2.49 0 0 0-.8 3.44 2.49 2.49 0 0 0 3.45.8z"/><path class="cls-2" d="M25 0a25 25 0 1 0 25 25A25 25 0 0 0 25 0zm0 45a20 20 0 1 1 20-20 20 20 0 0 1-20 20z"/><path class="cls-2 cls-b" d="M16.82 13.7a2.5 2.5 0 0 0-3.38 3.68l10.37 10a2.5 2.5 0 1 0 3.38-3.68z"/></g></g></svg>
        </Col>
        <Col className="labels-menu" sm="1" md="3">
        </Col>
      </Row>
    </Container>
  );
}

export default MainArea;