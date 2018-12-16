import React, { Component } from "react";
import { Panel, Row, Col } from "react-bootstrap";

class DetailProject extends Component {
  render() {
    return (
      <div>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h1">Project Name</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Row>
              <Col md="12">
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h4">Description</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>blablabla</Panel.Body>
                </Panel>
              </Col>
              <Col md="6">
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h4">
                      Assigned Developer
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>blablabla</Panel.Body>
                </Panel>
              </Col>
              <Col md="3">
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h4">
                      Assigned Strategies
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>blablabla</Panel.Body>
                </Panel>
              </Col>
              <Col md="3">
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h4">
                      Assigned Tactics
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>blablabla</Panel.Body>
                </Panel>
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default DetailProject;
