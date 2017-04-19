import React, { Component } from 'react';

export default class Work extends Component {
  render() {
    return(
      <div>
        <img src={this.props.work_url}/>
        <div className='work-title'>
          Title: {this.props.title}
        </div>
        <div className='artist-name'>
          Artist: {this.props.artist}
        </div>
      </div>
    )
  }
}
