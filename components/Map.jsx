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
      markers: []
    }
  }

  componentDidMount() {
    this.updateMarkers(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.objects[0] !== nextProps.objects[0]) {
      this.updateMarkers(nextProps);
    }

    return null;
  }

  updateMarkers(props) {
    this.setState({markers: []}, this.getCoords(props));
  }

  getCoords(props) {
    let newMarkers = [];

    props.objects.forEach(object => {
      window.fetch(config.googleGeocoder(object.place))
        .then(result => {
          return result.json()
        })
        .then(body => {
          let lat = body.results[0].geometry.location.lat
          let lng = body.results[0].geometry.location.lng
          let work = {
            work_url: object.image,
            title: object.title,
            artist: object.artist
          }
          newMarkers.push({
            position: {
              lat: lat + Math.random() * 0.001,
                lng: lng + Math.random() * 0.001
            },
            showInfo: false,
            infoContent: (
              <div
                onClick={() => {this.props.toggleWorkModal(work)}}>
                <img src={object.image} className='small-work'/>
                <div>
                  {object.title}
                </div>
                <div>
                  {object.principalOrFirstMaker}
                </div>
              </div>
            ),
            objectNumber: object.objectNumber
          })
        })
        .then(() => {
          this.setState({markers: newMarkers});
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

  render() {
    return (
      <div className="map-container">
        <AsyncGoogleMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp"
          loadingElement={
            <div className="loading-map" />
          }
          containerElement={
            <div style={{ height: '60vh', width: '40vw' }} />
          }
          mapElement={
            <div style={{ height: '60vh', width: '40vw' }} />
          }
          _onMarkerClick={this._onMarkerClick}
          toggleWorkModal={this.props.toggleWorkModal}
          markers={this.state.markers}
        />
      </div>
    )
  }
}
