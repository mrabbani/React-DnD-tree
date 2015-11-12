import React, {Component} from 'react';
import Note from './Note.jsx';

export default class Notes extends Component {

  renderNote(note) {
    return <li key={note.id}>
      <Note task={note.task} />
    </li>
  }
  
  render() {
    var notes = this.props.items;
    return <ul className="notes"> {notes.map(this.renderNote)} </ul>;
  }
}
