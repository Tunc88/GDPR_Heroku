import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./PMoverview.css";
import { getProjects } from "../../actions/projectActions";
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
  }
  render() {
    return (
      <div>
        <PageHeader>Project Overview</PageHeader>
        <Grid>
          <Row>
            <Col xs={6} sm={4}>
              <Panel>
                <Panel.Heading>
                  <h4>Project 1</h4>
                  <div className="rowC">
                    <Row>
                      <Col xs={3} sm={10} smOffset={10}>
                        <i className="fas fa-edit" />
                        <i className="fas fa-trash-alt" />
                      </Col>
                    </Row>
                  </div>
                </Panel.Heading>
                <Panel.Body>
                  The focus of the project description is put on creating a
                  clear and correct understanding of the project in minds of the
                  people and organizations involved in the planning and
                  development process. The project team (which is supposed to do
                  the project) uses the document to get a general idea of what
                  amount of work and under what requirements is planned for
                  completion. The senior management team regards the project
                  description as the key source of preliminary information
                  necessary for strategic planning and development.
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
          <Col xs={2} xsOffset={10}>
            <ButtonToolbar>
              <Button bsStyle="primary">Create New Project</Button>
            </ButtonToolbar>
          </Col>
        </Grid>
      </div>
    );
  }
}

PMoverview.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProjects }
)(PMoverview);
