import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import TacListItem from "./TacListItem";

class TacListGroupField extends Component {
  render() {
    const tactics = this.props.tactics;
    //console.log(tactics);
    //return <div />;

    //console.log(tactics);

    function concatTactics() {
      var tempArray = [];

      tactics.map(strategy =>
        strategy.assignedTactics.map(
          tactic => (tempArray = tempArray.concat([tactic]))
        )
      );

      return tempArray;
    }

    // console.log(concatTactics());

    return concatTactics().map(tactic => (
      //console.log(tactic.assignedTactics),
      <TacListItem key={tactic._id} tactic={tactic} />
    ));
  }
}

TacListGroupField.propTypes = { tactics: PropTypes.array.isRequired };

export default TacListGroupField;
