import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Panel, Col, Tabs, Tab, Button, Collapse } from "react-bootstrap";
import EditToolbar from "../common/EditToolbarProject";

class ProjectItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }
  extendMore = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { project, auth } = this.props;
    const open = this.state.open;
    let more;
    let descriptionFirstPart = project.description.split(" ", 10).join(" ");
    let descriptionSecondPart = project.description.substring(
      descriptionFirstPart.length
    );
    if (open) {
      more = <p>Less...</p>;
    } else {
      more = <p>More...</p>;
    }

    return (
      <Panel>
        <Panel.Heading>
          <Col xs={12}>
            <h4>{project.name}</h4>
          </Col>
          <EditToolbar project={project} />

          <div>
            {/*project.assignedConcerns.map(concern => (
              <span key={concern.id}>{concern.concernName} </span>
            ))*/}
          </div>
        </Panel.Heading>
        <Panel.Body>
          {descriptionFirstPart}
          <Collapse in={this.state.open}>
            <div>{descriptionSecondPart}</div>
          </Collapse>
          <div className="extendMore" onClick={this.extendMore}>
            {more}
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(ProjectItem);
