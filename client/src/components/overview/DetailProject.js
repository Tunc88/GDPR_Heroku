import React, { Component } from "react";
import { Panel, Row, Col, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProject } from "../../actions/projectActions";
import DevListGroupField from "../common/DevListGroupField";
import StrListGroupField from "../common/StrListGroupField";
import TacListGroupField from "../common/TacListGroupField";
import PropTypes from "prop-types";

import {} from "../../actions/projectActions";

import Spinner from "../common/Spinner";

class DetailProject extends Component {
  constructor() {
    super();
    this.state = {
      project: {},

      errors: {}
    };

    this.listItems = this.listItems.bind(this);
  }

  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
  }

  listItems(arr) {
    arr.map(item => <div>{item}</div>);
  }

  render() {
    return (
      <div>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h1">
              {this.props.project.name}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Row>
              <Col md={12}>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h4">Description</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>{this.props.project.description}</Panel.Body>
                </Panel>
              </Col>
              <Col md={6}>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h4">
                      Assigned Developer
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    {this.props.project.assignedDevelopers
                      ? this.props.project.assignedDevelopers.map(dev => (
                          <div>{dev}</div>
                        ))
                      : ""}
                  </Panel.Body>
                </Panel>
              </Col>
              <Col md={3}>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h4">
                      Assigned Strategies
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    {this.props.project.assignedStrategies
                      ? this.props.project.assignedStrategies.map(str => (
                          <div>{str}</div>
                        ))
                      : ""}
                  </Panel.Body>
                </Panel>
              </Col>
              <Col md={3}>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h4">
                      Assigned Tactics
                    </Panel.Title>
                  </Panel.Heading>
                  {
                    //<TacListGroupField
                    //tactics={this.props.project.assignedTactics}
                    ///>
                  }
                </Panel>
              </Col>
            </Row>
          </Panel.Body>
          <Link to="/PMoverview">
            <Button>Back to Overview</Button>
          </Link>
          <Link to="/edit-project">
            <Button>Edit Project</Button>
          </Link>
        </Panel>
      </div>
    );
  }
}

DetailProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  project: state.project.project
});

export default connect(
  mapStateToProps,
  {
    getProject
  }
)(withRouter(DetailProject));
