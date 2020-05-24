
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField} from 'availity-reactstrap-validation';
import DateTimePicker from 'react-datetime-picker';
import { TwitterPicker } from 'react-color';
import Select from 'react-dropdown-select';

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
  const Flag= props=>(
    <svg height="24" width="24" version="1.1" {...props}>
        <g transform="translate(0 -1028.4)">
        <rect height="22" width="1" y="1030.4" x="3" fill="#ecf0f1"/>
        <path d="m17.5 1030.4c-2.25 0-4.5 1.1-4.5 1.1s-2.25 1.1-4.5 1.1-4.5-1.1-4.5-1.1v13.7s2.25 1.2 4.5 1.2 4.5-1.2 4.5-1.2 2.25-1.1 4.5-1.1 4.5 1.1 4.5 1.1v-13.7s-2.25-1.1-4.5-1.1z" fill="fill" opacity='opacity'/>
        <rect height="22" width="1" y="1030.4" x="2" fill="#bdc3c7"/>
        <path d="m17.5 1043.2c-2.25 0-4.5 1.2-4.5 1.2s-2.25 1.1-4.5 1.1-4.5-1.1-4.5-1.1v1s2.25 1.1 4.5 1.1 4.5-1.1 4.5-1.1 2.25-1.2 4.5-1.2 4.5 1.2 4.5 1.2v-1s-2.25-1.2-4.5-1.2z" fill="#16a085"/>
        <path d="m3 1029.4c-0.5523 0-1 0.4-1 1h2c0-0.6-0.4477-1-1-1z" fill="#95a5a6"/>
        <path d="m3 1029.4v1h1c0-0.6-0.4477-1-1-1z" fill="#bdc3c7"/>
        </g>
    </svg>
  );

  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>Add Todo</ModalHeader>
        <ModalBody>
        <AvForm>
        <AvField name="name" label="Name" required />
        <div>
            <span className="todo-modal-label">Schedule</span>
            <DateTimePicker />
        </div>
        <div>
            <span className="todo-modal-label">Priority</span>
            <span>
                <a><Flag fill="#FF0000" opacity="0.3"/></a>
                <a><Flag fill="#00FF00"/></a>
                <a><Flag fill="#0000FF"/></a>
            </span>
        </div>
        <div>
            <TwitterPicker />
        </div>
        <div>
            <Select
                multi
                options={options}
            />
        </div>
        </AvForm>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>Apply changes</Button>{' '}
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TodoModal;