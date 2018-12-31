import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";
import {
  editProject,
  setAssignedDevelopers,
  setAssignedTactics,
  setAssignedStrategies,
  resetAssignedStrategies,
  switchAttrForEditProject
} from "../../actions/projectActions";
import TextAreaField from "../common/TextAreaField";
import TextField from "../common/TextField";
import DevListGroupField from "../common/DevListGroupField";
import TacListGroupField from "../common/TacListGroupField";
import StrListGroupField from "../common/StrListGroupField";
import { Button, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { getDevelopers } from "../../actions/userActions";
import { getTactics } from "../../actions/tacticActions";
import { getStrategies } from "../../actions/strategyActions";
import store from "../../store";

class EditProject extends Component {
  constructor() {
    super();
    this.state = {
      description: store.getState().project.project.description,
      name: store.getState().project.project.name,
      assignedStrategies: [],
      assignedTactics: [],
      finished: false,
      assignedDevelopers: [],
      //nameDeveloper: "",
      developers: [],

      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getDevelopers();
    this.props.getStrategies();
    this.props.match.params.id;
    this.props.switchAttrForEditProject();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    //const { projectId } = this.props;

    const newProject = {
      id: this.props.match.params.id,
      name: this.state.name,
      description: this.state.description,
      assignedTactics: store.getState().project.assignedTactics._id, //fehlerquelle
      assignedStrategies: store.getState().project.assignedStrategies,
      assignedDevelopers: store.getState().project.assignedDevelopers,
      //nameDeveloper: store.getState().project.nameDeveloper,
      finished: this.state.finished
    };

    this.props.editProject(newProject, this.props.history);
  }

  render() {
    const { loading, developers } = this.props;
    const { loading2, tactics } = this.props;
    const { loading3, strategies } = this.props;

    let developerContent;
    let tacticContent;
    let strategyContent;

    if (developers === null || loading) {
      developerContent = <Spinner />;
    } else {
      developerContent = (
        <DevListGroupField
          developers={this.props.developers}
          location={this.props.location}
        />
      );
    }

    if (tactics === null || loading2) {
      tacticContent = <Spinner />;
    } else {
      tacticContent = (
        <TacListGroupField
          tactics={this.props.strategies}
          location={this.props.location}
        />
      );
    }

    if (strategies === null || loading3) {
      strategyContent = <Spinner />;
    } else {
      strategyContent = (
        <StrListGroupField
          strategies={this.props.strategies}
          location={this.props.location}
        />
      );
    }

    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          label="Name of project"
          name="name"
          value={this.state.name}
          placeholder={store.getState().project.project.name}
          onChange={this.onChange}
        />

        <TextAreaField
          label="Description"
          name="description"
          value={this.state.description}
          placeholder={store.getState().project.project.description}
          onChange={this.onChange}
        />

        <Row className="show-grid">
          <Col md={3}>
            <h4>Choose your strategies</h4>
            {strategyContent}
          </Col>
          <Col md={3}>
            {" "}
            <h4>and the according tactics</h4>
            {tacticContent}
          </Col>

          <Col md={6}>
            <h4>Choose your developer</h4>
            {developerContent}
          </Col>
        </Row>

        <Button bsStyle="primary" onClick={this.onSubmit}>
          Save changes
        </Button>

        <Link
          to={`/project/${this.props.location.pathname.substr(
            this.props.location.pathname.length - 24
          )}`}
        >
          <Button bsStyle="info">Stop editing and discard changes </Button>
        </Link>
      </form>
    );
  }
}

EditProject.propTypes = {
  editProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getDevelopers: PropTypes.func.isRequired,
  getTactics: PropTypes.func.isRequired,
  getStrategies: PropTypes.func.isRequired,
  setAssignedDevelopers: PropTypes.func.isRequired,
  setAssignedTactics: PropTypes.func.isRequired,
  setAssignedStrategies: PropTypes.func.isRequired,
  resetAssignedStrategies: PropTypes.func.isRequired,
  switchAttrForEditProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  developers: state.user.developers,
  tactics: state.tactic.tactics,
  strategies: state.strategy.strategies,
  assignedDevelopers: state.project.assignedDevelopers,
  assignedTactics: state.project.assignedTactics,
  assignedStrategies: state.project.assignedStrategies
});

export default connect(
  mapStateToProps,
  {
    editProject,
    getDevelopers,
    getTactics,
    getStrategies,
    setAssignedDevelopers,
    setAssignedTactics,
    setAssignedStrategies,
    resetAssignedStrategies,
    switchAttrForEditProject
  }
)(withRouter(EditProject));
