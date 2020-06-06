import React, { useState, useEffect } from 'react';
import {  Col, Button } from 'reactstrap';
import TodoCard from '../Todo/TodoCard/TodoCard';
import store from '../../app/store';

const Custom = (props) => {
  


  return (
        <div>
          { (props.data !== undefined) ? <> 
          <div className="section-btn">
            <TodoCard sectionName={props.data.sectionName} data={props.data.data} defaultActiveKey='0'></TodoCard>
          </div> </> : <div> Loading.......</div>}
          
        </div>
    
  );
}

export default Custom;