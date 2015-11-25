import React, {Component} from 'react';

export default class Note extends Component {

  constructor(props) {

    super(props)
    this.state = {
      editing: false
    };
    this.finishEdit = this.finishEdit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.edit = this.edit.bind(this);
  }

  renderEdit(){

    return (
      <input  type="text"
      autoFocus={true}
      defaultValue={this.props.value}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter}
       />
    );
  }

  checkEnter(e) {
    if(e.key == "Enter") {
      this.finishEdit(e);
    }
  }

  finishEdit(e) {
    this.props.onEdit(e.target.value);
    this.setState({
      editing: false
    });
  }

  renderValue() {
    const onDelete = this.props.onDelete;
    const value = this.props.value;
    return (
      <div onClick={this.edit}>
        <span className="value">{value? value : "New value"}</span>
        {onDelete? this.renderDelete() : null}
       </div>
    );
  }

  renderDelete() {

    return (
      <button className="delete" onClick={this.props.onDelete}>x
      </button>
    );
  }

  edit() {
     this.setState({
       editing: true
     });
  }

  render() {

    return <div> {this.state.editing ? this.renderEdit() : this.renderValue()} </div>;
  }
}
