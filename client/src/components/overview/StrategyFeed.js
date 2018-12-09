import React, { Component } from "react";
import PropTypes from "prop-types";
import StrategyItem from "./StrategyItem";

class StrategyFeed extends Component {
  render() {
    const { strategies } = this.props;

    return strategies.map(strategy => (
      <StrategyItem key={strategy._id} strategy={strategy} />
    ));
  }
}

StrategyFeed.propTypes = {
  strategies: PropTypes.array.isRequired
};

export default StrategyFeed;
