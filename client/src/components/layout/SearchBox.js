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
import {
  AsyncTypeahead,
  GithubMenuItem,
  makeAndHandleRequest,
  PER_PAGE
} from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      typing: false,
      typingTimeout: 0,

      isLoading: false,
      options: [],
      query: "",
      selected: []
    };
    this.search = this.search.bind(this);
  }

  _cache = {};

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
      }, 1000)
    });
  };

  _handleInputChange = query => {
    this.setState({ query });
  };

  _handlePagination = (e, shownResults) => {
    const { query } = this.state;
    const cachedQuery = this._cache[query];

    // Don't make another request if:
    // - the cached results exceed the shown results
    // - we've already fetched all possible results
    if (
      cachedQuery.options.length > shownResults ||
      cachedQuery.options.length === cachedQuery.total_count
    ) {
      return;
    }

    this.setState({ isLoading: true });

    const page = cachedQuery.page + 1;

    makeAndHandleRequest(query, page).then(resp => {
      const options = cachedQuery.options.concat(resp.options);
      this._cache[query] = { ...cachedQuery, options, page };
      this.setState({
        isLoading: false,
        options
      });
    });
  };

  _handleSearch = query => {
    if (this._cache[query]) {
      this.setState({ options: this._cache[query].options });
      return;
    }

    this.setState({ isLoading: true });
    makeAndHandleRequest(query).then(resp => {
      this._cache[query] = { ...resp, page: 1 };
      this.setState({
        isLoading: false,
        options: resp.options
      });
    });
  };

  __handleSearch = query => {
    console.log("query");
    console.log(query);
    this.setState({ isLoading: true });
    this.props.searchInBackend(query);
    this.setState({
      options: this.props.general.searchResults,
      isLoading: false
    });

    //this.search();
    // makeAndHandleRequest(query).then(({ options }) => {

    // });
  };
  componentWillReceiveProps() {
    /* this.setState({
      isLoading: false,
      options: this.props.general.searchResults
    });*/
  }

  handleSelectedSearchItem = searchItem => {
    // this.setState({ selected: searchItem }, alert(searchItem));
    console.log(searchItem);
    console.log(this.props.history);
    this.props.history.push("/patterndetail/" + searchItem[0]._id);
  };

  render() {
    const { loading, searchResults } = this.props.general;
    let searchContent;
    let isLoading;
    let searchBoxContent;
    if (
      searchResults === null ||
      loading ||
      Object.keys(searchResults).length === 0
    ) {
      //  searchContent = <Spinner />;
      searchContent = [];
      isLoading = true;
      searchBoxContent = (
        <AsyncTypeahead
          // {...this.state}
          minLength={1}
          selected={this.state.selected}
          isLoading={isLoading}
          options={searchContent}
          labelKey="name"
          onChange={selected => this.setState({ selected })}
          // onChange={this.search}
          onSearch={this.__handleSearch}
          placeholder="Search for a Github user..."
        />
      );
    } else {
      searchContent = searchResults.Patterns;
      //searchContent = [{ id: 1, name: "John" }, { id: 2, name: "Miles" }];
      isLoading = false;
      // alert("gefunden");
      // alert(option);
      searchBoxContent = (
        <AsyncTypeahead
          // {...this.state}
          minLength={1}
          selected={this.state.selected}
          isLoading={isLoading}
          options={searchContent}
          labelKey="name"
          onChange={selected => this.handleSelectedSearchItem(selected)}
          // onChange={this.search}
          onSearch={this.__handleSearch}
          placeholder="Search for a Github user..."
          //  results={searchContent}
          /* renderMenuItemChildren={(option, props) => (
            // <GithubMenuItem key={option.id} user={option} />
            <MenuItem>{option.name}</MenuItem>
          )}*/
        />
      );
      //  searchContent = <ResultList searchResults={searchResults} />;
      // searchContent = searchResults;
    }

    return (
      <div>
        {/* <AsyncTypeahead
          // {...this.state}
          selected={this.state.selected}
          isLoading={isLoading}
          options={searchContent}
          labelKey="login"
          onChange={selected => this.setState({ selected })}
          // onChange={this.search}
          onSearch={this.__handleSearch}
          placeholder="Search for a Github user..."
          renderMenuItemChildren={(option, props) => (
            <GithubMenuItem key={option.id} user={option} />
          )}
          />*/}
        {searchBoxContent}

        {/*<FormGroup>
          <FormControl
            id="search"
            type="text"
            placeholder="Enter thishh"
            onChange={this.search}
          />
          {searchContent}
        </FormGroup>*/}
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
