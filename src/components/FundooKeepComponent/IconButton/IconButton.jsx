import React, { Component } from "react";
import AddAlertIcon from "@material-ui/icons/AddAlertOutlined";
import CollaboratorIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensIcon from "@material-ui/icons/ColorLensOutlined";
import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
import PhotoIcon from "@material-ui/icons/PhotoOutlined";
import MoreIcon from "@material-ui/icons/MoreVertOutlined";
import "../IconButton/IconButton.css";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import UserService from "../../../services/UserService";
import { BorderStyle } from "@material-ui/icons";
const service = new UserService();

export class IconButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openOptions: false,
      open: false,
      anchorEl: null,
      image: null,
    };
  }
  handleClick = (e) => {
    this.setState({
      open: !this.state.open,
      anchorEl: e.currentTarget,
      openOptions: false,
    });
  };

  onClickmoreOptions = (e) => {
    this.setState({
      openOptions: !this.state.openOptions,
      anchorEl: e.currentTarget,
      open: false,
    });
  };

  onClickChangeColor = (color) => {
    if (this.props.noteString === "create") {
      this.props.color(color);
    } else {
      let data = {
        noteIdList: [this.props.note.id],
        color: color,
      };
      service
        .ChangeColor(data)
        .then((res) => {
          console.log(res);
          this.props.get();
          this.onClickChoosecolor(this.onClickChangeColor);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  onArchive = () => {
    if (this.props.noteString === "create") {
      this.props.archive();
    } else {
      let data = {
        noteIdList: [this.props.note.id],
        isArchived: true,
      };
      service
        .ArchiveNote(data)
        .then((res) => {
          console.log(res);
          this.props.get();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  onDelete = () => {
    if (this.props.noteString === "create") {
      this.props.delete();
    } else {
      let data = {
        noteIdList: [this.props.note.id],
        isDeleted: true,
      };
      service
        .DeleteNote(data)
        .then((res) => {
          console.log(res);
          this.props.get();
          this.onClickmoreOptions(this.onDelete);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  handleCollaborator = () => {
    if (this.props.noteString === "create") {
      console.log("collabopennn");
      this.props.collab();
    } else {
      this.props.handleCollaborator(this.props.note);
    }
  };
  handleImage = (e) => {
    if (this.props.noteString === "create") {
      console.log(e.target.files[0]);
      this.props.setImage(e.target.files[0]);
    } else {
      this.props.setImage(e);
    }
  };

  render() {
    const colorbtn = [
      { title: "Default", name: "#ffffff", bgColor: "#a0a0a0" },
      { title: "Red", name: "#f28b82", bgColor: "#f28b82" },
      { title: "Orange", name: "#fbbc04", bgColor: "#fbbc04" },
      { title: "Yellow", name: "#fff475", bgColor: "#fff475" },
      { title: "Green", name: "#ccff90", bgColor: "#ccff90" },
      { title: "Teal", name: "#a7ffeb", bgColor: "#a7ffeb" },
      { title: "Blue", name: "#cbf0f8", bgColor: "#cbf0f8" },
      { title: "Darkblue", name: "#aecbfa", bgColor: "#aecbfa" },
      { title: "Purple", name: "#d7aefb", bgColor: "#d7aefb" },
      { title: "Pink", name: "#fdcfe8", bgColor: "#fdcfe8" },
      { title: "Brown", name: "#e6c9a8", bgColor: "#e6c9a8" },
      { title: "Grey", name: "#e8eaed", bgColor: "#e8eaed" },
    ];

    return (
      <>
        <Popper
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          placement="top"
          transition
          style={{ zIndex: 10 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={100}>
              <Paper>
                <div className="color-palette">
                  {colorbtn.map((colorbtn, index) => (
                    <button
                      key={index}
                      name={colorbtn.name}
                      title={colorbtn.title}
                      onClick={(event) =>
                        this.onClickChangeColor(colorbtn.name)
                      }
                      style={{
                        margin: 1,
                        backgroundColor: colorbtn.name,
                        width: "28px",
                        height: "28px",
                        borderRadius: "15px",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: colorbtn.bgColor,
                      }}
                    ></button>
                  ))}
                </div>
              </Paper>
            </Fade>
          )}
        </Popper>
        <Popper
          name="more"
          open={this.state.openOptions}
          anchorEl={this.state.anchorEl}
          placement="bottom-start"
          transition
          style={{ zIndex: 10 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={100}>
              <Paper className="optionsPaper">
                <div className="moreOptions">
                  <ul>
                    <li
                      onClick={this.onDelete}
                      title="Delete note"
                      name="delete"
                      className="options delete-opt"
                    >
                      Delete note
                    </li>
                    <li>Add label</li>
                    <li> Add Drawing</li>
                    <li>Make a copy</li>
                    <li>Show checkboxes</li>
                    <li>Copy to Google Docs</li>
                  </ul>
                </div>
              </Paper>
            </Fade>
          )}
        </Popper>
        <div className="ic-btn">
          <AddAlertIcon title="RemindMe" className="btn-icon" />
          <CollaboratorIcon
            title="Collaborator"
            className="btn-icon"
            onClick={this.handleCollaborator}
          />
          <ColorLensIcon
            title="Change Color"
            className="btn-icon"
            onClick={this.handleClick}
            // onClick ={()=>{this.setState({
            //   open:false
            // })}}
          />
          <label htmlFor="file">
            <PhotoIcon title="Add image" className="btn-icon" />
          </label>
          <input
            id="file"
            type="file"
            className="fileinputarea"
            onChange={this.handleImage}
          />

          <ArchiveIcon
            title="Archive"
            className="btn-icon"
            onClick={this.onArchive}
          />
          <MoreIcon
            title="More"
            className="btn-icon"
            onClick={this.onClickmoreOptions}
          />
        </div>
      </>
    );
  }
}

export default IconButton;
