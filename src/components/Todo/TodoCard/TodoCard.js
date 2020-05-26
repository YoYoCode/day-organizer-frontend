import {Accordion, Card, Button} from 'react-bootstrap';
import React, {Component} from 'react';
import Todo from '../todo';

export default class TodoCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render () {
    return (
      <Accordion defaultActiveKey={this.props.defaultActiveKey}>
        <Card>
          <Accordion.Toggle className="section-toggle" as={Button} eventKey="0">
            <span className="section-name">{this.props.sectionName}</span>
            <span><svg width="24" height="24" viewBox="0 0 24 24"> <path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" /> </svg></span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Todo/>
              <Todo/>
              <Todo/>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}