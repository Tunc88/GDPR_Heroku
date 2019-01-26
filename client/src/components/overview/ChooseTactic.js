import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Panel, Col, Tabs, Tab, Button, Collapse } from "react-bootstrap";
import EditToolbarStrategy from "../common/editToolbarStrategy";
import { setChosenTactics } from "../../actions/patternActions";

class ChooseTactic extends Component {
  constructor(props, context) {
    super(props, context);
  }
  setChosenTactics = tactic => {
    //alert(tactic);
    this.props.setChosenTactics(tactic);
  };

  render() {
    const assignedTactics = this.props.pattern.chosenTactics;
    const tactic = this.props.tactic;
    console.log("assignedTactics");
    console.log(assignedTactics);
    let tacticContent;
    if (assignedTactics.includes(tactic._id)) {
      tacticContent = (
        <span>
          <div
            className="activeFilter filter"
            onClick={() => this.setChosenTactics(tactic._id)}
          >
            {tactic.name}
          </div>
        </span>
      );
    } else {
      tacticContent = (
        <span>
          <div
            className="filter"
            onClick={() => this.setChosenTactics(tactic._id)}
          >
            {tactic.name}
          </div>
        </span>
      );
    }
    return <span>{tacticContent}</span>;
  }
}

ChooseTactic.propTypes = {
  strategy: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  strategy: state.strategy,
  pattern: state.pattern
});

export default connect(
  mapStateToProps,
  { setChosenTactics }
)(ChooseTactic);
