import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Panel, Col, Tabs, Tab, Button, Collapse } from "react-bootstrap";
import EditToolbarStrategy from "../common/editToolbarStrategy";
import {
  setFilterForPatterns,
  setStrategyAsFilter,
  deselectStrategyAsFilter
} from "../../actions/patternActions";
import TacticFilter from "./TacticFilter";
import ChooseTactic from "./ChooseTactic";

class StrategyItem extends Component {
  constructor(props, context) {
    super(props, context);
  }
  setStrategyAsFilter = strategy => {
    //e.preventDefault();
    this.props.setStrategyAsFilter(strategy.assignedTactics);
    /*  var strategyPanelStyle = document.getElementById(strategy.name).style;
    strategyPanelStyle.borderColor = "#337ab7";
    strategyPanelStyle.borderWidth = "3px";*/
  };

  deselectStrategyAsFilter = strategy => {
    this.props.deselectStrategyAsFilter(strategy.assignedTactics);
    /* var strategyPanelStyle = document.getElementById(strategy.name).style;
    strategyPanelStyle.borderColor = "#ddd";
    strategyPanelStyle.borderWidth = "1px";*/
  };

  render() {
    const { strategy, auth, pattern, isFilter } = this.props;
    const visibilityFilters = pattern.visibilityFilters;
    let strategyHeading;
    let cssClassesofStrategyPanel;
    if (isFilter) {
      var counterAllTacticsIncludedinFilters = 0;
      strategy.assignedTactics.forEach(tactic => {
        if (visibilityFilters.includes(tactic.name)) {
          counterAllTacticsIncludedinFilters++;
        }
      });
      if (
        strategy.assignedTactics.length == counterAllTacticsIncludedinFilters
      ) {
        strategyHeading = (
          <span>
            <Panel.Title toggle className={"inline"}>
              <span class="h5">{strategy.name}</span>
            </Panel.Title>
            <Panel.Title className={"inline"}>
              <span
                className={"dotForActiveStrategyFilter"}
                onClick={() => this.deselectStrategyAsFilter(strategy)}
              />
            </Panel.Title>
          </span>
        );
        cssClassesofStrategyPanel = "activeStrategyPanel";
      } else {
        strategyHeading = (
          <span>
            <Panel.Title toggle className={"inline"}>
              <span class="h5">{strategy.name}</span>
            </Panel.Title>
            <Panel.Title className={"inline"}>
              <span
                className={"dotForStrategyFilter"}
                onClick={() => this.setStrategyAsFilter(strategy)}
              />
            </Panel.Title>
          </span>
        );
        cssClassesofStrategyPanel = "passiveStrategyPanel";
      }
    } else {
      strategyHeading = (
        <Panel.Title toggle>
          <span class="h5">{strategy.name}</span>
        </Panel.Title>
      );
      cssClassesofStrategyPanel = "";
    }
    return (
      <span>
        <Col xs={isFilter ? 12 : 12}>
          <Panel id={strategy.name} className={cssClassesofStrategyPanel}>
            <Panel.Heading>
              {strategyHeading}
              {/*<Panel.Title toggle>
                <span class="h5">{strategy.name}</span>
                <span
                  onClick={() =>
                    this.setStrategyAsFilter(strategy.assignedTactics)
                  }
                >
                  filter
                </span>
                </Panel.Title>*/}
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body>
                {isFilter ? (
                  <span>
                    {strategy.assignedTactics.map(tactic => (
                      <TacticFilter tactic={tactic} />
                    ))}
                  </span>
                ) : (
                  <span>
                    {strategy.assignedTactics.map(tactic => (
                      <ChooseTactic tactic={tactic} />
                    ))}
                  </span>
                )}
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        </Col>
      </span>
    );
  }
}

StrategyItem.propTypes = {
  strategy: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  pattern: state.pattern
  // strategy: state.strategy
});

export default connect(
  mapStateToProps,
  { setFilterForPatterns, setStrategyAsFilter, deselectStrategyAsFilter }
)(StrategyItem);
