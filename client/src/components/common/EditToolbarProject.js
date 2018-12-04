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
import { deleteProject, editProject } from "../../actions/projectActions";

class EditToolbarProject extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShowRemoveModal = this.handleShowRemoveModal.bind(this);
    this.handleCloseRemoveModal = this.handleCloseRemoveModal.bind(this);

    this.handleShowEditModal = this.handleShowEditModal.bind(this);
    this.handleCloseEditModal = this.handleCloseEditModal.bind(this);

    this.state = {
      showRemoveModal: false,
      showRemoveModal: false,
      name: this.props.project.name,
      description: this.props.project.description,
      assignedConcerns: this.props.project.assignedConcerns
    };

    this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }
  /*onSubmit(e) {
    e.preventDefault();

    const projectData = {
      name: this.state.name,
      description: this.state.description
    };

    this.props.editProject(projectData);
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

  editProject = () => {
    const projectData = {
      name: this.state.name,
      description: this.state.description,
      id: this.props.project._id
    };
    console.log(
      "function editproject called in EditToolbar:" +
        projectData.name +
        projectData.description
    );
    this.props.editProject(projectData);
    this.handleCloseEditModal();
  };

  deleteProject = id => {
    console.log("function deleteproject called in EditToolbar");
    this.props.deleteProject(id);
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
                Do you want to delete {this.props.project.name} ?
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button
                class="btn-lg btn-info"
                onClick={() => this.deleteProject(this.props.project._id)}
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
              <Modal.Title>Edit {this.props.project.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <FormGroup>
                  <ControlLabel>Project Name</ControlLabel>
                  <FormControl
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Project Name"
                    onChange={this.onChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Project Description</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    type="text"
                    name="description"
                    value={this.state.description}
                    placeholder="Project Description"
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
              <Button onClick={() => this.editProject(this.props.project._id)}>
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

EditToolbarProject.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteProject, editProject }
)(EditToolbarProject);
