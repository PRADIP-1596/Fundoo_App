import React, { Component } from "react";
import { connect } from "react-redux";
import CreateNote from "../CreateNote/CreateNote";
import DisplayNotes from "../DisplayNotes/DisplayNotes";
import UserService from "../../../services/UserService";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Route, Switch, useHistory } from "react-router";
import ProtectedRouter from "../ProtectedRoute/ProtectedRoute";

const service = new UserService();

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };
  }

  componentDidMount() {
    this.getANote();
  }

  getANote = () => {
    service
      .GetNote()
      .then((res) => {
        let data = res.data.data.data;
        let newnote = data.filter(
          (i) => (i.isArchived || i.isDeleted) === false
        );
        this.setState({
          notes: newnote.reverse(),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let filteredNotes = this.state.notes;
    if (this.props.searchData) {
      filteredNotes = this.state.notes.filter((i) =>
        i.title.toLowerCase().includes(this.props.searchData.toLowerCase())
      );
    }
    return (
      <>
        <CreateNote get={this.getANote} notes={this.state.notes} />
        <ProtectedRouter
          exact
          path="/fundooKeep/notes"
          component={(props) => (
            <DisplayNotes
              {...props}
              notes={filteredNotes}
              get={this.getANote}
            />
          )}
        ></ProtectedRouter>
      </>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return {
    searchData: state.searchBarReducer.searchData,
  };
}
export default connect(mapStateToProps)(Notes);
