import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Panel, Col, Tabs, Tab, Button, Collapse } from "react-bootstrap";
import EditToolbarConcerns from "../common/EditToolbarConcerns";

class ConcernItem extends Component {
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
    const { concern, auth } = this.props;
    const open = this.state.open;
    let more;
    let concernDescriptionFirstPart = concern.concernDescription
      .split(" ", 10)
      .join(" ");
    let concernDescriptionSecondPart = concern.concernDescription.substring(
      concernDescriptionFirstPart.length
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
            <h5>{concern.concernName}</h5>
            <EditToolbarConcerns concern={concern} />
          </Panel.Heading>
          <Panel.Body>
            {concernDescriptionFirstPart}
            <Collapse in={this.state.open}>
              <div>{concernDescriptionSecondPart}</div>
            </Collapse>
            <div className="extendMore" onClick={this.extendMore}>
              {more}
            </div>
          </Panel.Body>
        </Panel>
      </Col>
    );
  }
}

ConcernItem.propTypes = {
  concern: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(ConcernItem);
