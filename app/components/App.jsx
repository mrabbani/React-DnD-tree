import uuid from 'node-uuid';
import React, {Component} from 'react';
import Notes from './Notes.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: "Learn Webpack"
        },
        {
          id: uuid.v4(),
          task: "Lear React"
        },
        {
          id: uuid.v4(),
          task: "Building DnD tree"
        }
      ]
    };
    this.addNote = this.addNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.findNote = this.findNote.bind(this);
  }
  addNote(e) {
    e.prevetDefault;
    let notes = this.state.notes.concat([{
      id: uuid.v4(),
      task: 'New Task'
    }])
    this.setState({notes });
    console.log('add note');
  }

  findNote(id) {

    var notes = this.state.notes;
    const noteIndex = notes.findIndex((note) => note.id == id);

    if(noteIndex<0) {
      console.warn('Failed to find note', notes, id);
    }

    return noteIndex;
  }

  editNote(noteId, task) {
    var notes = this.state.notes;

    const noteIndex = this.findNote(noteId);
    if(noteIndex<0) {
      return;
    }

    notes[noteIndex].task = task;

    this.setState({notes});


    console.log('note edited', noteId, task);
  }

  render() {

    return (
      <div>
        <button className='add-note' onClick ={this.addNote}>+</button>
        <Notes items={this.state.notes} onEdit={this.editNote} />
      </div>
    );
  }
}
