import React, { Component } from 'react';

export default class WorkModal extends Component{
  render() {
    return (
      <div
        className="backdrop"
        onClick={this.props.closeModal} >
        <div className="modal">
          <img src={this.props.imageUrl} />
          <div className="title">{this.props.title}</div>
          <div className="artist-name">{this.props.principalOrFirstMaker}</div>
        </div>
      </div>
    )
  }
}
