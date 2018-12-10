import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";
import {
  createProject,
  setAssignedDevelopers,
  setAssignedTactics
} from "../../actions/projectActions";
import TextAreaField from "../common/TextAreaField";
import TextField from "../common/TextField";
import DevListGroupField from "../common/DevListGroupField";
import TacListGroupField from "../common/TacListGroupField";
import { Button, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { getDevelopers } from "../../actions/userActions";
import { getTactics } from "../../actions/tacticActions";
import store from "../../store";

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      name: "",
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
    this.props.getTactics();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newProject = {
      name: this.state.name,
      description: this.state.description,
      assignedTactics: store.getState().project.assignedTactics,
      assignedDevelopers: store.getState().project.assignedDevelopers,
      //nameDeveloper: store.getState().project.nameDeveloper,
      finished: this.state.finished
    };

    this.props.createProject(newProject, this.props.history);
  }

  render() {
    const { loading, developers } = this.props;
    const { loading2, tactics } = this.props;

    let developerContent;
    let tacticContent;

    if (developers === null || loading) {
      developerContent = <Spinner />;
    } else {
      developerContent = (
        <DevListGroupField
          onClick={this.onClickSetState}
          developers={this.props.developers}
        />
      );
    }

    if (tactics === null || loading2) {
      tacticContent = <Spinner />;
    } else {
      tacticContent = <TacListGroupField tactics={this.props.tactics} />;
    }

    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          label="Name of project"
          name="name"
          value={this.state.name}
          placeholder="Enter the name of the project"
          onChange={this.onChange}
        />

        <TextAreaField
          label="Description"
          name="description"
          value={this.state.description}
          placeholder="Enter description"
          onChange={this.onChange}
        />

        <Row className="show-grid">
          <Col md={6} mdPush={6}>
            <h4>Choose your tactics</h4>
            {tacticContent}
          </Col>
          <Col md={6} mdPull={6}>
            <h4>Choose your developer</h4>
            {developerContent}
          </Col>
        </Row>

        <Button bsStyle="primary" onClick={this.onSubmit}>
          Create Project
        </Button>
      </form>
    );
  }
}

CreateProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getDevelopers: PropTypes.func.isRequired,
  getTactics: PropTypes.func.isRequired,
  setAssignedDevelopers: PropTypes.func.isRequired,
  setAssignedTactics: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  developers: state.user.developers,
  tactics: state.tactic.tactics,
  assignedDevelopers: state.project.assignedDevelopers,
  assignedTactics: state.project.assignedTactics
});

export default connect(
  mapStateToProps,
  {
    createProject,
    getDevelopers,
    getTactics,
    setAssignedDevelopers,
    setAssignedTactics
  }
)(withRouter(CreateProject));
