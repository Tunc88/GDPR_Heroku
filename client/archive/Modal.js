import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { deletePattern } from "../../actions/patternActions";

class ModalComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  deletePattern(id) {
    console.log("function deletepattern called in EditToolbar");
    this.props.deletePattern(id);
  }
  render() {
    const ModalHeader = this.props.ModalHeader;
    const ModalBody = this.props.ModalBody;
    const ModalFooter = this.props.ModalFooter;
    return (
      <div className="static-modal">
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{ModalHeader}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {ModalBody}
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
          </Modal.Body>
          <Modal.Footer>
            {ModalFooter}
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ModalComponent.propTypes = {
  deletePattern: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePattern }
)(ModalComponent);
