import React, { useState, useCallback } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import Toggle from '../ToggleSwitch/toggle';
import {loggedIn} from '../../App';

function TodoistNavbar (props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isloggedIn, setIsLoggedIn] = useState(loggedIn());

  const signOut = useCallback((e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    props.history.push('/login'); // eslint-disable-line
  }, [props]);



  const navigateHome = useCallback((e) => {
    e.preventDefault();
    props.history.push('/'); // eslint-disable-line
  }, [props]);

  return(
    <Navbar light expand="md" fixed="top">
      <div className="container">
        <NavbarBrand onClick={navigateHome}>Day Organizer</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem>
              <Toggle/>
          </NavItem>
            {isloggedIn ? <NavItem>
              <NavLink href="" onClick={signOut}>Logout</NavLink>
            </NavItem> : <></>}
            
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default TodoistNavbar;