import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import './App.scss';
import { Todoist } from './components/Todoist/todoist';
import TodoistNavbar from './components/Todoist-Navbar/navbar';

const loading = () => {
  return (
    <div className='d-flex justify-content-center' style={{ verticalAlign: 'middle' }}>
      <strong>Loading...</strong>
    </div>
  );
};

const loggedIn = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  }
  return false;
};

const notAuthenticated = (createBrowserHistory, props) => {
  // eslint-disable-line no-shadow
  const history = createBrowserHistory();
  history.push('/login');
  return <Login {...props} />;
};

// Pages
const Login = React.lazy(() => import('./components/Pages/Login/Login'));
const Signup = React.lazy(() => import('./components/Pages/Signup/Signup'));
const Register = React.lazy(() => import('./components/Pages/Register/Register'));
const Page404 = React.lazy(() => import('./components/Pages/Page404/Page404'));
const Page500 = React.lazy(() => import('./components/Pages/Page500/Page500'));

export default class App extends BrowserRouter {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
      <TodoistNavbar/>
      <Router history={createBrowserHistory()}>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path='/login' name='Login Page' render={props => <Login {...props} />} />
            <Route exact path='/signup' name='Signup Page' render={props => <Signup {...props} />} />
            <Route exact path='/register' name='Register Page' render={props => <Register {...props} />} />
            <Route exact path='/404' name='Page 404' render={props => <Page404 {...props} />} />
            <Route exact path='/500' name='Page 500' render={props => <Page500 {...props} />} />
            {/* <Route exact path='/todoist' name='todoist' render={props => <Todoist {...props} />} /> */}
            <Route
              path='/'
              name='Login'
              render={props =>
                loggedIn() === false ? notAuthenticated(createBrowserHistory, props) : <Todoist {...props} />
              }
            />
            <Route
              path='/'
              name='Login'
              render={props =>
                loggedIn() === false ? notAuthenticated(createBrowserHistory, props) : null
              }
            />
          </Switch>
        </React.Suspense>
      </Router>
      </div>
    );
  }
}
