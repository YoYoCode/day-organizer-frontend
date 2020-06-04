import React, { Component } from 'react';
import './todo.scss';
import _ from 'lodash';
import {ReactComponent as LabelTag} from '../../assets/tag.svg';
import {ReactComponent as DueClock} from '../../assets/timerClock.svg';
import {PriorityFlag} from '../Todo/TodoModal/todomodal';

export class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: props.data
    }
  }

  render() {
    const {todoData} = this.state;
    return (
      <div className="todo-card">
        <ul className="todos">
          <li className="todos__todo">
           
            <div className="todos__todo-body">
              <span className="todos__todo-check" title="Complete this Todo"> </span>
              <h3 className="todos__todo-title" contentEditable="true" suppressContentEditableWarning={true}>
              {todoData.name}
              </h3>
            </div>

            <div className="todos__todo-label-edit-section">
              <PriorityFlag className="todos__priority-flag" fill="#b23b47"  />
              <div className="todos__todo_details_section">
                <div className="todos__todo-timer-logo svg-fill">
                <DueClock></DueClock>
                <span className="todos__todo-duedate-text">{todoData.reminder}</span>
                </div>
              </div>
              <div className="todo-label svg-fill">
                <LabelTag></LabelTag>
                <span className="todo-label-text">{todoData.label.name}</span>
              </div>
              <div className="todos__todos-edit todo-edit-button">
                <span className="todos__todos-edit">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#000000" d="M20.71,4.04C21.1,3.65 21.1,3 20.71,2.63L18.37,0.29C18,-0.1 17.35,-0.1 16.96,0.29L15,2.25L18.75,6M17.75,7L14,3.25L4,13.25V17H7.75L17.75,7Z" />
                  </svg>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Todo;