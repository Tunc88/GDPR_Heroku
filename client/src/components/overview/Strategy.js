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
  Panel,
  Col
} from "react-bootstrap";
import { deleteStrategy, editStrategy } from "../../actions/strategyActions";
//import TacticItem from "../overview/TacticItem";
import StrategyEditForm from "../overview/StrategyEditForm";
import TacticListItem from "../overview/TacticListItem";

class Strategy extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      editing: false,
      showRemoveModal: false,
      showRemoveModal: false,
      name: this.props.strategy.name,
      description: this.props.strategy.description,
      assignedTactics: this.props.strategy.assignedTactics
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeAssignmentArray = this.onChangeAssignmentArray.bind(this);
    this.onChangeArray = this.onChangeArray.bind(this);
    this.onChangeAssignedTactics = this.onChangeAssignedTactics.bind(this);
  }

  onChange(e) {
    //alert(e.target.name);
    //alert(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeAssignmentArray(e) {
    //alert(e.target.name);
    //alert(e.target.value);
    var tacticArray = this.state.assignedTactics;
    tacticArray[e.target.name].name = e.target.value;
    this.setState({
      assignedTactics: tacticArray
    });
  }

  onChangeArray(index, e) {
    e.preventDefault();
    alert(e.target.name);
    alert(e.target.value);
    this.setState({ [e.target.name[index]]: e.target.value });
  }

  editStrategy = () => {
    const strategyData = {
      name: this.state.name,
      description: this.state.description,
      assignedTactics: this.state.assignedTactics,
      id: this.props.strategy._id
    };
    console.log(
      "function editstrategy called in EditToolbar:" +
        strategyData.name +
        strategyData.description
    );
    this.props.editStrategy(strategyData);
  };

  deleteStrategy = id => {
    console.log("function deletestrategy called in EditToolbar");
    this.props.deleteStrategy(id, this.props.history);
    //this.props.history.push("/overview");
  };

  removeTacticFromArray = index => {
    var tacticArray = this.state.assignedTactics;
    //alert(tacticArray.getType());
    //alert(name);
    //alert(tacticArray.indexOf(name));
    tacticArray.splice(index, 1);
    this.setState({
      assignedTactics: tacticArray
    });
  };

  newTacticField = () => {
    var emptyTacticObject = { name: "", description: "" };
    var tacticArray = this.state.assignedTactics;
    tacticArray.push(emptyTacticObject);
    this.setState({
      assignedTactics: tacticArray
    });

    /*  var tacticField = document.createElement("INPUT");
    tacticField.setAttribute("type", "text");
    //var textnode = document.createTextNode("Water");
    node.appendChild(textnode);
    document.getElementById("myList").appendChild(node);*/
  };

  onChangeAssignedTactics = (name, index) => {
    var tacticArray = this.state.assignedTactics;
    //alert(tacticArray[index].name);
    alert(name);
    tacticArray[index].name = name;
    //alert(tacticArray[index].name);
    this.setState({
      assignedTactics: tacticArray
    });
  };

  enableEditing = () => {
    this.setState({
      editing: true
    });
  };

  disableEditing = () => {
    this.setState({
      editing: false
    });
  };

  handleShowRemoveModal() {
    alert("hallo");
    this.setState({ showRemoveModal: true });
  }
  handleCloseRemoveModal() {
    this.setState({ showRemoveModal: false });
  }

  render() {
    //alert("render");
    const strategy = this.props.strategy;
    return (
      <div>
        {this.state.editing ? (
          <StrategyEditForm
            strategy={this.props.strategy}
            disableEditing={() => this.disableEditing()}
          />
        ) : (
          <Col xs={3}>
            <Panel className={"minHeightStrategyPanel"}>
              <Panel.Heading>
                <Panel.Title
                  componentClass={"h3"}
                  className={"minHeightStrategyPanel-Heading"}
                >
                  <Col xs={6}>{strategy.name}</Col>
                  <Col xs={6}>
                    <ButtonToolbar className={""} componentClass={"span"}>
                      <ButtonGroup>
                        <Button onClick={() => this.enableEditing()}>
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
                              Do you want to delete {this.props.strategy.name} ?
                            </Modal.Title>
                          </Modal.Header>

                          <Modal.Footer>
                            <Button
                              class="btn-lg btn-info"
                              onClick={() =>
                                this.deleteStrategy(this.props.strategy._id)
                              }
                            >
                              Confirm
                            </Button>

                            <Button onClick={this.handleCloseRemoveModal}>
                              Cancel
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </ButtonToolbar>
                  </Col>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <h4>Description</h4>
                <div>{strategy.description}</div>
                <div>
                  <h4>Assigned Tactics</h4>
                  <ul>
                    {" "}
                    {strategy.assignedTactics.map(tactic => (
                      <TacticListItem key={tactic._id} tactic={tactic} />
                    ))}
                  </ul>
                </div>
              </Panel.Body>
            </Panel>
          </Col>
        )}
      </div>
    );
  }
}

Strategy.propTypes = {
  deleteStrategy: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteStrategy, editStrategy }
)(Strategy);
