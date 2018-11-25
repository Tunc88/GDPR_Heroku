import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import "./Footer.css";

export class Footer extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedBottom collapseOnSelect>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                Terms of Use
              </NavItem>
              <NavItem eventKey={2} href="#">
                Privacy
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
