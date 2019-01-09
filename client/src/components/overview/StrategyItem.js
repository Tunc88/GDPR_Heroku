import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Panel, Col, Tabs, Tab, Button, Collapse } from "react-bootstrap";
import EditToolbarStrategy from "../common/editToolbarStrategy";
import { setFilterForPatterns } from "../../actions/patternActions";

class StrategyItem extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { strategy, auth } = this.props;
    return (
      <Col xs={12}>
        <Panel id="collapsible-panel-example-2">
          <Panel.Heading>
            <Panel.Title toggle>
              <h5>{strategy.name}</h5>
            </Panel.Title>
            <Panel.Title>
              {/*<EditToolbarStrategy strategy={strategy} />*/}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              {strategy.assignedTactics.map(tactic => (
                <span>
                  <div onClick={setFilterForPatterns(tactic.name)}>
                    {tactic.name}
                  </div>
                  <div>{tactic.description}</div>
                </span>
              ))}
            </Panel.Body>
          </Panel.Collapse>
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
  // strategy: state.strategy
});

export default connect(
  mapStateToProps,
  { setFilterForPatterns }
)(StrategyItem);
