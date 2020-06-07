import React, { useState, useEffect } from 'react';
import {  Col, Button } from 'reactstrap';
import TodoCard from '../Todo/TodoCard/TodoCard';
import _ from 'lodash';

const Custom = (props) => {
  const [myValues, setMyValues] = useState(props.data);

  useEffect(() => {
    setMyValues(props.data);
  }, [props.data]);

  return (
    <div>
      { (myValues !== undefined || !_.isEmpty(myValues)) ?
      <div className="section-btn">
        <TodoCard classNameFull={myValues.className} sectionType={myValues.sectionType} sectionName={myValues.sectionName} data={myValues.data} defaultActiveKey='0'></TodoCard>
      </div> : <div> Loading.......</div>}
      
    </div>
  );
}

export default Custom;