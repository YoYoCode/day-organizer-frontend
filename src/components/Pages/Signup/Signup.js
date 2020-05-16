import React, { Component } from 'react';
import { AvInput, AvForm, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Card, CardBody, CardGroup, Col, Container, Row } from 'reactstrap';

import { Dunzo } from '../../../services/api';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promptMessageBool: false,
      promptMessage: '',
    };
  }
  async setPromptMessage(msg) {
    this.setState({
      promptMessageBool: true,
      promptMessage: msg,
    });

    setTimeout(() => {
      this.setState({
        promptMessageBool: false,
        promptMessage: '',
      });
    }, 5000);
  }

  handleSubmit = async (event, errors, values) => {

    const userCredentials = {...values};
    if (userCredentials.password === userCredentials.reconfirmPassword) {
      try {
        const res = await Dunzo.signUpUser({ username: userCredentials.username, password: userCredentials.password });
  
        if (res.status !== 200) {
          throw new Error(res);
        }
        this.form.reset();
        setTimeout(() => {
          this.setPromptMessage('Registration successful');
        }, 5000);
  
        setTimeout(() => {
          const { history } = this.props;
          history.push({ pathname: '/login' });
        }, 2000);
  
      } catch (error) {
        this.form.reset();
        this.setPromptMessage('Sorry for the inconvenience, try for signup again !!!!');
      }
    } else {
      this.setPromptMessage('Please check the password\'s entered.');
    }
  };

  render() {
    const { promptMessageBool, promptMessage } = this.state;
    return (
      <div className='app flex-row align-items-center'>
        <Container fluid>
          <Row className='justify-content-center'>
            <Col xs='5'>
              <CardGroup>
                <Card className="signup-card">
                  <CardBody style={{ padding: '4rem' }}>
                    <AvForm
                      onSubmit={this.handleSubmit}
                      ref={c => {
                        this.form = c;
                      }}>
                      <h1>Signup</h1>
                      <Row>
                        <Col xs='12'>
                          <AvGroup style={{ paddingBottom: '1rem' }}>
                            <AvInput
                              type='email'
                              name='username'
                              id='signup-username'
                              placeholder='Enter Email'
                              style={{ width: '400px' }}
                              required
                            />
                            <AvFeedback>Please enter Username</AvFeedback>
                          </AvGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs='12'>
                          <AvGroup style={{ paddingBottom: '1rem' }}>
                            <AvInput
                              type='password'
                              name='password'
                              id='signup-password'
                              style={{ width: '400px' }}
                              placeholder='Enter Password'
                              required
                            />
                            <AvFeedback>Confirm Password</AvFeedback>
                          </AvGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs='12'>
                          <AvGroup style={{ paddingBottom: '1rem' }}>
                            <AvInput
                              type='password'
                              name='reconfirmPassword'
                              id='reconfirm-password'
                              style={{ width: '400px' }}
                              placeholder='Re-confirm Password'
                              required
                            />
                            <AvFeedback>Re-confirm Password</AvFeedback>
                          </AvGroup>
                        </Col>
                      </Row>
                      <Row style={{ paddingLeft: '15px' }}>
                        <Button className='px-4 text-right light-theme-btn'>
                          Submit
                        </Button>
                      </Row>
                    </AvForm>
                    {promptMessageBool ? (
                      <div className='p-3 my-2 rounded' style={{background: 'transparent'}}>
                        <div>{promptMessage}</div>
                      </div>
                    ) : (
                      ''
                    )}
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
