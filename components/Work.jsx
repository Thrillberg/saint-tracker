import React, { Component } from 'react';
import WorkModal from './WorkModal';

export default class Work extends Component {
  constructor() {
    super();

    this.state = {
      hovered: false,
      displayModal: false
    }
  }

  displayWorkInformation() {
    if (this.state.hovered) {
      return (
        <div className='work-information'>
          <div className='work-title'>{this.props.title}</div>
          <div className='artist'>{this.props.artist}</div>
        </div>
      )
    }
  }

  toggleWorkModal = () => {
    this.setState({displayModal: !this.state.displayModal});
  }

  displayWorkModal() {
    if (this.state.displayModal) {
      return (
        <WorkModal
          closeModal={this.toggleWorkModal}
          imageUrl={this.props.work_url}
          title={this.props.title}
          artistName={this.props.artist} />
      )
    }
  }

  render() {
    return(
      <div
        className='work'
        onMouseEnter={() => {this.setState({hovered: true})}}
        onMouseLeave={() => {this.setState({hovered: false})}}
      >
        {this.displayWorkInformation()}
        <img
          src={this.props.work_url}
          className='work-image'
          onClick={this.toggleWorkModal} />
        {this.displayWorkModal()}
      </div>
    )
  }
}
