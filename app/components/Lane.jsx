import alt from '../libs/alt';
import AltContainer from 'alt-container';
import NoteStore from '../stores/NoteStore';
import NoteActions from '../actions/NoteActions'
import Notes from './Notes'
import React, {Component} from 'react';

export default class Lane extends Component {
  render() {
    const {lane, ...props} = this.props;
    return (

      <div {...props}>
        <div className="lane-header">
          <div className="lane-name">{lane.name}</div>
          <div className='lane-add-note'>
            <button onClick={this.addNote}>+</button>
          </div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            items: ()=>NoteStore.getState().notes
          }}
          >
          <Notes onEdit={this.editNote}  onDelete={this.deleteNote} ></Notes>

        </AltContainer>
      </div>
    );
  }
  addNote() {
    NoteActions.create({task:'new task'});

  }
  editNote(id, task) {
    NoteActions.update({id, task});
  }
  deleteNote(id) {
    NoteActions.delete(id);
  }
}
