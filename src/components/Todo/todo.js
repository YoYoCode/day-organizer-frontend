import React, { Component } from 'react';
import './todo.scss';
import _ from 'lodash';
import {ReactComponent as LabelTag} from '../../assets/tag.svg';
import {ReactComponent as DueClock} from '../../assets/timerClock.svg';
import {PriorityFlag} from '../Todo/TodoModal/todomodal';
import TodoModal from './TodoModal/todomodal';
import store from '../../app/store'
import { Dunzo } from '../../services/api';
import {dashboardTodoistUpdate} from '../Todoist/todoist-dashboard-slice';
import TestData from '../../Test-data/test-data.json';

export class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: props.data,
      status:false,
      editTodoCardId: null,
      modal: false
    }
    this.completeTodo = this.completeTodo.bind(this);
    this.toggle = this.toggle.bind(this);
    this.editTodo = this.editTodo.bind(this);
  }
     


  toggle () {
    this.setState({
      modal: !this.state.modal
    });
  }

  editTodo (e) {
    this.setState({
      editTodoCardId: e.target.id
    });
    this.toggle();
  }
      

  async completeTodo(e){
    const state = _.cloneDeep(store.getState());
    this.setState({status:true});
    
    const completeTodoCardData = _.filter(_.cloneDeep(state.todoistDashboard[e.currentTarget.dataset.section.toLowerCase()]), (todoData) => {
      return todoData._id === e.currentTarget.dataset.id;
    });
    const res = await Dunzo.editTodo({name: completeTodoCardData[0].name, label: _.isEmpty(completeTodoCardData[0].label._id) ? null : completeTodoCardData[0].label._id, reminder: completeTodoCardData[0].reminder, status: 'COMPLETED' }, completeTodoCardData[0]._id);


    if(res.status=== 200){
      store.dispatch(dashboardTodoistUpdate(res.data));
    }    
  }

  render() {
    const {todoData, editTodoCardId, modal} = this.state;
    return (
      <div className={`todo-card ${this.state.status ? 'completed' : 'notCompleted'}`} data-id={todoData._id}>
        {
          editTodoCardId !== null ? <TodoModal modal={modal} toggle={this.toggle} state={
            { todoId: editTodoCardId, sectionName: this.props.sectionName }
          }></TodoModal> : null
        }
        <ul className="todos">
          <li className="todos__todo">
            <div className="todos__todo-body">
              <input data-id={todoData._id} data-section={this.props.sectionName} onChange={this.completeTodo} className="cntr" title="Complete Todo" type="radio" id="rdo-1" name="radio-grp"/>
              <h3 className="todos__todo-title">
              {todoData.name}
              </h3>
            </div>

            <div className="todos__todo-label-edit-section">
              <PriorityFlag className="todos__priority-flag" fill={(() => {
                if (todoData.priority === "LOW") {
                  return "green";
                } else if (todoData.priority === "MEDIUM") {
                  return "orange";
                } else if (todoData.priority === "HIGH") {
                  return "#b23b47";
                }
              })()}/>
              <div className="todos__todo_details_section">
                <div className="todos__todo-timer-logo svg-fill">
                <DueClock></DueClock>
                <span className="todos__todo-duedate-text">{new Date(todoData.reminder).toLocaleString()}</span>
                </div>
              </div>
              <div title={todoData.label.name} className="todo-label svg-fill">
                <LabelTag></LabelTag>
                <span className="todo-label-text">{todoData.label.name.substring(0,10)}</span>
              </div>
              <div className="todos__todos-edit todo-edit-button">
                <span className="todos__todos-edit" id={todoData._id} onClick={this.editTodo}>
                  <svg width="24" height="24" id={todoData._id} onClick={this.editTodo} viewBox="0 0 24 24">
                    <path fill="#000000" id={todoData._id} onClick={this.editTodo} d="M20.71,4.04C21.1,3.65 21.1,3 20.71,2.63L18.37,0.29C18,-0.1 17.35,-0.1 16.96,0.29L15,2.25L18.75,6M17.75,7L14,3.25L4,13.25V17H7.75L17.75,7Z" />
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