import {Accordion, Card, Button} from 'react-bootstrap';
import React, {Component} from 'react';
import Todo from '../todo';
import _ from 'lodash';
import {Dunzo} from '../../../services/api';

export default class TodoCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoSectionData: props.data,
    };

    this.callApi = this.callApi.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        todoSectionData: nextProps.data
      });

      return true;
    }

    if (this.state.todoSectionData !== nextState.todoSectionData) {
      return true;
    }
    return false;
  }

  async callApi() {
    if (_.has(this.props, 'classNameFull')) {

      if(this.props.sectionType === 'Label') {
        if (!_.isEmpty(this.state.todoSectionData)) {
          const res = await Dunzo.getTasksByLabel({"label": this.state.todoSectionData[0].label._id});
          if(res.status === 200){

            // this.props.data = res.data;
            this.setState({
              todoSectionData: res.data
            });
          }
        }
      } else if(this.props.sectionType === 'Priority') {
        const res = await Dunzo.getTasksByPriority({"priority": this.state.todoSectionData[0].priority});
        if(res.status === 200){
          // this.props.data = res.data;
          this.setState({
            todoSectionData: res.data
          });
        }
      } else if(this.props.sectionType === 'Completed') {
        const res = await Dunzo.getTasksByStatus({"status": "COMPLETED"});
        if(res.status === 200){
          // this.props.data = res.data;
          this.setState({
            todoSectionData: res.data
          });
        }
      }
    }
  }

  render () {
    return (
      <div className="accordion__wrapper">
         <Accordion defaultActiveKey={this.props.defaultActiveKey}>
          <Card className="todos">
            <Accordion.Toggle className="section-toggle" as={Button} eventKey="0">
              <span className="section-name">{this.props.sectionName}</span>
              <span><svg width="24" className="accordion-arrow" height="24" viewBox="0 0 24 24"> <path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" /> </svg></span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body className={ _.has(this.props, 'classNameFull') ? 'full' : ''}>
                {this.state.todoSectionData.map((todoData) => {
                  return (<Todo data={todoData} sectionName={this.props.sectionName} key={todoData._id} apiCall={this.callApi} />);
                })}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}
