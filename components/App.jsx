import React, { Component } from 'react';
import Work from './Work';
import config from 'config';

export default class App extends Component {
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

  setInitialState(response) {
    const object = response.artObject;

    this.setState({
      work_url: object.webImage.url,
      title: object.title,
      artist: object.principalMaker
    });
  }

  render() {
    return (
      <Work />
    )
  }
}
