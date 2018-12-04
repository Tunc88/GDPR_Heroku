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

var isLoggedIn = false;
var loggedInRole = "PM";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = [{ value: "" }];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("The search was submitted " + this.state.value);
    event.preventDefault();
  }

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
                placeholder="Enter tactic or pattern"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </FormGroup>{" "}
            <Link to="/search">
              <Button
                onClick={this.handleSubmit}
                onKeyPress={this.handleSubmit}
                value={this.state.value}
                type="submit"
              >
                Search!
              </Button>
            </Link>{" "}
            <Link to="/overview">
              <Button type="submit">Back to overview</Button>
            </Link>
          </Navbar.Form>{" "}
          <Navbar.Form pullRight className="persona">
            <div className="placeholderRight" />
            <FormGroup>
              <img
                alt="userPic"
                id="userPic"
                src="https://venturebeat.com/wp-content/uploads/2016/02/anonymous-face.shutterstock_365080829.jpg?fit=400%2C320&strip=all"
              />

              {isLoggedIn == false ? (
                <Nav>
                  <NavItem eventKey={1} href="/login">
                    Login
                  </NavItem>
                  <NavItem eventKey={2} href="/register">
                    Register
                  </NavItem>

                  <Navbar.Text className="roleText">Guest</Navbar.Text>
                </Nav>
              ) : (
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
                  <Navbar.Text className="roleText">{loggedInRole}</Navbar.Text>
                </Nav>
              )}
            </FormGroup>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
