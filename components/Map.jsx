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
      averageCenter
      enableRetinaIcons
      gridSize={60} >
      {
        props.markers.map((marker, index) => (
          <Marker
            key={index}
            onClick={ () => {props._onMarkerClick(marker)}}
            {...marker}>
            {marker.showInfo && (
              <InfoWindow>
                <div>{marker.infoContent}</div>
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
      markers: []
    }
  }

  componentWillReceiveProps() {
    this.props.objects.forEach(object => {
      window.fetch(config.googleGeocoder(object.productionPlaces[0]))
        .then(result => {
          return result.json()
        })
        .then(body => {
          let lat = body.results[0].geometry.location.lat
          let lng = body.results[0].geometry.location.lng
          this.setState({
            markers: [
              ...this.state.markers,
              { position:
                { lat, lng },
                showInfo: false,
                infoContent: (
                  <div>
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
            [marker.position]: marker.position,
            [marker.infoContent]: marker.infoContent,
            showInfo: true
          };
        }
        return marker;
      })
    });
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
          markers={this.state.markers}
        />
      </div>
    )
  }
}
