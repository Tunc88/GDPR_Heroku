import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import "./Footer.css";

export class Footer extends Component {
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect fixedBottom>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem
                eventKey={1}
                target="_blank"
                href="https://www.privacypatterns.org"
              >
                Patterns and Strategies taken from privacypatterns.org
              </NavItem>
              <NavItem eventKey={2} href="#">
                Terms of Use
              </NavItem>
              <NavItem eventKey={3} href="#">
                Privacy
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
