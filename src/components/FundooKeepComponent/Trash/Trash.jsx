import React, { Component } from 'react'
import "../DisplayNotes/DisplayNotes.css"
import UserService from '../../../services/UserService';
import IconButton from '../IconButton/IconButton';
const service = new UserService();


export class Trash extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            deletedNotes: [], 
        }
    }
    getTrashNotes = () => {
        service
          .GetTrashNotesList()
          .then((res) => {
            var reqnotes = res.data.data.data;
            var noteArr = reqnotes;
            this.setState({
              deletedNotes: noteArr,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      };
      componentDidMount() {
        this.getTrashNotes();
      }
    
    render() {
        return (
            <div className="note-containerr">
              {this.state.deletedNotes.map((val, index) => (
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
        )
    }
}

export default Trash
