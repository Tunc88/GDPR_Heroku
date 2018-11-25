import React, { Component } from "react";
import PropTypes from "prop-types";
import PatternItem from "./PatternItem";

class PatternFeed extends Component {
  render() {
    const { patterns } = this.props;

    return patterns.map(pattern => (
      <PatternItem key={pattern._id} pattern={pattern} />
    ));
  }
}

PatternFeed.propTypes = {
  patterns: PropTypes.array.isRequired
};

export default PatternFeed;
