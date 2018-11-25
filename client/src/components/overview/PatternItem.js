import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Panel, Col, Tabs, Tab, Button, Collapse } from "react-bootstrap";

class PatternItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }
  extendMore = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { pattern, auth } = this.props;
    const open = this.state.open;
    let more;
    let patternDescriptionFirstPart = pattern.patternDescription
      .split(" ", 10)
      .join(" ");
    let patternDescriptionSecondPart = pattern.patternDescription.substring(
      patternDescriptionFirstPart.length
    );
    if (open) {
      more = <p>Less...</p>;
    } else {
      more = <p>More...</p>;
    }

    return (
      <Col xs={4}>
        <Panel>
          <Panel.Heading>
            <h5>{pattern.patternName}</h5>
          </Panel.Heading>
          <Panel.Body>
            {patternDescriptionFirstPart}
            <Collapse in={this.state.open}>
              <p>{patternDescriptionSecondPart}</p>
            </Collapse>
            <p class="extendMore" onClick={this.extendMore}>
              {more}
            </p>
          </Panel.Body>
        </Panel>
      </Col>
    );
  }
}

PatternItem.propTypes = {
  pattern: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PatternItem);
