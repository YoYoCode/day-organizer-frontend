import React, { Component } from 'react';
import './todo.scss';
import _ from 'lodash';

export class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
     
    return (
      <div className="todo-card">
        <ul className="todos">
          <li className="todos__todo">
            <span className="todos__todo-check" title="Complete this Todo"> </span>
            <div className="todos__todo-body">
              <h3 className="todos__todo-title" contentEditable="true" suppressContentEditableWarning={true}>
              start dieting
              </h3>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Todo;