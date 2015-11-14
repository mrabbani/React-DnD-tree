import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);
    this.notes =[];
  }

  create(note) {
    note.id = uuid.v4();
    var notes = this.notes.concat(note);
    this.setState({notes});
  }

  update({id, task})  {
    console.log(id);
    let notes = this.notes;
    const noteIndex = this.findNote(id);

    if(noteIndex<0) {
      return;
    }

    notes[noteIndex].task = task;
    this.setState({notes});
  }

  delete(id) {
    const noteIndex = this.findNote(id);

    if(noteIndex<0) {
      return;
    }

    let notes = this.notes.slice(0, noteIndex).concat(this.notes.slice(noteIndex+1));
    this.setState({notes});
  }

  findNote(id) {
     const notes = this.notes;
     const noteIndex = notes.findIndex((note)=>note.id === id);

     if(noteIndex<0) {
       console.warn('failed to find note ', notes, id);
     }

     return noteIndex;
   }
}

export default alt.createStore(NoteStore, 'NoteStore');
