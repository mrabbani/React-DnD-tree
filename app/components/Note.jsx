import React, {Component} from 'react';
import {DragSource, DropTarget  } from 'react-dnd';
import ItemTypes from '../constants/itemTypes'

const noteSource = {
  beginDrag(props) {
    console.log('begin dragging note', props);

    return {
      id: props.id
    };
  }
};

const noteTarget  = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
    if(sourceId !== targetId) {
      console.log('dragging note', sourceProps, targetId);
      targetProps.onMove({sourceId, targetId});
    }
  }
};



@DragSource(ItemTypes.NOTE, noteSource, (connect) => ({
  connectDragSource: connect.dragSource()
}))

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))

export default class Note extends Component {
  render() {

    const {connectDragSource, connectDropTarget, id, onMove, ...props} = this.props;

    return connectDragSource(connectDropTarget(
       <li {...this.props}>{this.props.children}</li>)
     );
  }
}