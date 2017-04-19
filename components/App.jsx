import React, { Component } from 'react';
import Work from './Work';
import config from 'config';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      work_url: '',
      title: '',
      artist: ''
    }
  }

  componentWillMount() {
    const path = config.rijksmuseumUrl;
    window.fetch(path)
      .then((res) => {
        return res.json()
      })
      .then((body) => {
        const object = body.artObject;

        this.setState({
          work_url: object.webImage.url,
          title: object.title,
          artist: object.principalMaker
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Work
        work_url={this.state.work_url}
        title={this.state.title}
        artist={this.state.artist}
      />
    )
  }
}
