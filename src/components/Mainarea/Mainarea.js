import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import TodoModal from '../Todo/TodoModal/todomodal';
import TodoCard from '../Todo/TodoCard/TodoCard';
import Pomodoro from '../Pomodoro/pomodoro';

const MainArea = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Container fluid>
      <Row className='main-layout-row'>
        <Col sm="2" md="2" className="labels-menu">

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