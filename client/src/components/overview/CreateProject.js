import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";

import { createProject } from "../../actions/projectActions";
import TextAreaField from "../common/TextAreaField";
import TextField from "../common/TextField";
import { Button } from "react-bootstrap";

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      name: "",
      assignedConcerns: [],
      finished: false,
      assignedDevelopers: [],

      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newProject = {
      name: this.state.name,
      description: this.state.description,
      assignedConcerns: this.state.assignedConcerns,
      assignedDevelopers: this.state.assignedDevelopers,
      finished: this.state.finished
    };

    this.props.createProject(newProject, this.props.history);
  }

  render() {
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProject }
)(withRouter(CreateProject));
