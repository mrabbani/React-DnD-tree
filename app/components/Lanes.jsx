import React, {Component} from 'react';
import Lane from './Lane';

export default class Lanes extends Component {
  render() {
    return (

      <div className="lanes">
        {this.props.items.map(this.renderLane)}
      </div>
    );
  }
  renderLane(lane) {
    return (
        <Lane className="lane" key={lane.id} lane={lane} />     
    );
  }
}
