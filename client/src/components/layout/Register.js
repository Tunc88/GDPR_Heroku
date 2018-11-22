import React, { Component } from "react";
import {
  Panel,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
  Row,
  Button,
  ButtonToolbar,
  DropdownButton,
  MenuItem,
  Grid,
  Thumbnail
} from "react-bootstrap";

import "./Register.css";

class Register extends Component {
  render() {
    return (
      <div>
        <Panel>
          <Panel.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={5}>
                  <FormControl type="name" placeholder="Name" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalUserName">
                <Col componentClass={ControlLabel} sm={2}>
                  User Name
                </Col>
                <Col sm={5}>
                  <FormControl type="username" placeholder="UserName" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={5}>
                  <FormControl type="Email" placeholder="Email" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={5}>
                  <FormControl type="password" placeholder="Password" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalConfirmPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Confirm Password
                </Col>
                <Col sm={5}>
                  <FormControl
                    type="confirmpassword"
                    placeholder="ConfirmPassword"
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalRole">
                <Col componentClass={ControlLabel} sm={2}>
                  Role
                </Col>
                <Col sm={5}>
                  <ButtonToolbar>
                    <DropdownButton
                      title="Select Role"
                      id="dropdown-size-medium"
                    >
                      <MenuItem eventKey="1">Developer</MenuItem>
                      <MenuItem eventKey="2">Data Protection Officer</MenuItem>
                      <MenuItem eventKey="3">Project Manager</MenuItem>
                      <MenuItem eventKey="4">Guest</MenuItem>
                      <MenuItem divider />
                      <MenuItem eventKey="4">Other</MenuItem>
                    </DropdownButton>
                  </ButtonToolbar>
                </Col>
                <Grid>
                  <Row>
                    <Col xs={2} md={2}>
                      <Thumbnail
                        id="userPic"
                        href="#"
                        alt="171x180"
                        src="https://cdn4.iconfinder.com/data/icons/superheroes/512/batman-512.png"
                      >
                        <p>
                          <Button bsStyle="primary">Choose Picture</Button>
                        </p>
                      </Thumbnail>
                    </Col>
                  </Row>
                </Grid>
                <div className="rowC">
                  <Row>
                    <Col xs={2} xsOffset={5}>
                      <ButtonToolbar>
                        <Button bsStyle="primary">Register</Button>
                        <Button bsStyle="primary">Cancel</Button>
                      </ButtonToolbar>
                    </Col>
                  </Row>
                </div>
              </FormGroup>
            </Form>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default Register;
