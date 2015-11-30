import alt from '../libs/alt';
import uuid from 'node-uuid';
import LaneActions from '../actions/LaneActions';
import NoteStore from '../stores/NoteStore';
import update from 'react/lib/update';

class LaneStore {
  constructor() {
    this.bindActions(LaneActions);
    this.lanes = [];
  }

  findLane(id) {
    const lanes = this.lanes;

    const laneId = lanes.findIndex((lane)=>lane.id == id);

    if(laneId<0) {
      console.warn('lane could not be found', lanes,  id);
    }

    return laneId;
  }


  create(lane) {
    const lanes = this.lanes;

    lane.id = uuid.v4();
    lane.notes = lane.notes || [];

    this.setState({
      lanes: lanes.concat(lane)
    });
    console.log(lanes);
  }

  update({id, name}) {
    const lanes = this.lanes;
    const targetId = this.findLane(id);

    if(targetId < 0) {
      return;
    }

    lanes[targetId].name = name;

    this.setState({lanes});
  }

  delete(id) {
    const lanes = this.lanes;
    const targetId = this.findLane(id);

    if(targetId < 0) {
      return;
    }

    this.setState({
      lanes: lanes.slice(0, targetId).concat(lanes.slice(targetId + 1))
    });
  }

  attachToLane({laneId, noteId}) {
    if( ! noteId) {
      this.waitFor(NoteStore);
      noteId = NoteStore.getState().notes.slice(-1)[0].id;
    }
    const lanes = this.lanes;
    const targetId = this.findLane(laneId);

    if(targetId<0) {
      return;
    }

    const lane = lanes[targetId];

    if(lane.notes.indexOf(noteId) === -1) {
      lane.notes.push(noteId);

      this.setState({lanes});
    }
    else {
      console.warn('already attach to lane', lane);
    }
  }


  detachFromLane({laneId, noteId}) {
    const lanes = this.lanes;
    const targetId =  this.findLane(laneId);

    if(targetId<0) {
      return;
    }

    const lane = lanes[targetId];
    const notes = lane.notes;
    const removeNoteIndex =  notes.indexOf(noteId);

    if(removeNoteIndex !== -1) {
      lane.notes = lane.notes.slice(0, removeNoteIndex).
        concat(lane.notes.slice(removeNoteIndex+1));

        this.setState({lanes});
    }
    else {
      console.warn('Failed to remove note from lane', lanes);
    }
  }

  move({sourceId, targetId}) {
    const lanes = this.lanes;

    const targetLane = lanes.filter((lane) => {
      return lane.notes.indexOf(targetId) >= 0;
    })[0];
    
    var sourceLane = lanes.filter((lane) => {
      return lane.notes.indexOf(sourceId) >= 0;
    })[0];

    console.log('source', sourceLane);

    const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
    const targetNoteIndex = targetLane.notes.indexOf(targetId);
    if(sourceLane === targetLane) {
      sourceLane.notes = update(sourceLane.notes, {
        $splice: [
          [sourceNoteIndex, 1],
          [targetNoteIndex, 0, sourceId]
        ]
      });
    }
    else {
      sourceLane.notes.splice(sourceNoteIndex, 1);
      targetLane.notes.splice(targetNoteIndex, 0, sourceId);
    }

    this.setState({lanes});

  }

}

export default alt.createStore(LaneStore, 'LaneStore');
