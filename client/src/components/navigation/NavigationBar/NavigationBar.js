import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  FormGroup,
  FormControl,
  Button,
  Thumbnail,
  Image
} from "react-bootstrap";

import classes from "./NavigationBar.css";

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">GDPR</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <div className="placeholder" />
            <FormGroup>
              <FormControl
                id="search"
                type="text"
                placeholder="Enter concern or pattern"
              />
            </FormGroup>{" "}
            <Button type="submit">Search!</Button>
          </Navbar.Form>

          <Image
            id="userPic"
            src="https://venturebeat.com/wp-content/uploads/2016/02/anonymous-face.shutterstock_365080829.jpg?fit=400%2C320&strip=all"
          />

          <Nav>
            <NavDropdown eventKey={3} title="Profile" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>View</MenuItem>
              <MenuItem eventKey={3.2}>Edit</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Change Role</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
