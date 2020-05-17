import React, { Component } from 'react';
import './todo.scss';
import _ from 'lodash';

export class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
     
      return (
        <div class="">
           <div class="container">
                <a href="" class="add-task">
                      + Add ToDo 
                </a>
                <ul class="todos">
                    <li class="todos__todo">
                        <span class="todos__todo-check" title="Complete this Todo"> </span>
                        <svg class="todos__todo-edit" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#000000" d="M20.71,4.04C21.1,3.65 21.1,3 20.71,2.63L18.37,0.29C18,-0.1 17.35,-0.1 16.96,0.29L15,2.25L18.75,6M17.75,7L14,3.25L4,13.25V17H7.75L17.75,7Z" /> 
                        </svg>
                        <div class="todos__todo-body">
                            <h3 class="todos__todo-title" contenteditable="true">
                            start dieting
                            </h3>
                            <input type="date" class="todos__todo-date" />
                        </div>
                        <div class="todos__todo-modal"></div>
                    </li>
                    <li class="todos__todo">
                    <span class="todos__todo-check">
                    </span>
                    <svg class="todos__todo-edit" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#000000" d="M20.71,4.04C21.1,3.65 21.1,3 20.71,2.63L18.37,0.29C18,-0.1 17.35,-0.1 16.96,0.29L15,2.25L18.75,6M17.75,7L14,3.25L4,13.25V17H7.75L17.75,7Z" /> </svg>
                    <div class="todos__todo-body">
                        <h3 class="todos__todo-title" contenteditable="true">
                        start dieting
                        </h3>
                    </div>
                    <div class="todos__todo-modal"></div>
                    </li>
                 </ul>
                </div>
        </div>
      );
    }
}

export default Todo;