import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField } from "@material-ui/core";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushIcon from "@material-ui/icons/Brush";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import "../CreateNote/CreateNote.css";
import IconButton from "../IconButton/IconButton";
import "../DisplayNotes/DisplayNotes.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Popper,
  Paper,
  List,
} from "@material-ui/core";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import UserService from "../../../services/UserService";
const service = new UserService();
let collab;

export default class CreateNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      showContent: false,
      color: "#ffffff",
      isArchived: false,
      isDeleted: false,
      openPopper: false,
      collabOpen: false,
      usersList: [],
      image: "",
    };
  }
  

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.title);
  };

  handleOnClick = () => {
    if (!this.state.showContent) {
      this.setState({ showContent: true });
    }
  };

  handleOnClose = () => {
    const data = new FormData();
   data.append("title", this.state.title);
    data.append("description", this.state.description);

    if (this.state.color !== "") {
      data.append("color", this.state.color);
    }
    if (this.state.isArchived !== "") {
      data.append("isArchived", this.state.isArchived);
    }
    if (this.state.isDeleted !== "") {
      data.append("isDeleted", this.state.isDeleted);
    }
 
    if (collab !== "") {
      data.append("collaberators", JSON.stringify([collab]));
    }

    service
      .AddNote(data)
      .then((res) => {
        console.log(res);
        this.props.get();
        this.setState({
          color: "#ffffff",
          showContent: false,
          title: "",
          description: "",
          isArchived: false,
          isDeleted: false,
        
          collabOpen: false,
          collaborator: "",
          collaborators: [],
          usersList: [],
        });
        collab = null;
      })
      .catch((err) => {
        console.log(err);
      });
  };


  create = (color) => {
    this.setState({
      color: color,
    });
  };
  handleArchive = () => {
    this.setState({
      isArchived: true,
    });
  };
  handleDelete = () => {
    this.setState({
      isDeleted: true,
    });
  };

  onSave = () => {
    this.setState({
      openPopper:false,
      collabOpen: false,
    });
    this.handleOnClose();
  };

  onCancel = () => {
    this.setState({
      openPopper:false,
      collabOpen: false,
    });
  };





  render() {
    return (
      <div className="card-container">
        <div 
          onClick={this.handleOnClick}
          style={{
            display: this.state.showContent ? "none" : "flex",
            // width: "100%",
            justifyContent: "center",
          }}
        >
          <Card className="input-card card-shadow" variant="outlined">
            <CardContent>
              <Grid className="takenote">
                <input
                  className="title"
                  type="text"
                  placeholder="Take a Note"
                ></input>
                <span className="takenote-icons">
                  <CheckBoxOutlinedIcon className="cbi-icon" />
                  <BrushIcon className="cbi-icon" />
                  <ImageOutlinedIcon className="cbi-icon" />
                </span>
              </Grid>
            </CardContent>
          </Card>
        </div>
        <div
          style={{
            display: this.state.showContent ? "flex" : "none",
            // width: "100%",
            justifyContent: "center",
            backgroundColor: this.props.notes.color,
          }}
          onClick={this.handleOnClick}
        >
          <Card
            className="input-card card-shadow"
            variant="outlined"
            style={{ backgroundColor: this.state.color }}
          >
            <CardContent>
              <TextareaAutosize
                style={{
                  resize: "none",
                  width: "100%",
                  backgroundColor: this.state.color,
                  fontFamily: " Roboto,Arial,sans-serif",
                }}
                className="title"
                name="title"
                value={this.state.title}
                onChange={(e) => this.changeHandler(e)}
                placeholder="Title"
              />
              <TextareaAutosize
                style={{
                  resize: "none",
                  backgroundColor: this.state.color,
                  fontFamily: " Roboto,Arial,sans-serif",
                }}
                className="title2"
                name="description"
                value={this.state.description}
                onChange={(e) => this.changeHandler(e)}
                placeholder="Take a Note"
              />
            </CardContent>
            <div className="icon-close">
              <div className="iconbtn">
                <IconButton
                  noteString="create"
                  color={this.create}
              
                  note={this.props.notes}
                  addnote={this.state.addEvent}
                  archive={this.handleArchive}
                  delete={this.handleDelete}
                
        
                />
              </div>
              <Button
                className="action-btn"
                onClick={this.handleOnClose}
                size="small"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
