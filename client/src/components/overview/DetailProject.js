import axios from "axios";
import React, { Component } from "react";
import { Panel, Row, Col, Button, ProgressBar } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProject } from "../../actions/projectActions";
import { getDevelopers } from "../../actions/userActions";
import DevListGroupField from "../common/DevListGroupField";
import StrListGroupField from "../common/StrListGroupField";
import TacListGroupField from "../common/TacListGroupField";
import PropTypes from "prop-types";

import Spinner from "../common/Spinner";

class DetailProject extends Component {
  constructor() {
    super();
    this.state = {
      project: {},
      assignedDevelopers: [],

      errors: {}
    };

    // this.matchItem = this.matchItem.bind(this);
  }

  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
    this.props.getDevelopers();
  }

  render() {
    var tactics = this.props.project.assignedStrategiesWithAllTactics;

    function aggrTac() {
      var arr = [];

      if (tactics != undefined) {
        tactics.map(strategies =>
          strategies.assignedTactics.map(tactic => (arr = arr.concat(tactic)))
        );
      }

      return arr;
    }

    // console.log(aggrTac());
    //console.log(tactics);
    /*     var devName = [];
    for (var i = 0; i < this.createNewArray().length; i++) {
      devName.push(this.matchItem(this.createNewArray()[i]));
    }

    console.log();

    setTimeout(console.log(Promise.resolve(devName)), 2000);
    this.createNewArray();
    this.matchItem("5bf9449f9c505c1ec0a7f628").then(val => console.log(val)); */
    //console.log(this.props.project);

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
                          <div key={dev.id}>{dev.name}</div>
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
                          <div key={str.id}>{str.name}</div>
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
                  <Panel.Body>
                    {aggrTac()
                      ? aggrTac().map(tac => <div key={tac.id}>{tac.name}</div>)
                      : ""}
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
          </Panel.Body>
          <Link to="/PMoverview">
            <Button>Back to Overview</Button>
          </Link>
          <Link to={`/project/edit-project/${this.props.project._id}`}>
            <Button>Edit Project</Button>
          </Link>
        </Panel>

        {this.props.project.progress < 75 ? (
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h4">
                {this.props.project.progress === 0
                  ? "Project haven't started yet"
                  : "Project ongoing"}
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <ProgressBar
                striped
                bsStyle="danger"
                label={`${this.props.project.progress}%`}
                now={this.props.project.progress}
              />
            </Panel.Body>
          </Panel>
        ) : this.props.project.progress < 100 ? (
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h4">Project is ongoing</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <ProgressBar
                striped
                bsStyle="warning"
                label={`${this.props.project.progress}%`}
                now={this.props.project.progress}
              />
            </Panel.Body>
          </Panel>
        ) : (
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h4">
                Project is completed
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <ProgressBar
                striped
                bsStyle="success"
                label={`${this.props.project.progress}%`}
                now={this.props.project.progress}
              />
            </Panel.Body>
          </Panel>
        )}
      </div>
    );
  }
}

DetailProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getDevelopers: PropTypes.func.isRequired,
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
    getProject,
    getDevelopers
  }
)(withRouter(DetailProject));
