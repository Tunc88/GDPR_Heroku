import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Panel, Col, Tabs, Tab, Button, Collapse } from "react-bootstrap";
import EditToolbarStrategy from "../common/editToolbarStrategy";

class StrategyItem extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { strategy, auth } = this.props;

    return (
      <Col xs={4}>
        <Panel>
          <Panel.Heading>
            <h5>{strategy.name}</h5>
            <EditToolbarStrategy strategy={strategy} />
          </Panel.Heading>
          <Panel.Body />
          {strategy.assignedTactics.map(tactic => (
            <span>
              <div>{tactic.name}</div>
              <div>{tactic.description}</div>
            </span>
          ))}
          <Panel.Body />
        </Panel>
      </Col>
    );
  }
}

StrategyItem.propTypes = {
  strategy: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(StrategyItem);
