import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Panel, Col, Tabs, Row, Tab, Button, Collapse } from "react-bootstrap";
import EditToolbar from "../common/EditToolbarProject";
import classnames from "classnames";

import "./ProjectItem.css";

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
    var tactics = this.props.project.assignedStrategiesWithAllTactics;

    function aggrTac() {
      var arr = [];

      tactics.map(strategies =>
        strategies.assignedTactics.map(tactic => (arr = arr.concat(tactic)))
      );

      return arr;
    }

    //console.log(aggrTac());
    //console.log(tactics);

    // this.props.project.assignedStrategiesWithAllTactics.map(strategies =>
    //   strategies.assignedTactics.map(tactic => console.log(tactic))
    // );

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

    const panelHeight = classnames("", { PanelHeight: open == false });

    // className={classnames('form-control form-control-lg', {
    //  'is-invalid': error
    //})}

    return (
      <Col xs={4}>
        <Panel
          className={panelHeight}
          bsStyle={project.progress === 100 ? "success" : undefined}
        >
          <Panel.Heading>
            <Link to={`/project/${project._id}`}>
              <h4>{project.name}</h4>
            </Link>

            <EditToolbar project={project} />
          </Panel.Heading>
          <Panel.Body>
            <h4>Description</h4>
            {descriptionFirstPart}

            <Collapse in={this.state.open}>
              <div>
                {descriptionSecondPart}
                <Row>
                  <Col md={6} mdPush={6}>
                    <h4>Tactics:</h4>

                    {aggrTac().map(tactic => (
                      <div key={tactic._id}>{tactic.name} </div>
                    ))}
                  </Col>
                  <Col md={6} mdPull={6}>
                    <h4>Developer:</h4>
                    {project.assignedDevelopers.map(developer => (
                      <div key={developer._id}>{developer.name} </div>
                    ))}
                  </Col>
                </Row>
              </div>
            </Collapse>
            <div className="extendMore" onClick={this.extendMore}>
              {more}
            </div>
          </Panel.Body>
        </Panel>
      </Col>
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
