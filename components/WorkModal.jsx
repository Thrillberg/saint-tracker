import React, { Component } from 'react';

export default class WorkModal extends Component{
  render() {
    return (
      <div
        className="backdrop"
        onClick={this.props.closeModal} >
        <div className="modal">
          <img src={this.props.imageUrl} />
          <h3 className="title">{this.props.title}</h3>
          <h3 className="artist-name">{this.props.artist}</h3>
        </div>
      </div>
    )
  }
}
