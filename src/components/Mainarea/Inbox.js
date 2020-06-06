import React, { useState, useEffect } from 'react';
import {  Col, Button } from 'reactstrap';
import TodoModal from '../Todo/TodoModal/todomodal';
import TodoCard from '../Todo/TodoCard/TodoCard';


const Inbox = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <div className="todo-section-header">
        <Button onClick={toggle} className="todo-section-header-button btn">Add Task</Button>
      </div>
      <TodoModal modal={modal} toggle={toggle}/>
      { (props.data !== undefined) ? <> <div className="overdue-section-btn">
        <TodoCard sectionName='Overdue' data={props.data.todoistDashboard.overdue} defaultActiveKey='1'></TodoCard>
      </div>
      <div className="section-btn">
        <TodoCard sectionName='Today' data={props.data.todoistDashboard.today} defaultActiveKey='0'></TodoCard>
      </div>
      <div className="section-btn">
        <TodoCard sectionName='Tomorrow' data={props.data.todoistDashboard.tomorrow} defaultActiveKey='0'></TodoCard>
      </div>
      <div className="section-btn">
        <TodoCard sectionName='Overmorrow' data={props.data.todoistDashboard.overmorrow} defaultActiveKey='0'></TodoCard>
      </div> </> : <div> Loading.......</div>}
      
    </div>
    
  );
}

export default Inbox;