import React, { Component } from 'react'
import "../DisplayNotes/DisplayNotes.css";
import IconButton from '../IconButton/IconButton';

import UserService from '../../../services/UserService';
const service = new UserService();


export class Archive extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            archiveNotes: [],
        }
    }
    getArchiveNote = () => {
        service
          .GetArchiveNotesList()
          .then((res) => {
            var reqnotes = res.data.data.data;
            var newnotes = reqnotes.reverse();
            this.setState({
              archiveNotes: newnotes,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      };
      componentDidMount() {
        this.getArchiveNote();
      }
    
    
    render() {
        return (
            <div className="note-containerr">
              {this.state.archiveNotes.map((val, index) => (
            <div key={index} className="note" style={{ backgroundColor: val.color }} >
            <h1 className="note-title">
               {val.title}
            </h1>
            <p> {val.description}</p>
            <div className="showicons">
            <IconButton />
            </div>
            </div>
              ))}
           
        </div>
        )}
}

export default Archive
