import React, { Component } from "react";
import PropTypes from "prop-types";
import TacticItem from "./TacticItem";

class TacticFeed extends Component {
  render() {
    const { tactics } = this.props;

    return tactics.map(tactic => (
      <TacticItem key={tactic._id} tactic={tactic} />
    ));
  }
}

TacticFeed.propTypes = {
  tactics: PropTypes.array.isRequired
};

export default TacticFeed;
