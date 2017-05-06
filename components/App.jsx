import React, { Component } from 'react';
import Work from './Work';
import WorkModal from './WorkModal';
import Map from './Map';
import config from 'config';


export default class App extends Component {
  constructor() {
    super();
    const page = Math.floor(Math.random() * 2);
    const harvardUrl = config.harvardUrl(page);
    const rijksmuseumUrl = config.rijksmuseumUrl(page);

    this.state = {
      loading: true,
      displayModal: false,
      workModal: null,
      sliderValue: '16',
      museums: {
        harvard: {
          url: harvardUrl,
          loading: true,
          objects: []
        },
        rijksmuseum: {
          url: rijksmuseumUrl,
          loading: true,
          objects: []
        }
      }
    }
  }

  componentDidMount() {
    Object.keys(this.state.museums).forEach(museumKey => {
      this.query(museumKey);
    });
  }

  query = (museumName) => {
    let promises;

    window.fetch(this.state.museums[museumName].url)
      .then((res) => {
        return res.json()
      })
      .then((body) => {
        switch (museumName) {
          case 'harvard':
            this.processHarvard(body);
            return museumName;
          case 'rijksmuseum':
            promises = [];
            this.processRijksmuseum(body, promises);
            return museumName;
          default:
            return null
        }
      })
      .catch((err) => {
        const newMuseum = Object.assign({}, this.state.museums[museumName], {loading: false});
        const newMuseums = Object.assign({}, this.state.museums, {[museumName]: newMuseum});
        this.setState({
          museums: newMuseums
        });
        console.log(err);
      });
  }

  processRijksmuseum(body, promises) {
    const objects = body.artObjects;
    let filteredObjects = [];

    objects.filter((obj) => {
      if (obj.webImage && obj.productionPlaces.length > 0) {
        filteredObjects.push(obj);
        return true;
      }
    })
    .forEach(object => {
      const id = object.objectNumber;
      const detailPath = config.rijksmuseumDetailUrl(id);
      let promise = window.fetch(detailPath)
        .then(res => {
          return res.json()
        })
        .then((workBody) => {
          const work = workBody.artObject;

          const title = work.title;
          const artist = work.principalMaker;
          const century = work.dating.period;
          const image = work.webImage.url;
          const place = work.productionPlaces[0];

          const newObject = { id, title, artist, century, image, place }
          const newObjects = [...this.state.museums.rijksmuseum.objects, newObject]
          let rijksmuseum = this.state.museums.rijksmuseum;
          rijksmuseum = Object.assign(rijksmuseum, {objects: newObjects});
          this.setState({museums: Object.assign(this.state.museums, {rijksmuseum: rijksmuseum})});

          if (this.state.museums.rijksmuseum.objects.length === filteredObjects.length) {
            const newMuseum = Object.assign({}, this.state.museums.rijksmuseum, {loading: false});
            const newMuseums = Object.assign({}, this.state.museums, {rijksmuseum: newMuseum});
            this.setState({museums: newMuseums});
            this.updateLoadingState();
          }
        })
      promises.push(promise);
    })
    return Promise.all(promises);
  }

  processHarvard(body) {
    const objects = body.records;

    objects.filter((obj) => {
      return obj.people && obj.people[0].deathplace
    })
    .forEach(object => {
      const id = object.id;
      const title = object.title;
      const artist = object.people[0].name;
      const century = parseInt(object.century.slice(0, 2));
      const image = object.primaryimageurl;
      const place = object.people[0].deathplace;

      const newObject = { id, title, artist, century, image, place }
      const newObjects = [...this.state.museums.harvard.objects, newObject]

      let harvard = this.state.museums.harvard;
      harvard = Object.assign(harvard, {objects: newObjects});
    })

    const newMuseum = Object.assign({}, this.state.museums.harvard, {loading: false});
    const newMuseums = Object.assign({}, this.state.museums, {harvard: newMuseum});
    this.setState({museums: newMuseums});
    this.updateLoadingState();
  }

  updateLoadingState() {
    let count = 0;

    Object.keys(this.state.museums).forEach(museumKey => {
      if (!this.state.museums[museumKey].loading) {
        count++;
      }
    });

    if (count === Object.keys(this.state.museums).length) {
      this.setState({loading: false});
    }
  }

  renderWorks() {
    if (!this.state.loading) {
      let toRender = [];

      Object.keys(this.state.museums).forEach(museumKey => {
        this.state.museums[museumKey].objects.filter((object) => {
          return object.century === parseInt(this.state.sliderValue)
        })
        .forEach((object, index) => {
          toRender.push(
            <Work
              key={`${museumKey} - ${index}`}
              toggleWorkModal={this.toggleWorkModal}
              work_url={object.image.toString()}
              title={object.title.toString()}
              artist={object.artist.toString()}
            />
          )
        });
      });

      return this.shuffle(toRender);
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
      let objects = [];
      Object.keys(this.state.museums).forEach(museumKey => {
        Object.keys(this.state.museums[museumKey].objects).forEach(objKey => {
          objects.push(this.state.museums[museumKey].objects[objKey]);
        });
      });
      return (
        <Map
          objects={objects.filter(object => {
            return object.century === parseInt(this.state.sliderValue)
          })}
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
