import alt from '../libs/alt';
import AltContainer from 'alt-container';
import NoteStore from '../stores/NoteStore';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import Notes from './Notes';
import Editable from './Editable';
import React, {Component} from 'react';

import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteTarget = {
  hover(targetProps, monitor) {

    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if( ! targetProps.lane.notes.length) {
      LaneActions.attachToLane({
        laneId: targetProps.lane.id,
        noteId: sourceId
      });
    }
  }
}

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))

export default class Lane extends Component {
  constructor(props) {
    super(props);

    const id = props.lane.id;

    this.editName = this.editName.bind(this, id);
    this.addNote = this.addNote.bind(this, id);
    this.deleteNote = this.deleteNote.bind(this, id);
  }
  editName(id, name) {
    if(name) {
      LaneActions.update({id, name});
    }
    else {
      LaneActions.delete(id)
    }
    console.log('edited lane neme ', id, name);
  }

  addNote(laneId) {
    NoteActions.create({task:'new task'});
    LaneActions.attachToLane({laneId});

  }

  editNote(id, task) {
    NoteActions.update({id, task});
  }

  deleteNote(laneId, noteId) {
    LaneActions.detachFromLane({laneId, noteId})
    NoteActions.delete(noteId);
  }

  render() {
    const {connectDropTarget, lane, ...props} = this.props;

    return connectDropTarget(

      <div {...props}>
        <div className="lane-header">
          <Editable className="lane-name" value={lane.name} onEdit={this.editName}>{lane.name}</Editable>
          <div className='lane-add-note'>
            <button onClick={this.addNote}>+</button>
          </div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            items: ()=>NoteStore.get(lane.notes)
          }}
          >
          <Notes onEdit={this.editNote}  onDelete={this.deleteNote} ></Notes>

        </AltContainer>
      </div>
    );
  }

}
