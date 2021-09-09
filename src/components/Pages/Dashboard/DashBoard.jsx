import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NotesIcon from "@material-ui/icons/EmojiObjectsOutlined";
import ReminderIcon from "@material-ui/icons/NotificationsOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
import TrashIcon from "@material-ui/icons/DeleteOutlined";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import KeepIcon from "./keep.png";
import RefreshIcon from "@material-ui/icons/Refresh";
import SettingsIcon from "@material-ui/icons/Settings";
import ViewIcon from "@material-ui/icons/ViewStreamOutlined";
import AppsIcon from "@material-ui/icons/Apps";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import { Button, Paper, Popper } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import "../Dashboard/DashBoard.css";
import ProtectedRouter from "../../FundooKeepComponent/ProtectedRoute/ProtectedRoute";
import Archive from "../../FundooKeepComponent/Archive/Archive";
import Trash from "../../FundooKeepComponent/Trash/Trash";
import UserService from "../../../services/UserService";
const service = new UserService();

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#fff",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    top: "55px",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    width: "100%",
    height: "50px",
    marginLeft: "50%",
    flexGrow: 0.5,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f5f5f5",
    "&:hover": {
      border: "1px solid #f5f5f5",
      boxShadow: "0px 0px 10px 2px rgba(187,187,187,0.75)",
      // -webkit-box-shadow: '0px 0px 10px 2px rgba(187,187,187,0.75)',
      // -moz-box-shadow: '0px 0px 10px 2px rgba(187,187,187,0.75)',
      backgroundColor: "#fff",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    color: "rgba(0, 0, 0, 0.54)",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    color: "#000",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  keepIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    "&:hover": {
      backgroundColor: "feefc3",
    },
  },
}));

function DashBoard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [pageTitle, setTitle] = React.useState("Keep");
  const [openProfile, setProfile] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfile = (e) => {
    setAnchorEl(e.currentTarget);
    setProfile(!openProfile);
  };

  const handleDrawerOpen = () => {
    setOpen(open ? false : true);
  };

  const handleTrashOpen = () => {
    setOpen(open ? false : true);
    props.dispatch({ type: "Trash" });
    history.push("/fundooKeep/trash");
  };
  const handleArchiveOpen = () => {
    setOpen(open ? false : true);
    props.dispatch({ type: "Archive" });
    history.push("/fundooKeep/archive");
  };
  const handleNotesOpen = () => {
    setOpen(open ? false : true);
    props.dispatch({ type: "Notes" });
    history.push("/fundooKeep/notes");
  };
  const handleLogout = () => {
    service
      .LogOut()
      .then((res) => {
        console.log("logged out successfully");
        localStorage.removeItem("token");
        history.push("/signin");
      })
      .catch((err) => {
        console.log("logout", err);
      });
  };

  React.useEffect(() => {
    console.log("we are getting redux", props.changeTitle);
    let title = props.changeTitle;
    setTitle(title);
    // console.log("we are getting redux1", props.abc);
    // console.log("we are getting redux2", props.searchData);
  }, [props]);

  const onChange = (e) => {
    props.dispatch({ type: "Search", searchData: e.target.value });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <div className="toolbar">
          <Toolbar>
            <IconButton
              color="default"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" Wrap>
              <div className={classes.keepIcon}>
                <img src={KeepIcon} alt="keep-icon" className="keep-img" />
                <p className="keep-wrd">{pageTitle}</p>
              </div>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                className="search-bar"
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={onChange}
              />
            </div>

            <RefreshIcon className="ref-icon" />
            <ViewIcon className="view-icon" />
            <SettingsIcon className="setting-icon" />
            <AppsIcon className="app-icon" />
            <AccountIcon className="app-icon" onClick={handleProfile} />
          </Toolbar>
        </div>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, "custom-drawr", {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        style={{ position: "absolute", top: "55px" }}
      >
        <Divider />
        <List>
          {["Notes", "Reminders", "Edit labels", "Archive", "Trash"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon className={classes.icon}>
                  {index === 0 ? (
                    <NotesIcon
                      className="list-items"
                      aria-label="open drawer"
                      onClick={handleNotesOpen}
                      edge="start"
                    />
                  ) : index === 1 ? (
                    <ReminderIcon
                      className="list-items"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                    />
                  ) : index === 2 ? (
                    <EditIcon
                      className="list-items"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                    />
                  ) : index === 3 ? (
                    <ArchiveIcon
                      className="list-items"
                      aria-label="open drawer"
                      onClick={handleArchiveOpen}
                      edge="start"
                    />
                  ) : (
                    <TrashIcon
                      className="list-items"
                      aria-label="open drawer"
                      onClick={handleTrashOpen}
                      edge="start"
                    />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
      </Drawer>

      <div className="note-component">{props.children}</div>
      <Popper
        name="more"
        open={openProfile}
        anchorEl={anchorEl}
        placement="bottom"
        transition
        style={{ zIndex: 10, right: 0, width: "200px", marginTop: "25px" }}
      >
        {
          <Paper className="logout-popper">
            <div>
              <AccountIcon fontSize="large" className="app-icon" />
              <h3>Shalini Pandey</h3>
              <span>shalu8mar@gmail.com</span>
            </div>
            <Divider />
            <Button
              onClick={handleLogout}
              style={{
                backgroundColor: "#1976d2",
                color: "#fff",
                padding: "5px 10px",
                fontWeight: "600",
                margin: "20px",
              }}
            >
              Logout
            </Button>
          </Paper>
        }
      </Popper>
    </div>
  );
}
function mapStateToProps(state) {
  console.log(state);
  return {
    changeTitle: state.ChangeTitleReducer.changeTitle,
    abc: state.abcReducer.abc,
    searchData: state.searchBarReducer.searchData,
  };
}
export default connect(mapStateToProps)(DashBoard);
