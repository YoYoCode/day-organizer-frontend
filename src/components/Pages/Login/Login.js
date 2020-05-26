import React, {Component} from 'react';
import {
  AvInput,
  AvForm,
  AvGroup,
  AvFeedback,
} from 'availity-reactstrap-validation';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Row,
} from 'reactstrap';

import _ from 'lodash';
import {Dunzo} from '../../../services/api';
import {register} from '../../../client';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: false,
    };
    this.signup = this.signup.bind(this);
  }

  handleSubmit = async (event, errors, values) => {
    const {history} = this.props;
    try {
      const res = await Dunzo.loginUser({...values});
      if (_.has(res, ['data', 'data', 'token'])) {
        localStorage.setItem('token', res.data.data.token);
        history.push({pathname: '/todoist'});
        register(res.data);
      }
    } catch (error) {
      this.setState({
        errorMessage: true,
      });
      setTimeout(() => {
        this.setState({
          errorMessage: false,
        });
        this.form.reset();
      }, 6000);
    }
  };

  signup() {
    const {history} = this.props;
    history.push({pathname: '/signup'});
  }

  render() {
    const {errorMessage} = this.state;
    return (
      <div className='app flex-row align-items-center'>
        <Container fluid>
          <Row className='justify-content-center'>
            <CardGroup>
              <Card className='login-card'>
                <CardBody className='login-card-body'>
                  <AvForm
                    onSubmit={this.handleSubmit}
                    ref={(c) => {
                      this.form = c;
                    }}>
                    <h1>Login</h1>
                    <Row>
                      <Col xs='12'>
                        <AvGroup style={{paddingBottom: '1rem'}}>
                          <AvInput
                            type='text'
                            name='username'
                            id='login-username'
                            placeholder='Enter Username'
                            required
                          />
                          <AvFeedback>Please enter Username</AvFeedback>
                        </AvGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs='12'>
                        <AvGroup style={{paddingBottom: '1rem'}}>
                          <AvInput
                            type='password'
                            name='password'
                            id='login-password'
                            placeholder='Enter Password'
                            required
                          />
                          <AvFeedback>Please enter Password</AvFeedback>
                        </AvGroup>
                      </Col>
                    </Row>
                    <Row style={{paddingLeft: '15px'}}>
                      <Button
                        color='primary'
                        className='px-4 theme-btn'
                        style={{marginRight: '20px'}}>
                        Login
                      </Button>
                      <Button
                        color='primary'
                        className='px-4 text-right theme-btn'
                        onClick={this.signup}>
                        Create Account
                      </Button>
                    </Row>
                  </AvForm>
                  {errorMessage ? (
                    <div className='p-3 my-2 bg-danger rounded'>
                      <div>
                        Please enter the Username and Password correctly.
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </CardBody>
              </Card>
            </CardGroup>
          </Row>
        </Container>
      </div>
    );
  }
}
