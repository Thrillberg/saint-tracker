import React, { Component } from 'react';
import Work from './Work';
import config from 'config';

import { GoogleMap, withGoogleMap } from 'react-google-maps';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      objects: [],
      loading: true
    }
  }

  componentDidMount() {
    const path = config.rijksmuseumUrl;
    window.fetch(path)
      .then((res) => {
        return res.json()
      })
      .then((body) => {
        const objects = body.artObjects;

        objects.forEach((object) => {
          if (object.webImage) {
            this.setState({
              objects: [...this.state.objects, object]
            });
          }
        });
      })
      .then(() => {
        this.setState({loading: false});
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

    return this.shuffle(toRender);
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  renderLoader() {
    if (this.state.loading) {
      return (
        <div className="loading">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      )
    }
  }

  render() {
    const AsyncGoogleMap = withScriptjs(withGoogleMap (props => (
      <GoogleMap
        defaultZoom={4}
        defaultCenter={{ lat: 48.2082, lng: 16.3738 }} >
      </GoogleMap>
    )));

    return (
      <div>
        {this.renderLoader()}
        <div className='columns'>
          <div className='works'>
            {this.renderWorks()}
          </div>
          <div className='map'>
            <AsyncGoogleMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp"
              loadingElement={
                <div style={{ height: `100%` }}>
                  <div>
                    Loading...
                  </div>
                </div>
              }
              containerElement={
                <div style={{ height: '40vw', width: '40vw' }} />
              }
              mapElement={
                <div style={{ height: '40vw', width: '40vw' }} />
              }
            />
          </div>
        </div>
      </div>
    )
  }
}
