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
  HelpBlock,
  Checkbox
} from "react-bootstrap";
import { deletePattern, editPattern } from "../../actions/patternActions";

class EditToolbar extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShowRemoveModal = this.handleShowRemoveModal.bind(this);
    this.handleCloseRemoveModal = this.handleCloseRemoveModal.bind(this);

    this.handleShowEditModal = this.handleShowEditModal.bind(this);
    this.handleCloseEditModal = this.handleCloseEditModal.bind(this);

    this.state = {
      showRemoveModal: false,
      showRemoveModal: false,
      patternName: this.props.pattern.patternName,
      patternDescription: this.props.pattern.patternDescription,
      assignedConcerns: this.props.pattern.assignedConcerns
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
    // alert(e.target.name);
    // alert(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  /*onDelete(id) {
    this.props.onDelete(id);
  }*/
  onChangeAssignedConcerns = id => {
    //onChangeAssignedConcerns(id) {
    //this.setState({ assignedConcerns[this.state.assignedConcerns.indexOf(id)]: true });
    this.state.assignedConcerns.splice(
      this.state.assignedConcerns.indexOf(id),
      1
    );
  };
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

  editPattern = () => {
    const patternData = {
      name: this.state.name,
      summary: this.state.summary,
      id: this.props.pattern._id
    };
    console.log(
      "function editpattern called in EditToolbar:" +
        patternData.name +
        patternData.summary
    );
    this.props.editPattern(patternData);
    this.handleCloseEditModal();
  };

  deletePattern = id => {
    console.log("function deletepattern called in EditToolbar");
    this.props.deletePattern(id);
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
                Do you want to delete {this.props.pattern.name} ?
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button
                class="btn-lg btn-info"
                onClick={() => this.deletePattern(this.props.pattern._id)}
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
              <Modal.Title>Edit {this.props.pattern.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <FormGroup>
                  <ControlLabel>Pattern Name</ControlLabel>
                  <FormControl
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Pattern Name"
                    onChange={this.onChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Pattern Description</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    type="text"
                    name="summary"
                    value={this.state.summary}
                    placeholder="Pattern Description"
                    onChange={this.onChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Assigned Concerns</ControlLabel>
                  {this.state.assignedConcerns.map(concern => (
                    <Checkbox
                      name="assignedConcerns"
                      inline
                      checked
                      value={concern._id}
                      /* onChange={() =>
                        this.onChangeAssignedConcerns(concern._id)
                      }*/
                      //onChange={this.onChangeAssignedConcerns(concern._id)}
                    >
                      {concern.concernName}{" "}
                    </Checkbox>
                  ))}
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.editPattern(this.props.pattern._id)}>
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

EditToolbar.propTypes = {
  deletePattern: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePattern, editPattern }
)(EditToolbar);
