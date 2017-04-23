import React, { Component } from 'react';

export default class Work extends Component {
  constructor() {
    super();

    this.state = {
      hovered: false
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
          onClick={() => this.props.toggleWorkModal(this.props)} />
      </div>
    )
  }
}
