
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField} from 'availity-reactstrap-validation';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-date-picker';
import Select from 'react-dropdown-select';

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
  const {
    buttonLabel,
    className
  } = props;
  const options = [{
    "id": "7fd93453-f403-4ddd-9239-1e689db4a9df",
    "label": "Aurelia ",
    },{
        "id": "7fd93453-f403-4ddd-9239-1e6ss89db4a9df",
        "label": " Kling",
    }];

  const [modal, setModal] = useState(false);
  const [value, onChange] = useState('23:59');

  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>Add Todo</ModalHeader>
        <ModalBody>
         <div className="text-center py-6">
          <span className="todo-modal-label">Todo Title</span>
          <textarea></textarea>
        </div> 
        
        <div className="text-center py-6">
            <span className="todo-modal-label">Schedule</span>
            <DatePicker/>
            <TimePicker onChange={onChange} value={value}/>
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
                multi
                options={options}
            />
        </div>
        </ModalBody>
        <ModalFooter>
          <Button className="red" onClick={props.toggle}>Apply changes</Button>{' '}
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TodoModal;