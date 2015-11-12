import React, {Component} from 'react';

export default class Note extends Component {
  constructor(props){
    super(props)
    this.test = 'Lazy';
  }

  render() {

    return <div> {this.props.task} </div>;
  }
}
