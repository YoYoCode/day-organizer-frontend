import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import TodoModal from '../Todo/TodoModal/todomodal';
import TodoCard from '../Todo/TodoCard/TodoCard';
import Pomodoro from '../Pomodoro/pomodoro';
import { Collapse, CardBody, Card } from 'reactstrap';
import {PriorityFlag} from '../Todo/TodoModal/todomodal';

const MainArea = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [isOpen, setIsOpen] = useState(false);
  const toggle1 = () => setIsOpen(!isOpen);
  const toggle2 = () => setIsOpen(!isOpen);
  return (
    <Container fluid>
      <Row className='main-layout-row'>
        <Col sm="2" md="2" className="labels-menu lebels-menu--left">
          <div className="left-nav">
            <div className="left-nav__body">
              <Button color="secondary">Inbox</Button>{' '}
              <Button color="secondary">Completed</Button>{' '}
              <div className="button">
                <Button color="primary" onClick={toggle1} style={{ marginBottom: '1rem' }}>Labels</Button>
                <Collapse isOpen={isOpen}>
                  <Card>
                    <Button color="secondary">label 1</Button>{' '}
                    <Button color="secondary">label 2</Button>{' '}
                    <Button color="secondary">label 3</Button>{' '}
                    <Button color="secondary">label 4</Button>{' '}
                    <Button color="secondary">label 5</Button>{' '}
                    <Button color="secondary">label 6</Button>{' '}
                    <Button color="secondary">label 7</Button>{' '}
                    <Button color="secondary">label 8</Button>{' '}
                    <Button color="secondary">label 9</Button>{' '}
                    <Button color="secondary">label 10</Button>{' '}
                  </Card>
                </Collapse>
              </div>
              <div className="button">
                <Button color="primary" onClick={toggle2} style={{ marginBottom: '1rem' }}>Priority</Button>
                <Collapse isOpen={isOpen}>
                  <Card>
                    <Button color="secondary">Priority 1 <PriorityFlag className="left-nav__priority-flag" fill="#b23b47"  /></Button>{' '}
                    <Button color="secondary">Priority 2 <PriorityFlag className="left-nav__priority-flag" fill="green"  /></Button>{' '}
                    <Button color="secondary">Priority 3 <PriorityFlag className="left-nav__priority-flag" fill="orange"  /></Button>{' '}
                  </Card>
                </Collapse>
              </div>
            </div>
          </div>
        </Col>
        <Col className="todo-main-section" sm="7" md="7">
          <div className="todo-section-header">
            <Button onClick={toggle} className="todo-section-header-button btn">Add Task</Button>
          </div>
          <TodoModal modal={modal} toggle={toggle}/>
          <div className="overdue-section-btn">
            <TodoCard sectionName='Overdue todos' defaultActiveKey='1'></TodoCard>
          </div>
          <div className="section-btn">
            <TodoCard sectionName='Today' defaultActiveKey='0'></TodoCard>
          </div>
          <div className="section-btn">
            <TodoCard sectionName='Tomorrow' defaultActiveKey='0'></TodoCard>
          </div>
          <div className="section-btn">
            <TodoCard sectionName='Overmorrow' defaultActiveKey='0'></TodoCard>
          </div>
        </Col>
        <Col className="labels-menu pomodoro" sm="2" md="3">
          <Pomodoro></Pomodoro>
        </Col>
      </Row>
    </Container>
  );
}

export default MainArea;