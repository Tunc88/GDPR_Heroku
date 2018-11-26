import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Button,
  Panel
} from "react-bootstrap";

class Login extends Component {
  render() {
    return (
      <div>
        <Panel>
          <Panel.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalUserName">
                <Col componentClass={ControlLabel} sm={2}>
                  User Name
                </Col>
                <Col sm={5}>
                  <FormControl type="username" placeholder="UserName" />
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

              <FormGroup>
                <Col smOffset={2} sm={5}>
                  <Button type="submit">Login</Button>
                </Col>
              </FormGroup>
            </Form>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default Login;
