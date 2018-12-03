import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  Glyphicon,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";
import { deleteConcern, editConcern } from "../../actions/concernActions";

class EditToolbarConcerns extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShowRemoveModal = this.handleShowRemoveModal.bind(this);
    this.handleCloseRemoveModal = this.handleCloseRemoveModal.bind(this);

    this.handleShowEditModal = this.handleShowEditModal.bind(this);
    this.handleCloseEditModal = this.handleCloseEditModal.bind(this);

    this.state = {
      showRemoveModal: false,
      showRemoveModal: false,
      concernName: this.props.concern.concernName,
      concernDescription: this.props.concern.concernDescription
    };

    this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }
  /*onSubmit(e) {
    e.preventDefault();

    const patternData = {
      patternName: this.state.patternName,
      patternDescription: this.state.patternDescription
    };

    this.props.editPattern(patternData);
  }*/

  onChange(e) {
    //alert(e.target.name);
    //alert(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  /*onDelete(id) {
    this.props.onDelete(id);
  }*/
  handleCloseRemoveModal() {
    this.setState({ showRemoveModal: false });
  }

  handleShowRemoveModal() {
    this.setState({ showRemoveModal: true });
  }
  handleCloseEditModal() {
    this.setState({ showEditModal: false });
  }

  handleShowEditModal() {
    this.setState({ showEditModal: true });
  }

  editConcern = () => {
    const concernData = {
      concernName: this.state.concernName,
      concernDescription: this.state.concernDescription,
      id: this.props.concern._id
    };
    console.log(
      "function editconcern called in EditToolbar:" +
        concernData.concernName +
        concernData.concernDescription
    );
    this.props.editConcern(concernData);
    this.handleCloseEditModal();
  };

  deleteConcern = id => {
    console.log("function deleteconcern called in EditToolbar");
    this.props.deleteConcern(id);
  };

  render() {
    return (
      <ButtonToolbar>
        <ButtonGroup>
          <Button onClick={this.handleShowEditModal}>
            <Glyphicon glyph="pencil" />
          </Button>
          <Button onClick={this.handleShowRemoveModal}>
            <Glyphicon glyph="remove" />
          </Button>
        </ButtonGroup>
        <div className="static-modal">
          <Modal
            show={this.state.showRemoveModal}
            onHide={this.handleCloseRemoveModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Do you want to delete {this.props.concern.concernName} ?
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button
                class="btn-lg btn-info"
                onClick={() => this.deleteConcern(this.props.concern._id)}
              >
                Confirm
              </Button>

              <Button onClick={this.handleCloseRemoveModal}>Cancel</Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={this.state.showEditModal}
            onHide={this.handleCloseEditModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit {this.props.concern.concernName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <FormGroup>
                  <ControlLabel>Concern Name</ControlLabel>
                  <FormControl
                    type="text"
                    name="concernName"
                    value={this.state.concernName}
                    placeholder="Concern Name"
                    onChange={this.onChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Concern Description</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    type="text"
                    name="concernDescription"
                    value={this.state.concernDescription}
                    placeholder="Concern Description"
                    onChange={this.onChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.editConcern(this.props.concern._id)}>
                Confirm
              </Button>

              <Button onClick={this.handleCloseEditModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </ButtonToolbar>
    );
  }
}

EditToolbarConcerns.propTypes = {
  deleteConcern: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteConcern, editConcern }
)(EditToolbarConcerns);
