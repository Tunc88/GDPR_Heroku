import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./NavigationBar.css";
class ResultList extends Component {
  render() {
    const searchResults = this.props.searchResults;

    return (
      <ul>
        {/*searchResults.map(result => {
          <li>{result}</li>;
        })*/}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  general: state.general
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(ResultList));
