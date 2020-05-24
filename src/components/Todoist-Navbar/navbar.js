import React, { useState } from 'react';
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

export const TodoistNavbar = (props) => {
      const [isOpen, setIsOpen] = useState(false);
      const toggle = () => setIsOpen(!isOpen);

      return(
        <Navbar light expand="md" fixed="top">
          <div className="container">
            <NavbarBrand href="/">TodoList</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar >
          <Nav className="ml-auto" navbar>
          <NavItem>
              <Toggle/>
          </NavItem>
            <NavItem>
              <NavLink href="">Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
          </div>
        </Navbar>
      );
    }

    export default TodoistNavbar;