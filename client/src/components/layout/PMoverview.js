import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./PMoverview.css";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import ProjectFeed from "../overview/ProjectFeed";
import { getProjects } from "../../actions/projectActions";
import { getDevelopers } from "../../actions/userActions";
import {
  Col,
  Thumbnail,
  Grid,
  Row,
  PageHeader,
  Panel,
  ButtonToolbar,
  Button,
  Image
} from "react-bootstrap";

class PMoverview extends Component {
  componentDidMount() {
    this.props.getProjects();
    this.props.getDevelopers();
  }

  render() {
    const { projects, loading } = this.props.project;

    let projectContent;

    if (projects === null || loading) {
      projectContent = <Spinner />;
    } else {
      projectContent = <ProjectFeed projects={projects} />;
    }

    return (
      <div>
        <PageHeader>Project Overview</PageHeader>
        <Grid>
          <Row>
            <Col xs={6} sm={4}>
              {projectContent}
            </Col>
          </Row>
          <Col xs={2} xsOffset={10}>
            <Link to="/create-project">
              <Button bsStyle="primary">Create New Project</Button>
            </Link>
          </Col>
        </Grid>
      </div>
    );
  }
}

PMoverview.propTypes = {
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  getDevelopers: PropTypes.func.isRequired,
  developer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project,
  developer: state.user.developer
});

export default connect(
  mapStateToProps,
  { getProjects, getDevelopers }
)(PMoverview);
