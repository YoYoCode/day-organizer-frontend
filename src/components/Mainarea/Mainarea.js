import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Pomodoro from '../Pomodoro/pomodoro';
import { Collapse, CardBody, Card } from 'reactstrap';
import {PriorityFlag} from '../Todo/TodoModal/todomodal';
import store from '../../app/store';
import Select from 'react-dropdown-select';
import Inbox from './Inbox';
import Custom from './Custom';
import { todoistDashboardSlice } from '../Todoist/todoist-dashboard-slice';
import _ from 'lodash';
import { Dunzo } from '../../services/api';

const MainArea = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [dashboardSectionData, setDashboardSectionData] = useState(undefined);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const toggle2 = () => setIsOpen2(!isOpen2);

  const storeSubscription = store.subscribe(
    () => {
      setDashboardSectionData(store.getState());
    }
  );

  useEffect(() => {
    storeSubscription();
  }, []);
  console.log(dashboardSectionData);
  const [showInbox,setShowInbox] = useState(true);
  const [showCustom,setShowCustom] = useState(false);
  const [customTodoData,setCustomTodoData] = useState(undefined);
  const showCustomTodo = useCallback( async (customType,e)=>{
    setShowInbox(false);
    setShowCustom(true);
   
    if(customType === 'Label'){
      const currentLabelId = e.currentTarget.id;
      const res = await Dunzo.getTasksByLabel({"label": currentLabelId});
      console.log(res);
      const selectLabel = _.filter(dashboardSectionData.todoistDashboard.labels, (labelsOption)=>{
      console.log(currentLabelId);
        return currentLabelId == labelsOption._id;
      })
      console.log(selectLabel);
      if(res.status === 200){
        //setCustomTodoData(res.data);
        setCustomTodoData({
          "sectionName": selectLabel[0].name ,
          "data": dashboardSectionData.todoistDashboard.today 
        });
      } 

    } else if(customType === 'Priority'){
      const currentPriorityType = e.currentTarget.id;
      const res = await Dunzo.getTasksByPriority({"priority": currentPriorityType});
      console.log(res);
      if(res.status === 200){
        //setCustomTodoData(res.data);
        setCustomTodoData({
          "sectionName": `Priority ${_.capitalize(currentPriorityType)}` ,
          "data": dashboardSectionData.todoistDashboard.today 
        });
      }
    } else if(customType === 'Completed'){
      const currentStatusType = e.currentTarget.id;
      const res = await Dunzo.getTasksByStatus({"status": currentStatusType});
      console.log(res);
      if(res.status === 200){
        //setCustomTodoData(res.data);
        setCustomTodoData({
          "sectionName": `Completed` ,
          "data": dashboardSectionData.todoistDashboard.today 
        });
      }
    }
  });
  const onShowInbox = useCallback(()=>{
    setShowCustom(false);
    setShowInbox(true);
  })

  const createLabel = useCallback(async (newlabel)=>{
    if(!_.isEmpty(newlabel)){
      const res = await Dunzo.createLabel({name: newlabel[0].value});
      newlabel ='';
        // let tempStateStore = _.cloneDeep(stateStore); 
        // tempStateStore.todoistDashboard.labels = [...tempStateStore.todoistDashboard.labels, res.data];
        // setStateStore(tempStateStore);
        // dispatch(dashboardTodoistUpdate(stateStore.todoistDashboard));   
    }
    
  });

  return (
    <Container fluid>
      <Row className='main-layout-row'>
        <Col sm="2" md="2" className="labels-menu lebels-menu--left">
          <div className="left-nav">
            <div className="left-nav__body">
              <Button onClick={onShowInbox} color="secondary">Inbox</Button>{' '}
              <Button id="COMPLETED" onClick={e => showCustomTodo( 'Completed', e)} color="secondary">Completed</Button>{' '}
              <div className="button">
                <Button color="primary" onClick={toggle1} style={{ marginBottom: '1rem' }}>Labels</Button>
                <Collapse isOpen={isOpen1}>
                  <Card>
                  <div className="nav-add-label__wrapper">
                      <Select
                          noDataRenderer={()=>{ return <></> }}
                          clearable
                          placeholder="Add Label"
                          className="modal-label-selector"
                          createNewLabel="+ Add Label"
                          create
                          labelField="label"
                          valueField="value"
                          backspaceDelete
                          onChange={createLabel}
                          values= {[]}
                        />
                     </div>
                     {(dashboardSectionData !== undefined) ?  _.map(dashboardSectionData.todoistDashboard.labels,(label)=>{
                        return ( <Button onClick={e => showCustomTodo( 'Label', e)} color="secondary" key={label.name} id={label._id}>{label.name}</Button>)
                     }) : null }
                  </Card>
                </Collapse>
              </div>
              <div className="button">
                <Button color="primary" onClick={toggle2} style={{ marginBottom: '1rem' }}>Priority</Button>
                <Collapse isOpen={isOpen2}>
                  <Card>
                    <Button onClick={e => showCustomTodo( 'Priority', e)} id="HIGH" color="secondary">High <PriorityFlag className="left-nav__priority-flag" fill="#b23b47"  /></Button>{' '}
                    <Button onClick={e => showCustomTodo( 'Priority', e)} id="MEDIUM" color="secondary">Medium <PriorityFlag className="left-nav__priority-flag" fill="orange"  /></Button>{' '}
                    <Button onClick={e => showCustomTodo( 'Priority', e)} id="LOW" color="secondary">Low <PriorityFlag className="left-nav__priority-flag" fill="green"  /></Button>{' '}

                  </Card>
                </Collapse>
              </div>
            </div>
          </div>
        </Col>
        <Col className="todo-main-section" sm="7" md="7">
        {showInbox ? <Inbox data={dashboardSectionData} /> :null}
        {showCustom ? <Custom data={customTodoData} /> :null}
        </Col>
         <Col className="labels-menu pomodoro" sm="2" md="3">
          <Pomodoro></Pomodoro>
        </Col>
      </Row>
    </Container>
  );
}

export default MainArea;