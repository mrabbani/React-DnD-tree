import React, {Component} from 'react';
import Note from './Note.jsx';

export default class Notes extends Component {

  renderNote(note) {
    return (<li className="note" key={note.id}>
      <Note
        task={note.task}
        onEdit={this.props.onEdit.bind(null, note.id)}
        onDelete={this.props.onDelete.bind(null, note.id)}
      />
    </li>);
  }

  render() {
    var notes = this.props.items;
    return <ul className="notes"> {notes.map(this.renderNote.bind(this))} </ul>;
  }
}
