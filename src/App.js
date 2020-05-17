import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import UIThemeSwitcher from './styles/ui-theme-change';
import './App.scss';

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

// Containers
// const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./components/Pages/Login/Login'));
const Signup = React.lazy(() => import('./components/Pages/Signup/Signup'));
const Register = React.lazy(() => import('./components/Pages/Register/Register'));
const Page404 = React.lazy(() => import('./components/Pages/Page404/Page404'));
const Page500 = React.lazy(() => import('./components/Pages/Page500/Page500'));

export default class App extends BrowserRouter {
  constructor() {
    super();
    this.themeComponent = new UIThemeSwitcher('darkBlack');
    this.themeComponent.register(document.getElementsByTagName('body')[0]);
   // this.themeComponent.setTheme(document.getElementsByTagName('body')[0], 'darkBlack');
  }

  render() {
    return (
      <Router history={createBrowserHistory()}>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path='/login' name='Login Page' render={props => <Login {...props} />} />
            <Route exact path='/signup' name='Signup Page' render={props => <Signup {...props} />} />
            <Route exact path='/register' name='Register Page' render={props => <Register {...props} />} />
            <Route exact path='/404' name='Page 404' render={props => <Page404 {...props} />} />
            <Route exact path='/500' name='Page 500' render={props => <Page500 {...props} />} />
            {/* <Route
              path='/'
              name='Login'
              render={props =>
                loggedIn() === false ? notAuthenticated(createBrowserHistory, props) : <DefaultLayout {...props} />
              }
            /> */}
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
    );
  }
}
