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
  setFilterForPatterns = tactic => {
    //alert(tactic);
    this.props.setFilterForPatterns(tactic);
  };

  includesVisibilityFilters = tactic => {
    if (this.props.pattern.visibilityFilters.includes(tactic)) {
      return true;
    }
  };
  render() {
    const { strategy, auth, pattern, tactic } = this.props;
    var visibilityFilters = pattern.visibilityFilters;
    var activeFilter = false;
    let tacticItem;
    //alert(visibilityFilters);
    if (visibilityFilters.includes(tactic.name)) {
      //alert(visibilityFilters);
      //console.log(tactic);
      //console.log("true");
      tacticItem = (
        <span>
          <div
            className="activeFilter filter"
            onClick={() => this.setFilterForPatterns(tactic.name)}
          >
            {tactic.name}
          </div>
          <div>{tactic.description}</div>
        </span>
      );
    } else {
      // console.log("filter:");
      //console.log(visibilityFilters);
      //console.log(tactic);
      //console.log("false");
      tacticItem = (
        <span>
          <div
            className="filter"
            onClick={() => this.setFilterForPatterns(tactic.name)}
          >
            {tactic.name}
          </div>
          <div>{tactic.description}</div>
        </span>
      );
      // alert("false");
    }
    return <span>{tacticItem}</span>;
  }
}

StrategyItem.propTypes = {
  strategy: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  pattern: state.pattern
});

export default connect(
  mapStateToProps,
  { setFilterForPatterns }
)(StrategyItem);
