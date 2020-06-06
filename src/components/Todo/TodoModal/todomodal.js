
import React, { useState , useCallback, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-date-picker';
import Select from 'react-dropdown-select';
import {Dunzo} from '../../../services/api';
import _ from 'lodash';
import store from '../../../app/store';
import {dashboardTodoistUpdate} from '../../Todoist/todoist-dashboard-slice';
import {register} from '../../../client';

export const PriorityFlag = (props) => (
  <svg
    height='24'
    width='24'
    version='1.1'
    className={props.className}
    {...props}>
    <g transform='translate(0 -1028.4)'>
      <rect height='22' width='1' y='1030.4' x='3' fill={props.fill} />
      <path
        d='m17.5 1030.4c-2.25 0-4.5 1.1-4.5 1.1s-2.25 1.1-4.5 1.1-4.5-1.1-4.5-1.1v13.7s2.25 1.2 4.5 1.2 4.5-1.2 4.5-1.2 2.25-1.1 4.5-1.1 4.5 1.1 4.5 1.1v-13.7s-2.25-1.1-4.5-1.1z'
        fill={props.fill}
        opacity='opacity'
      />
      <rect height='22' width='1' y='1030.4' x='2' fill={props.fill} />
      <path
        d='m17.5 1043.2c-2.25 0-4.5 1.2-4.5 1.2s-2.25 1.1-4.5 1.1-4.5-1.1-4.5-1.1v1s2.25 1.1 4.5 1.1 4.5-1.1 4.5-1.1 2.25-1.2 4.5-1.2 4.5 1.2 4.5 1.2v-1s-2.25-1.2-4.5-1.2z'
        fill={props.fill}
      />
      <path
        d='m3 1029.4c-0.5523 0-1 0.4-1 1h2c0-0.6-0.4477-1-1-1z'
        fill={props.fill}
      />
      <path d='m3 1029.4v1h1c0-0.6-0.4477-1-1-1z' fill={props.fill} />
    </g>
  </svg>
);

const TodoModal = (props) => {
  const dispatch = useDispatch();
  const {
    buttonLabel,
    className,
    state
  } = props;
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('23:59');
  const [stateStore, setStateStore] = useState(store.getState());
  const [editTodoData, setEditTodoData] = useState(undefined);
  const [propsEditData, setPropsEditData] = useState(state);
  const [labelValues, setLabelValues] = useState([]);
  const [prioritySelected, setPrioritySelected] = useState('LOW');

  useEffect(() => {
    setStateStore(_.cloneDeep(store.getState()));
    setLabelsOptionsList(getLabelsOptionsDisplay());
  }, []);

  useEffect(() => {
    const subscription = store.subscribe(() => {
      setStateStore(_.cloneDeep(store.getState()));
      setLabelsOptionsList(getLabelsOptionsDisplay());
    });

    return () => {
      subscription();
    }
  });

  useEffect(() => {
    if (_.has(propsEditData, 'todoId') && _.get(propsEditData, 'todoId') !== null) {
      const editTodoCardData = _.filter(_.cloneDeep(stateStore.todoistDashboard[propsEditData.sectionName.toLowerCase()]), (todoData) => {
        return todoData._id === state.todoId;
      });
  
      setEditTodoData(editTodoCardData[0]);

      setTodoTitle(editTodoCardData[0].name);

      setDate(new Date(editTodoCardData[0].reminder));

      setTime(`${new Date(editTodoCardData[0].reminder).getHours()}:${new Date(editTodoCardData[0].reminder).getMinutes()}`);

      setPrioritySelected(editTodoCardData[0].priority);

      priorityClicked(document.querySelector(`.priority-flag#${editTodoCardData[0].priority}`));

      setLabelValues([{
        'label': editTodoCardData[0].label.name,
        'value': editTodoCardData[0].label.name
      }]);
    }
  }, []);

  const getLabelsOptionsDisplay = useCallback(() => {
    let labels = [];
    if (stateStore !== undefined) {
      labels =  _.map(_.cloneDeep(store.getState()).todoistDashboard.labels, (labelsOption)=>{
        return {
          "label": labelsOption.name,
          "value": labelsOption.name
        }
      })
    }
    
    return labels;
  });

  const [labelsOptionsList, setLabelsOptionsList] = useState(getLabelsOptionsDisplay());
  
  const updateDateAndTime = useCallback(()=>{
    const getDate = date;
    const getTime = time;
    if (getDate !== null && getTime !== null) {
      const hours = getTime.split(':')[0];
      const minutes = getTime.split(':')[1];
      getDate.setHours(hours);
      getDate.setMinutes(minutes);
      getDate.setSeconds('00');
      return getDate;
    } else {
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
    setDate(dateUpdated);
    setDateAndTime(updateDateAndTime().toISOString());  
  });
  const onTimeChange = useCallback(async (timeUpdated) => {
    setTime(timeUpdated);
    setDateAndTime(updateDateAndTime().toISOString());  
  });

  const applyInitialState = useCallback(() => {
    setTodoTitle('');
    setDate(new Date());
    setTime('23:59');
    setLabelValues([]);
  });

  const priorityClicked = useCallback((target) => {

    const priorityFlags = document.querySelectorAll('.priority-flag');

    _.map(priorityFlags, (priorityFlag) => {
      priorityFlag.style.opacity = '0.5';
      priorityFlag.style.transform = 'scale(1)';
    });

    setPrioritySelected(target.id);

    target.style.opacity = '1';
    target.style.transform = 'scale(1.5)';
  });
 
  const applyChanges = useCallback(async () => {
    if(todoTitle.trim() !== '') {
      const res = await Dunzo.createTodo({
        name: todoTitle,
        label: _.isEmpty(selectedLabelID) ? null : selectedLabelID,
        priority: prioritySelected !== '' ? prioritySelected : "LOW",
        reminder: dateAndTime,
      });

      if (res.status === 200) {
        store.dispatch(dashboardTodoistUpdate(res.data));
      }
      register();
      props.toggle();
    } else {
      setNotifyOnSubmitError(!notifyOnSubmitError);
    }
    applyInitialState();
  });

  const saveChanges = useCallback(async () => {
    if(todoTitle.trim() !== '') {
      const res = await Dunzo.editTodo({name: todoTitle, priority: prioritySelected !== '' ? prioritySelected : "LOW", label: _.isEmpty(selectedLabelID) ? null : selectedLabelID, reminder: dateAndTime }, editTodoData._id);

      if (res.status === 200) {
        store.dispatch(dashboardTodoistUpdate(res.data));
      }
      props.toggle();
    } else{
      setNotifyOnSubmitError(!notifyOnSubmitError)
    }

    applyInitialState();
  });

  const selectedLabelOptions = useCallback(async (selectedLabel)=> {
    if(!_.isUndefined(selectedLabel)){
        const selectLabel = _.filter(stateStore.todoistDashboard.labels, (labelsOption)=>{
        return selectedLabel[0].value == labelsOption.name;
      })
      if(!_.isEmpty(selectLabel)){
        setselectedLabelID(selectLabel[0]._id);
      } else {
        const res = await Dunzo.createLabel({name: selectedLabel[0].value});
        setselectedLabelID(res.data._id);
         if (res.status === 200) {
           store.dispatch(dashboardTodoistUpdate(res.data));
         }
      }
    }

    setLabelValues(selectedLabel);
  });

  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
        { _.isUndefined(editTodoData) ?
          <ModalHeader toggle={props.toggle}>Add Todo</ModalHeader> :
          <ModalHeader toggle={props.toggle}>Edit Todo</ModalHeader>
        }
        
        <ModalBody>
          <div className='text-center py-6'>
            <span className='todo-modal-label'>
              Todo Title{' '}
              {notifyOnSubmitError === false || todoTitle.trim() !== '' ? (
                ''
              ) : (
                <span style={{color: 'red', fontSize: '20px'}}>*</span>
              )}
            </span>
            <textarea
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}></textarea>
            {notifyOnSubmitError === false || todoTitle.trim() !== '' ? (
              ''
            ) : (
              <span
                style={{
                  textAlign: 'left',
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: 'red',
                }}>
                Enter Todo Title
              </span>
            )}
          </div>

          <div className='text-center py-6'>
            <span className='todo-modal-label'>Schedule</span>
            <DatePicker onChange={onDateChange} value={date} />
            <TimePicker onChange={onTimeChange} value={time} />
          </div>
          <div className='text-center py-6'>
            <span className='todo-modal-label'>Priority</span>
            <span>
              <a id='HIGH' className="priority-flag" title="HIGH" onClick={e => priorityClicked(e.currentTarget)} style={{opacity: '0.5', display: 'inline-block', margin: '.5rem'}} >
                <PriorityFlag id='HIGH' data-id="HIGH"  fill='#b23b47' />
              </a>
              <a id="MEDIUM" className="priority-flag" title="MEDIUM" onClick={e => priorityClicked(e.currentTarget)} style={{opacity: '0.5', display: 'inline-block', margin: '.5rem'}}>
                <PriorityFlag data-id="MEDIUM" id="MEDIUM"  fill='orange' />
              </a>
              <a id="LOW" className="priority-flag" title="LOW" onClick={e => priorityClicked(e.currentTarget)} style={{opacity: '1', display: 'inline-block', margin: '.5rem', transform: 'scale(1.5)'}}>
                <PriorityFlag data-id="LOW" id="LOW"  fill='green' />
              </a>
            </span>
        </div>
        <div>
        { _.isUndefined(editTodoData) ?
            <Select
                noDataRenderer={() => {
                  return (
                    <>
                      <p
                        style={{
                          borderTop: '1px solid #4a4a49',
                          padding: '.5rem 0',
                          marginBottom: '0',
                        }}
                        className='text-center'>
                        No Label
                      </p>
                    </>
                  );
                }}
                clearable
                placeholder="Add/Select Label"
                options={labelsOptionsList}
                className="modal-label-selector"
                createNewLabel="+ Add Label"
                create
                values={labelValues}
                separator
                onChange={selectedLabelOptions}
                dropdownHandle
                labelField="label"
                valueField="value"
                backspaceDelete
                searchable
            /> :
            <Select
                noDataRenderer={() => {
                  return (
                    <>
                      <p
                        style={{
                          borderTop: '1px solid #4a4a49',
                          padding: '.5rem 0',
                          marginBottom: '0',
                        }}
                        className='text-center'>
                        No Label
                      </p>
                    </>
                  );
                }}
                clearable
                values={labelValues}
                placeholder="Add/Select Label"
                options={labelsOptionsList}
                className="modal-label-selector"
                createNewLabel="+ Add Label"
                values={labelValues}
                create
                separator
                onChange={selectedLabelOptions}
                dropdownHandle
                labelField="label"
                valueField="value"
                backspaceDelete
                searchable
            />
        }
        </div>
        </ModalBody>
        <ModalFooter>
        { (_.isUndefined(state)) ?
          <Button className="red" onClick={applyChanges}>Apply changes</Button> :
          <Button className="red" onClick={saveChanges}>Save changes</Button>
        }
          
          {' '}<Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TodoModal;
