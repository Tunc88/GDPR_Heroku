import axios from "axios";
import React, { Component } from "react";
import { Panel, Row, Col, Button, ProgressBar } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProject,
  setFinishedTactic,
  switchAttrForEditProject
} from "../../actions/projectActions";
import { getDevelopers } from "../../actions/userActions";
import DevListGroupField from "../common/DevListGroupField";
import StrListGroupField from "../common/StrListGroupField";
import TacListGroupField from "../common/TacListGroupField";
import PropTypes from "prop-types";
import store from "../../store";

import Spinner from "../common/Spinner";
import CommentBox from "../common/CommentBox";

class DetailProject extends Component {
  constructor() {
    super();
    this.state = {
      project: {},
      assignedDevelopers: [],
      finishedTactic: "",
      done: false,
      finishedTactics: [],
      progress: "",

      errors: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
    this.props.getDevelopers();
    setTimeout(() => {
      this.props.switchAttrForEditProject();
    }, 175);
  }

  handleInputChange(e) {
    //e.preventDefault();

    const finishedTacticData = {
      id: this.props.match.params.id,
      finishedTactic: e.target.name,
      finishedTactics: store.getState().project.finishedTactics
    };

    this.props.setFinishedTactic(finishedTacticData);
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

    var finishedTacticsArray = this.props.finishedTactics;

    function doneTacticArray() {
      var tempArr = [];

      for (var i = 0; i < aggrTac().length; i++) {
        tempArr.push(aggrTac()[i].name);
      }

      for (var i = 0; i < finishedTacticsArray.length; i++) {
        var index = tempArr.indexOf(finishedTacticsArray[i]);

        if (index !== -1) {
          tempArr.splice(index, 1);
        }
      }

      return tempArr;
    }

    var progress = 0;
    var finTac = this.props.finishedTactics;
    var allTac = this.props.project.assignedTactics;
    if (this.props.finishedTactics && this.props.project.assignedTactics) {
      progress = (finTac.length * 100) / allTac.length;
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
                          <div key={dev._id}>{dev.name}</div>
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
                          <div key={str._id}>{str.name}</div>
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
                      ? aggrTac().map(tac => (
                          <div key={tac._id}>
                            <form>
                              <input
                                name={tac.name}
                                type="checkbox"
                                defaultChecked={
                                  this.props.project.finishedTactics.indexOf(
                                    tac.name
                                  ) === -1
                                    ? false
                                    : true
                                }
                                onClick={this.handleInputChange}
                              />

                              {tac.name}
                            </form>
                          </div>
                        ))
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

        {progress < 75 ? (
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h4">
                {progress === 0
                  ? "Project haven't started yet"
                  : "Project ongoing"}
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <ProgressBar
                striped
                bsStyle="danger"
                label={`${progress.toFixed(2)}%`}
                now={progress}
              />
              <Row>
                <Col md={6}>
                  <h4>Done</h4>
                  <div>
                    <ul>
                      {this.props.finishedTactics.map(tac => (
                        <li key={tac}>{tac}</li>
                      ))}
                    </ul>
                  </div>
                </Col>
                <Col md={6}>
                  <h4>Open</h4>
                  <div>
                    <ul>
                      {doneTacticArray().map(tac => (
                        <li key={tac}>{tac}</li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Panel.Body>
          </Panel>
        ) : progress < 100 ? (
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h4">Project is ongoing</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <ProgressBar
                striped
                bsStyle="warning"
                label={`${progress.toFixed(2)}%`}
                now={progress}
              />
              <Row>
                <Col md={6}>
                  <h4>Done</h4>
                  <div>
                    <ul>
                      {this.props.finishedTactics.map(tac => (
                        <li key={tac}>{tac}</li>
                      ))}
                    </ul>
                  </div>
                </Col>
                <Col md={6}>
                  <h4>Open</h4>
                  <div>
                    <ul>
                      {doneTacticArray().map(tac => (
                        <li key={tac}>{tac}</li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
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
                label={`${progress.toFixed(2)}%`}
                now={progress}
              />
              <Row>
                <Col md={6}>
                  <h4>Done</h4>
                  <div>
                    <ul>
                      {this.props.finishedTactics.map(tac => (
                        <li key={tac}>{tac}</li>
                      ))}
                    </ul>
                  </div>
                </Col>
                <Col md={6}>
                  <h4>Open</h4>
                  <div>
                    <ul>
                      {doneTacticArray().map(tac => (
                        <li key={tac}>{tac}</li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Panel.Body>
          </Panel>
        )}

        <CommentBox project={this.props.project} />
      </div>
    );
  }
}

DetailProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getDevelopers: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setFinishedTactic: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  project: state.project.project,
  finishedTactics: state.project.finishedTactics
});

export default connect(
  mapStateToProps,
  {
    getProject,
    getDevelopers,
    setFinishedTactic,
    switchAttrForEditProject
  }
)(withRouter(DetailProject));
