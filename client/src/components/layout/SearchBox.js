import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  FormGroup,
  FormControl,
  Dropdown,
  CustomMenu,
  CustomToggle,
  MenuItem
} from "react-bootstrap";
import "./NavigationBar.css";
import { searchInBackend } from "../../actions/generalActions";
import Spinner from "../common/Spinner";
import ResultList from "./ResultList";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      typing: false,
      typingTimeout: 0
    };
    this.search = this.search.bind(this);
  }

  search = event => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }

    self.setState({
      searchString: event.target.value,
      typing: false,
      typingTimeout: setTimeout(function() {
        self.props.searchInBackend(self.state.searchString);
      }, 5000)
    });
  };

  render() {
    const { loading, searchResults } = this.props.general;
    let searchContent;
    if (searchResults === null || loading) {
      searchContent = <Spinner />;
    } else {
      searchContent = <ResultList searchResults={searchResults} />;
    }

    return (
      <div>
        <FormGroup>
          <FormControl
            id="search"
            type="text"
            placeholder="Enter thishh"
            onChange={this.search}
          />
          {searchContent}
        </FormGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  general: state.general
});

export default connect(
  mapStateToProps,
  { searchInBackend }
)(withRouter(SearchBox));
