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
    /* setTimeout(() => {
      this.setState({ state: this.state });
    }, 500);*/
  }

  render() {
    function randomColor() {
      var r = Math.round(Math.random() * 255);
      var g = Math.round(Math.random() * 255);
      var b = Math.round(Math.random() * 255);

      return "(" + r + "," + g + "," + b + ",0.2)";
    }

    var tactics = this.props.tactics;
    //console.log(tactics);
    //return <div />;

    console.log(tactics);

    function concatTactics() {
      var tempArray = [];

      if (tactics) {
        tactics.map(strategy =>
          strategy.assignedTactics.map(
            tactic =>
              (tempArray = tempArray.concat([
                { tactic, strategy, color: randomColor() } // color entfernen
              ]))
          )
        );
      }

      return tempArray;
    }

    console.log(concatTactics());

    return (
      <div>
        {concatTactics().map((
          tactic //console.log(tactic.assignedTactics),
        ) => (
          <TacListItem
            key={tactic.tactic._id}
            tactic={tactic.tactic}
            location={this.props.location}
            strategy={tactic.strategy.name}
            color={tactic.color}
          />
        ))}
      </div>
    );
  }
}

TacListGroupField.propTypes = { tactics: PropTypes.array.isRequired };

export default TacListGroupField;
