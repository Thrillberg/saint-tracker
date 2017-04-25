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
      validObjects: [],
      loading: true,
      displayModal: false,
      workModal: null,
      sliderValue: '16'
    }
  }

  componentDidMount() {
    const page = Math.floor(Math.random() * 2);
    const path = config.rijksmuseumUrl(page);
    let count = 0;

    window.fetch(path)
      .then((res) => {
        return res.json()
      })
      .then((body) => {
        const objects = body.artObjects;
        let newObjects = [];

        objects.filter(this.checkForValidity).forEach(object => {
          const objectNumber = object.objectNumber;
          const detailPath = config.rijksmuseumDetailUrl(objectNumber);
          window.fetch(detailPath)
            .then(res => {
              return res.json()
            })
            .then((workBody) => {
              newObjects = [...newObjects, workBody.artObject]
              return newObjects;
            })
            .then((newObjects) => {
              count++
              this.setState({
                objects: this.shuffle(newObjects)
              });
              if (count === this.state.validObjects.length) {
                this.setState({loading: false});
              }
            })
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkForValidity = (object, index, objects) => {
    if (object.webImage && object.productionPlaces.length > 0) {
      this.setState({validObjects: [...this.state.validObjects, object]});
      return true;
    } else {
      return false
    }
  }

  renderWorks() {
    if (!this.state.loading) {
      let toRender = [];

      this.state.objects.filter(this.findWorkInCentury).forEach((object, index) => {
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
  }

  findWorkInCentury = (object) => {
    if (object.dating.period === parseInt(this.state.sliderValue)) {
      return true;
    } else {
      return false
    }
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
          objects={this.state.objects.filter(this.findWorkInCentury)}
          toggleWorkModal={this.toggleWorkModal} />
      )
    }
  }

  displaySlider() {
    if (!this.state.loading) {
      return (
        <div>
          <input
            value={this.state.sliderValue}
            onChange={this._handleSliderChange}
            type="range"
            min="12"
            max="20" />
          <h1 className="slider-century">
            {this.translateCentury(this.state.sliderValue)}
          </h1>
        </div>
      )
    }
  }

  _handleSliderChange = (evt) => {
    this.setState({sliderValue: evt.target.value});
  }

  translateCentury(century) {
    return `${century}th century`
  }

  render() {
    return (
      <div>
        {this.renderLoader()}
        <div className='columns'>
          <div className='works'>
            {this.renderWorks()}
          </div>
          <div className="map">
            {this.displayMap()}
            {this.displaySlider()}
          </div>
        </div>
        {this.displayWorkModal()}
      </div>
    )
  }
}
