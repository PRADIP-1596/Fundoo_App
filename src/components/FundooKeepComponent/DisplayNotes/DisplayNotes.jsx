import React, { Component } from "react";

import IconButton from "../IconButton/IconButton";
import "../DisplayNotes/DisplayNotes.css";
import deleteImg from "./delete.svg";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextareaAutosize,
  Popper,
  Paper,
  List,
} from "@material-ui/core";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import UserService from "../../../services/UserService";
const service = new UserService();

export class DisplayNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openStatus: false,
      id: "",
      title: "",
      description: "",
      color: "",
      usersList: [],
      openPopper: false,
      collaborators: [],
      collaboratorOpen: false,
      note: "",
      image: "",
    };
  }

  handleClickOpen = (val) => {
    this.setState({
      openStatus: !this.state.openStatus,
      title: val.title,
      description: val.description,
      id: val.id,
      color: val.color,
      collaborators: val.collaborators,
      note: val,
    });
  };
  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleClose = () => {
    let data = {
      noteId: this.state.id,
      title: this.state.title,
      description: this.state.description,
    };
    service
      .UpdateNotes(data)
      .then((res) => {
        console.log(res);
        this.props.get();
        this.handleCancel();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCancel = () => {
    this.setState({
      collaboratorOpen: false,
      openStatus: false,
    });
  };
  handleSearchChange = (e) => {
    this.setState({
      openPopper: true,
      anchorEl: e.currentTarget,
    });

    let data = {
      searchWord: e.target.value,
    };
    service
      .SearchUserList(data)
      .then((res) => {
        this.setState({
          usersList: res.data.data.details,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCollaborator = (note) => {
    this.setState({
      id: note.id,
      openPopper: false,
      collaboratorOpen: true,
      collaborators: note.collaborators,
    });
  };
  handleAddUser = (val) => {
    let data = val;
    service
      .AddCollaborator(this.state.id, data)
      .then((res) => {
        console.log(res);
        this.setState({
          openPopper: false,
        });
      })
      .catch((err) => {
        console.log("collab", err);
      });
  };
  handleSave = () => {
    this.setState({
      collaboratorOpen: false,
      openPopper: false,
      anchorEl: null,
    });
    this.props.get();
  };
  deleteCollaborator = (val) => {
    let userid = val.userId;
    let id = this.state.id;
    service
      .RemoveCollaborator(id, userid)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  setImageUpdateNote = (content) => {
    this.setState({ image: content });
  };

  displayCollaborator = (collaborators) => {
    if (collaborators.length > 0) {
      let displayCol = [];
      for (let i = 0; i < collaborators.length; i++) {
        let firstLetter = collaborators[i].firstName.charAt(0).toUpperCase();
        displayCol.push(
          <span
            key={i}
            className="collab-profile"
            title={collaborators[i].email}
            style={{
              backgroundColor: "rgb(77, 20, 20)",
              border: "1.5px solid #a0a0a0",
              borderRadius: "100%",
              color: "#fff",
              padding: "3px 9px",
              fontFamily: " Roboto,Arial,sans-serif",
            }}
          >
            {firstLetter}
          </span>
        );
      }
      return (
        <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap" }}>
          {displayCol}
        </div>
      );
    } else {
      return <div></div>;
    }
  };
  collaboratorsOnDialogBox = (collabs) => {
    if (collabs.length > 0) {
      let display = [];
      for (let i = 0; i < collabs.length; i++) {
        let firstLetter = collabs[i].firstName.charAt(0).toUpperCase();

        display.push(
          <div className="collabs-list" key={i}>
            <div className="first">
              <span
                className="collab-profile"
                style={{
                  border: "3px solid #000",
                  borderRadius: "100%",
                  color: "#000",
                  fontWeight: "bold",
                  padding: "3px 9px",
                  fontFamily: "serif",
                }}
              >
                {firstLetter}
              </span>
              <div>
                <div>
                  <b className="owner-name">
                    {collabs[i].firstName} {collabs[i].lastName}
                  </b>
                </div>
                <p className="owner-tag">{collabs[i].email}</p>
              </div>
              <div className="remove-btn">
                <img
                  src={deleteImg}
                  alt="collab-remove"
                  onClick={() => this.deleteCollaborator(collabs[i])}
                />
              </div>
            </div>
          </div>
        );
      }
      return <div>{display}</div>;
    } else {
      return <div></div>;
    }
  };
  displayImage = (imageUrl) => {
    if (imageUrl === "") {
      <img src={"http://fundoonotes.incubation.bridgelabz.com/" + imageUrl} />;
    } else {
      <div></div>;
    }
  };

  render() {
    const searchList = this.state.usersList.map((val, ind) => {
      return (
        <List key={ind} onClick={() => this.handleAddUser(val)}>
          {val.email}
        </List>
      );
    });

    return (
      <div>
        <div className="note-containerr">
          {this.props.notes.map((val, index) => (
            <div
              key={index}
              className="note"
              style={{ backgroundColor: val.color }}
            >
              <div
                onClick={() => {
                  this.handleClickOpen(val);
                }}
              >
                {this.displayImage(val.imageUrl)}

                <h1 className="note-title">{val.title}</h1>
                <p> {val.description}</p>
                {this.displayCollaborator(val.collaborators)}
              </div>
              <div className="showicons">
                <IconButton
                  handleCollaborator={this.handleCollaborator}
                  collabOpen={this.state.collaboratorOpen}
                  notestring="update"
                  get={this.props.get}
                  note={val}
                  setImage={this.setImageUpdateNote}
                />
              </div>
            </div>
          ))}
        </div>
        {/* -------------- update dialogbox----------------------- */}
        <Dialog
          className="dialog-box"
          open={this.state.openStatus}
          fullWidth
          aria-labelledby="responsive-dialog-title"
          id="responsive-dialog-title"
          style={{ backgroundColor: "none", zIndex: 2 }}
        >
          <div
            style={{
              backgroundColor: this.state.color,
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <TextareaAutosize
              style={{
                resize: "none",
                backgroundColor: this.state.color,
                border: "none",
                fontSize: "20px",
                fontFamily: " Roboto,Arial,sans-serif",
              }}
              name="title"
              className="dianote-title"
              defaultValue={this.state.title}
              onChange={this.handleTitleChange}
            />
            <br></br>
            <TextareaAutosize
              style={{
                resize: "none",
                backgroundColor: this.state.color,
                border: "none",
                fontSize: "20px",
                fontFamily: " Roboto,Arial,sans-serif",
              }}
              name="description"
              className="dianote-desc"
              defaultValue={this.state.description}
              onChange={this.handleDescriptionChange}
            />
            {this.displayCollaborator(this.state.collaborators)}

            <div className="icon-close">
              <div className="icon-btn">
                <IconButton
                  notestring="update"
                  handleCollaborator={this.handleCollaborator}
                  collabOpen={this.state.collaboratorOpen}
                  get={this.props.get}
                  note={this.state.note}
                  setImage={this.setImageUpdateNote}
                />
              </div>
              <Button onClick={this.handleClose}>Close</Button>
            </div>
          </div>
        </Dialog>
        {/*,<----------------------------------- collaborator ------------------------------------------> */}
        <Dialog
          className="collab-dialog-box"
          open={this.state.collaboratorOpen}
          fullWidth
          aria-labelledby="responsive-collab-dialog-title"
          style={{ backgroundColor: "none", zIndex: 2 }}
        >
          <DialogTitle>Collaborators</DialogTitle>
          <Divider light />
          <DialogContent>
            <div>
              <div className="first">
                <AccountIcon fontSize="large" className="owner-icon" />
                <div>
                  <div classname="oname">
                    <h3 className="owner-name">Shalini Pandey</h3>
                    <span>(Owner)</span>
                  </div>
                  <p className="owner-tag">shalu8mar@gmail.com</p>
                </div>
              </div>
              <div className="first">
                {this.collaboratorsOnDialogBox(this.state.collaborators)}
              </div>
            </div>

            <div className="second">
              <div className="collab-add-icon">
                <PersonAddIcon />
              </div>
              <input
                type="email"
                className="collab-input"
                placeholder="Person or email to share with"
                onChange={this.handleSearchChange}
              />
            </div>
            <Popper
              open={this.state.openPopper}
              anchorEl={this.state.anchorEl}
              placement="bottom-start"
              transition
              style={{ zIndex: 20, marginTop: "450px", width: "250px" }}
            >
              <Paper
                className="collab-popper"
                style={{ padding: "10px", boxShadow: "1px 1px 5px #888" }}
              >
                {searchList}
              </Paper>
            </Popper>
          </DialogContent>
          <Divider light />
          <DialogActions
            className="cancelsave-btns"
            style={{ backgroundColor: "#ebebeb", height: "50px" }}
          >
            <div>
              <button className="action-btn" onClick={this.handleCancel}>
                Cancel
              </button>
              <button className="action-btn" onClick={this.handleSave}>
                Save
              </button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DisplayNotes;
