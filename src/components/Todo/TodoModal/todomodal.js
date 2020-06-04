
import React, { useState , useCallback } from 'react';
import {useDispatch} from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField} from 'availity-reactstrap-validation';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-date-picker';
import Select from 'react-dropdown-select';
import {Dunzo} from '../../../services/api';
import _ from 'lodash';
import store from '../../../app/store';
import { dashboardTodoistUpdate } from '../../Todoist/todoist-dashboard-slice';


export const PriorityFlag= props=>(
  <svg height="24" width="24" version="1.1" className={props.className} {...props}>
      <g transform="translate(0 -1028.4)">
      <rect height="22" width="1" y="1030.4" x="3" fill={props.fill}/>
      <path d="m17.5 1030.4c-2.25 0-4.5 1.1-4.5 1.1s-2.25 1.1-4.5 1.1-4.5-1.1-4.5-1.1v13.7s2.25 1.2 4.5 1.2 4.5-1.2 4.5-1.2 2.25-1.1 4.5-1.1 4.5 1.1 4.5 1.1v-13.7s-2.25-1.1-4.5-1.1z" fill={props.fill} opacity='opacity'/>
      <rect height="22" width="1" y="1030.4" x="2"  fill={props.fill}/>
      <path d="m17.5 1043.2c-2.25 0-4.5 1.2-4.5 1.2s-2.25 1.1-4.5 1.1-4.5-1.1-4.5-1.1v1s2.25 1.1 4.5 1.1 4.5-1.1 4.5-1.1 2.25-1.2 4.5-1.2 4.5 1.2 4.5 1.2v-1s-2.25-1.2-4.5-1.2z"  fill={props.fill}/>
      <path d="m3 1029.4c-0.5523 0-1 0.4-1 1h2c0-0.6-0.4477-1-1-1z"  fill={props.fill}/>
      <path d="m3 1029.4v1h1c0-0.6-0.4477-1-1-1z"  fill={props.fill}/>
      </g>
  </svg>
);

const TodoModal = (props) => {
  const dispatch = useDispatch();
  const {
    buttonLabel,
    className
  } = props;
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('23:59');
  const [stateStore, setStateStore] = useState(store.getState());
  const getLabelsOptionsDisplay = useCallback(()=>{
    const labels =  _.map(stateStore.todoistDashboard.labels, (labelsOption)=>{
      return {
        "label": labelsOption.name,
        "value": labelsOption.name
      }
    })
    return labels;
  });
  const [labelsOptionsList, setLabelsOptionsList] = useState(getLabelsOptionsDisplay());
    store.subscribe(()=>{
      setStateStore(_.cloneDeep(store.getState()));
      setLabelsOptionsList(getLabelsOptionsDisplay());
    })
  
  const updateDateAndTime = useCallback(()=>{
    const getDate = date;
    const getTime = time;
    if(getDate !== null && getTime !== null){
      const hours = getTime.split(':')[0];
      const minutes = getTime.split(':')[1];
      getDate.setHours(hours);
      getDate.setMinutes(minutes);
      getDate.setSeconds('00');
      return getDate; 
    } else{
      const todayDate = new Date();
      const todayTime = '23:59';
      const hours = todayTime.split(':')[0];
      const minutes = todayTime.split(':')[1];
      todayDate.setHours(hours);
      todayDate.setMinutes(minutes);
      todayDate.setSeconds('00');
        return todayDate;
    }
  });
  const [dateAndTime, setDateAndTime] = useState(updateDateAndTime());
  const [todoTitle, setTodoTitle] = useState('');
  const [notifyOnSubmitError, setNotifyOnSubmitError] = useState(false);
  const [selectedLabelID, setselectedLabelID] = useState('');
  const onDateChange = useCallback(async (dateUpdated)=>{
    setDate(dateUpdated)
    setDateAndTime(updateDateAndTime().toUTCString());  
  });
  const onTimeChange = useCallback(async (timeUpdated)=>{
    setTime(timeUpdated);
    setDateAndTime(updateDateAndTime().toUTCString());  
  });

  const applyChanges = useCallback(async ()=>{
    if(todoTitle.trim() !== ''){
      const res = await Dunzo.createTodo({name: todoTitle, label: selectedLabelID, reminder: dateAndTime });
      props.toggle();
    } else{
      setNotifyOnSubmitError(!notifyOnSubmitError)
    }
  });
  const selectedLabelOptions = useCallback(async (selectedLabel)=>{
    if(!_.isEmpty(selectedLabel)){
        const selectLabel = _.filter(stateStore.todoistDashboard.labels, (labelsOption)=>{
        return selectedLabel[0].value == labelsOption.name;
      })
      if(!_.isEmpty(selectLabel)){
        setselectedLabelID(selectLabel[0]._id);
      } else{
        const res = await Dunzo.createLabel({name: selectedLabel[0].value});
        setselectedLabelID(res.data._id);
          // let tempStateStore = _.cloneDeep(stateStore); 
          // tempStateStore.todoistDashboard.labels = [...tempStateStore.todoistDashboard.labels, res.data];
          // setStateStore(tempStateStore);
          // dispatch(dashboardTodoistUpdate(stateStore.todoistDashboard));   
      }
    }
    
  });
  
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>Add Todo</ModalHeader>
        <ModalBody>
         <div className="text-center py-6">
          <span className="todo-modal-label">Todo Title {notifyOnSubmitError === false ? '' : <span style={{color:'red', fontSize:'20px'}}>*</span>}</span>
          <textarea value={todoTitle} onChange={e => setTodoTitle(e.target.value)}></textarea>
          {notifyOnSubmitError === false ? '' : <span  style={{textAlign:'left', display:'block',fontSize:'12px',fontWeight:'bold',color:'red'}}>Enter Todo Title</span>}
        </div> 
        
        <div className="text-center py-6">
            <span className="todo-modal-label">Schedule</span>
            <DatePicker onChange={onDateChange} value={date}/>
            <TimePicker onChange={onTimeChange} value={time}/>
        </div>
        <div className="text-center py-6">
            <span className="todo-modal-label">Priority</span>
            <span>
                <a><PriorityFlag fill="#b23b47" opacity="0.5"/></a>
                <a><PriorityFlag fill="orange"/></a>
                <a><PriorityFlag fill="green"/></a>
            </span>
        </div>
        <div>
            <Select
                clearable
                placeholder="Add/Select Label"
                options={labelsOptionsList}
                className="modal-label-selector"
                createNewLabel="+ Add Label"
                create
                separator
                onChange={selectedLabelOptions}
                dropdownHandle
                labelField="label"
                valueField="value"
                backspaceDelete
                
            />
        </div>
        </ModalBody>
        <ModalFooter>
          <Button className="red" onClick={applyChanges}>Apply changes</Button>{' '}
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TodoModal;