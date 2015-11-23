import alt from '../libs/alt';
import uuid from 'node-uuid';
import LaneActions from '../actions/LaneActions';
class LaneStore {
  constructor() {
    this.bindActions(LaneActions);
    this.lanes = [];
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

  findLane(id) {
    const lanes = this.lanes;

    const laneId = lanes.findIndex((lane)=>lane.id == id);

    if(laneId<0) {
      console.warn('lane could not be found', lanes,  id);
    }

    return laneId;
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

    if(removeNoteIndex !=== -1) {
      lane.notes = lane.notes.slice(0, removeNoteIndex).
        concat(lane.notes.slice(removeNoteIndex+1));

        this.setState({lanes});
    }
    else {
      console.warn('Failed to remove note from lane', lanes);
    }



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
}

export default alt.createStore(LaneStore, 'LaneStore');
