import {Accordion, Card, Button} from 'react-bootstrap';
import React, {Component} from 'react';
import Todo from '../todo';

export default class TodoCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoSectionData: props.data,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      todoSectionData: nextProps.data
    };
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
              <Card.Body>
                {this.state.todoSectionData.map((todoData) => {
                  return (<Todo data={todoData} sectionName={this.props.sectionName} key={todoData.name} />);
                })}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}
