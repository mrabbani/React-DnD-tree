import React, {Component} from 'react';
import Editable from './Editable.jsx';
import Note from './Note.jsx';
import LaneActions from '../actions/LaneActions'

export default class Notes extends Component {

  renderNote(note) {
    return (<Note id={note.id} className="note" onMove={LaneActions.move} key={note.id}>
      <Editable
        value={note.task}
        onEdit={this.props.onEdit.bind(null, note.id)}
        onDelete={this.props.onDelete.bind(null, note.id)}
      />
    </Note>);
  }

  onMoveNote({sourceId, targetId}) {
    console.log('source=', sourceId, 'targetId=', targetId);
  }

  render() {
    var notes = this.props.items;
    return <ul className="notes"> {notes.map(this.renderNote.bind(this))} </ul>;
  }
}
