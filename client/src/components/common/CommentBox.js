import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { editProject } from "../../actions/projectActions";
import {
  Panel,
  Button,
  FormGroup,
  InputGroup,
  FormControl
} from "react-bootstrap";

import TextAreaField from "../common/TextAreaField";
import "./CommentBox.css";

class CommentBox extends Component {
  constructor() {
    super();
    this.state = {
      comment: {
        author: {},
        content: ""
      },
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickComment = this.onClickComment.bind(this);
  }

  componentDidMount() {}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.onClickComment(e);
  }

  onClickComment(e) {
    this.setState(prevState => ({
      comment: {
        ...prevState.comment,
        author: this.props.auth.user,
        content: this.state.content
      }
    }));
  }

  onSubmit(e) {
    e.preventDefault();

    const commentData = {
      id: this.props.match.params.id,
      comment: this.state.comment
    };

    console.log(commentData);
    this.onClickComment(e);
    //console.log(editedProject);
    //this.props.editProject(commentData);
  }

  render() {
    //console.log(this.props.match.params.id);
    //console.log(this.state.comment);

    return (
      <div>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Comment Box</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Panel>
              <Panel.Body>Comment</Panel.Body>
            </Panel>

            <TextAreaField
              name="content"
              value={this.state.content}
              placeholder="Enter your comment"
              onChange={this.onChange}
              location={this.props.location}
              onSubmit={this.onSubmit}
            />
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

CommentBox.propTypes = {
  editProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  comment: state.comment
});

export default connect(
  mapStateToProps,
  {
    editProject
  }
)(withRouter(CommentBox));
