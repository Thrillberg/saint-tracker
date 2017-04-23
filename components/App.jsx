import React, { Component } from 'react';
import Work from './Work';
import WorkModal from './WorkModal';
import Map from './Map';
import config from 'config';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      objects: [],
      loading: true,
      displayModal: false,
      workModal: null
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
        let newObjects = [];

        objects.forEach((object) => {
          if (object.webImage && object.productionPlaces.length > 0) {
            newObjects = [...newObjects, object];
          }
        })

        return newObjects;
      })
      .then((newObjects) => {
        this.setState({
          objects: this.shuffle(newObjects)
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
          toggleWorkModal={this.toggleWorkModal}
          work_url={object.webImage.url.toString()}
          title={object.title.toString()}
          artist={object.principalOrFirstMaker.toString()}
        />
      )
    });

    return toRender;
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

  toggleWorkModal = (work) => {
    this.setState({
      displayModal: !this.state.displayModal,
      workModal: work
    }, this.displayWorkModal);
  }

  displayWorkModal() {
    if (this.state.displayModal) {
      return (
        <WorkModal
          closeModal={this.toggleWorkModal}
          imageUrl={this.state.workModal.work_url}
          title={this.state.workModal.title}
          artistName={this.state.workModal.artist} />
      )
    }
  }

  displayMap() {
    if (!this.state.loading) {
      return (
        <Map
          objects={this.state.objects}
          toggleWorkModal={this.toggleWorkModal} />
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderLoader()}
        <div className='columns'>
          <div className='works'>
            {this.renderWorks()}
          </div>
          {this.displayMap()}
        </div>
        {this.displayWorkModal()}
      </div>
    )
  }
}
