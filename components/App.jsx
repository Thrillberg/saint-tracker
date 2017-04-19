import React, { Component } from 'react';
import Work from './Work';
import config from 'config';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      objects: []
    }
  }

  componentWillMount() {
    const path = config.rijksmuseumUrl;
    window.fetch(path)
      .then((res) => {
        return res.json()
      })
      .then((body) => {
        const objects = body.artObjects;

        objects.forEach((object) => {
          this.setState({
            objects: [...this.state.objects, object]
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderWorks() {
    let toRender = [];

    this.state.objects.forEach((object, index) => {
      toRender.push(
        <Work
          key={index}
          work_url={object.webImage.url.toString()}
          title={object.title.toString()}
          artist={object.principalOrFirstMaker.toString()}
        />
      )
    });

    return toRender;
  }

  render() {
    return (
      <div className='works'>
        {this.renderWorks()}
      </div>
    )
  }
}
