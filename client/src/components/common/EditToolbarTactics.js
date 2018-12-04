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
import { deleteTactic, editTactic } from "../../actions/tacticActions";

class EditToolbarTactics extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShowRemoveModal = this.handleShowRemoveModal.bind(this);
    this.handleCloseRemoveModal = this.handleCloseRemoveModal.bind(this);

    this.handleShowEditModal = this.handleShowEditModal.bind(this);
    this.handleCloseEditModal = this.handleCloseEditModal.bind(this);

    this.state = {
      showRemoveModal: false,
      showRemoveModal: false,
      name: this.props.tactic.dame,
      description: this.props.tactic.description
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

  editTactic = () => {
    const tacticData = {
      name: this.state.name,
      description: this.state.description,
      id: this.props.tactic._id
    };
    console.log(
      "function edittactic called in EditToolbar:" +
        tacticData.name +
        tacticData.description
    );
    this.props.editTactic(tacticData);
    this.handleCloseEditModal();
  };

  deleteTactic = id => {
    console.log("function deletetactic called in EditToolbar");
    this.props.deleteTactic(id);
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
                Do you want to delete {this.props.tactic.name} ?
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button
                class="btn-lg btn-info"
                onClick={() => this.deleteTactic(this.props.tactic._id)}
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
              <Modal.Title>Edit {this.props.tactic.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <FormGroup>
                  <ControlLabel>Tactic Name</ControlLabel>
                  <FormControl
                    type="text"
                    name="tacticName"
                    value={this.state.name}
                    placeholder="Tactic Name"
                    onChange={this.onChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Tactic Description</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    type="text"
                    name="tacticDescription"
                    value={this.state.description}
                    placeholder="Tactic Description"
                    onChange={this.onChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.editTactic(this.props.tactic._id)}>
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

EditToolbarTactics.propTypes = {
  deleteTactic: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteTactic, editTactic }
)(EditToolbarTactics);
