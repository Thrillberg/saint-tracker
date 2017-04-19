import React, { Component } from 'react';

export default class Work extends Component {
  constructor() {
    super();

    this.state = {
      hovered: false
    }
  }

  displayWorkTitle() {
    if (this.state.hovered) {
      return(
        <div className='work-title'>
          Title: {this.props.title}
        </div>
      )
    }
  }

  displayArtistName() {
    if (this.state.hovered) {
      return(
        <div className='artist-name'>
          Artist: {this.props.artist}
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
        <img src={this.props.work_url} className='work-image' />
        {this.displayWorkTitle()}
        {this.displayArtistName()}
      </div>
    )
  }
}
