import React, { Component } from 'react';

import config from 'config';

export default class Work extends Component {
  componentWillMount() {
    const path = config.rijksmuseumUrl;
    window.fetch(path);
  }

  render() {
    return(
      <div>
        <img />
        <div className='work-title' />
        <div className='artist-name' />
      </div>
    )
  }
}
