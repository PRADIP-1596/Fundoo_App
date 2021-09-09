import React, { Component } from "react";
import DashBoard from "../Pages/Dashboard/DashBoard";
import UserService from "../../services/UserService";
import Archive from "./Archive/Archive";
import Trash from "./Trash/Trash";
import Notes from "./Notes/Notes";

import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Route, Switch, useHistory } from "react-router";
import ProtectedRouter from "./ProtectedRoute/ProtectedRoute";

const service = new UserService();

export class NotesContainer extends Component {
  render() {
    return (
      <DashBoard>
        <ProtectedRouter
          path="/fundooKeep/notes"
          component={Notes}
        ></ProtectedRouter>

        <ProtectedRouter
          path="/fundooKeep/archive"
          component={Archive}
        ></ProtectedRouter>
        <ProtectedRouter
          path="/fundooKeep/trash"
          component={Trash}
        ></ProtectedRouter>
      </DashBoard>
    );
  }
}
