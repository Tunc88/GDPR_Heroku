import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import TacListItem from "./TacListItem";
import store from "../../store";

class TacListGroupField extends Component {
  constructor() {
    super();
    this.state = {
      tactics: [],

      errors: {}
    };
  }

  componentWillUpdate() {
    setTimeout(() => {
      this.setState({ state: this.state });
    }, 500);
  }

  render() {
    var tactics = this.props.tactics;
    //console.log(tactics);
    //return <div />;

    //console.log(tactics);

    function concatTactics() {
      var tempArray = [];

      if (tactics) {
        tactics.map(strategy =>
          strategy.assignedTactics.map(
            tactic => (tempArray = tempArray.concat([tactic]))
          )
        );
      }

      return tempArray;
    }

    // console.log(concatTactics());

    return concatTactics().map(tactic => (
      //console.log(tactic.assignedTactics),

      <TacListItem
        key={tactic._id}
        tactic={tactic}
        location={this.props.location}
      />
    ));
  }
}

TacListGroupField.propTypes = { tactics: PropTypes.array.isRequired };

export default TacListGroupField;
