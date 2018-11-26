import React, { Component } from "react";
import PropTypes from "prop-types";
import ConcernItem from "./ConcernItem";

class ConcernFeed extends Component {
  render() {
    const { concerns } = this.props;

    return concerns.map(concern => (
      <ConcernItem key={concern._id} concern={concern} />
    ));
  }
}

ConcernFeed.propTypes = {
  concerns: PropTypes.array.isRequired
};

export default ConcernFeed;
