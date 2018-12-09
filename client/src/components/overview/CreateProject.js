import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";
import { createProject } from "../../actions/projectActions";
import TextAreaField from "../common/TextAreaField";
import TextField from "../common/TextField";
import DevListGroupField from "../common/DevListGroupField";
import { Button, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { getDevelopers } from "../../actions/userActions";

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      name: "",
      assignedConcerns: [],
      finished: false,
      assignedDevelopers: [],
      developers: [],

      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getDevelopers();
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
    const { loading } = this.props;
    const { developers } = this.props;

    let developerContent;

    if (developers === null || loading) {
      developerContent = <Spinner />;
    } else {
      developerContent = (
        <DevListGroupField developers={this.props.developers} />
      );
    }
    console.log(developers);

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
  getDevelopers: PropTypes.func.isRequired
  //,  developer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  developers: state.user.developers
});

export default connect(
  mapStateToProps,
  { createProject, getDevelopers }
)(withRouter(CreateProject));
