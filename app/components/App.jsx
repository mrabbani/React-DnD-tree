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

  render() {

    return (
      <div>
        <button className='add-note' onClick ={this.addNote}>+</button>
        <Notes items={this.state.notes} />
      </div>
    );
  }
}
