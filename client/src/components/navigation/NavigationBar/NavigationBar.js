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
import { Link } from "react-router-dom";

import classes from "./NavigationBar.css";

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">GDPR</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <div className="placeholderLeft" />
            <FormGroup>
              <FormControl
                id="search"
                type="text"
                placeholder="Enter concern or pattern"
              />
            </FormGroup>{" "}
            <Link to="/search">
              <Button type="submit">Search!</Button>
            </Link>{" "}
            <Link to="/overview">
              <Button type="submit">Back to overview</Button>
            </Link>
          </Navbar.Form>{" "}
          <Navbar.Form pullRight className="persona">
            <div className="placeholderRight" />
            <FormGroup>
              <img
                id="userPic"
                src="https://venturebeat.com/wp-content/uploads/2016/02/anonymous-face.shutterstock_365080829.jpg?fit=400%2C320&strip=all"
              />
              <Nav>
                <NavDropdown
                  className="profile"
                  eventKey={3}
                  title="Profile"
                  id="basic-nav-dropdown"
                >
                  <MenuItem eventKey={3.1}>View</MenuItem>
                  <MenuItem eventKey={3.2}>Edit</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Change Role</MenuItem>
                </NavDropdown>
              </Nav>
            </FormGroup>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
