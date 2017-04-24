import React, { Component } from 'react';

import { GoogleMap, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";

import config from 'config';

const AsyncGoogleMap = withScriptjs(withGoogleMap (props => (
  <GoogleMap
    defaultZoom={4}
    defaultCenter={{ lat: 48.2082, lng: 16.3738 }} >
    <MarkerClusterer
      enableRetinaIcons
      gridSize={60} >
      {
        props.markers.map((marker, index) => (
          <Marker
            key={index}
            onClick={() => {props._onMarkerClick(marker)}}
            position={marker.position}>
            {marker.showInfo && (
              <InfoWindow>
                {marker.infoContent}
              </InfoWindow>
            )}
          </Marker>
        ))
      }
    </MarkerClusterer>
  </GoogleMap>
)));

export default class Map extends Component {
  constructor() {
    super();

    this.state = {
      markers: [],
      sliderValue: '17'
    }
  }

  componentDidMount() {
    this.props.objects.forEach(object => {
      window.fetch(config.googleGeocoder(object.productionPlaces[0]))
        .then(result => {
          return result.json()
        })
        .then(body => {
          let lat = body.results[0].geometry.location.lat
          let lng = body.results[0].geometry.location.lng
          let work = {
            work_url: object.webImage.url,
            title: object.title,
            artist: object.principalOrFirstMaker
          }
          this.setState({
            markers: [
              ...this.state.markers,
              { position:
                { lat: lat + Math.random() * 0.001,
                  lng: lng + Math.random() * 0.001 },
                showInfo: false,
                infoContent: (
                  <div
                    onClick={() => {this.props.toggleWorkModal(work)}}>
                    <img src={object.webImage.url} className='small-work'/>
                    <div>
                      {object.title}
                    </div>
                    <div>
                      {object.principalOrFirstMaker}
                    </div>
                  </div>
                )
              }
            ]
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  _onMarkerClick = (currentMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === currentMarker) {
          return {
            position: marker.position,
            infoContent: marker.infoContent,
            showInfo: !marker.showInfo
          };
        }
        return marker;
      })
    });
  }

  _handleSliderChange = (evt) => {
    this.setState({sliderValue: evt.target.value});
  }

  translateCentury(century) {
    return `${century}th century`
  }

  render() {
    return (
      <div className="map">
        <AsyncGoogleMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp"
          loadingElement={
            <div className="loading" />
          }
          containerElement={
            <div style={{ height: '40vw', width: '40vw' }} />
          }
          mapElement={
            <div style={{ height: '40vw', width: '40vw' }} />
          }
          _onMarkerClick={this._onMarkerClick}
          toggleWorkModal={this.props.toggleWorkModal}
          markers={this.state.markers}
        />
        <input
          value={this.state.sliderValue}
          onChange={this._handleSliderChange}
          type="range"
          min="12"
          max="20" />
        <h1 className="slider-century">{this.translateCentury(this.state.sliderValue)}</h1>
      </div>
    )
  }
}
