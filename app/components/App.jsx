import AltContainer from 'alt-container';
import React from 'react';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // We have to bind the context of `storeChanged`
    // explicitly so that `this` will point at the `App`
    // instance. You'll be seeing this pattern a lot.
    this.storeChanged = this.storeChanged.bind(this);
    this.state = LaneStore.getState();
  }
  componentDidMount() {
    LaneStore.listen(this.storeChanged);
  }
  componentWillUnmount() {
    LaneStore.unlisten(this.storeChanged);
  }
  storeChanged(state) {
    // Without proper `bind`, `this` wouldn't
    // point at the right context (defaults to `window`
    // in browser environment)
    this.setState(state);
  }
  render() {
    const notes = this.state.notes;

    return (
      <div>
        <button className="add-note" onClick={this.addLane}>+</button>
        <AltContainer stores={[LaneStore]}
          inject={{
            items: () => LaneStore.getState().lanes
          }}>
          <Lanes />
        </AltContainer>
      </div>
    );
  }
  addLane() {
    LaneActions.create({name: 'New Lane'});
  }
  editNote(id, task) {
    LaneActions.update({id, task});
  }
  deleteNote(id) {
    LaneActions.delete(id);
  }
}
