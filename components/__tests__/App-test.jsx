import React from 'react';
import App from '../App';
import Map from '../Map';
import config from 'config';

import { GoogleMap } from 'react-google-maps';

describe('App', () => {
  let component;
  let fetchStub;
  let loadingCircle;

  beforeEach(() => {
    fetchStub = sinon.stub(window, 'fetch').resolves({then: () => {}});
  });

  afterEach(() => {
    window.fetch.restore();
  });

  context('Initialization', () => {
    describe('loading graphic', () => {
      beforeEach(() => {
        component = shallow(<App />);
      });

      context('before artworks are loaded', () => {
        it('renders loading graphic', () => {
          loadingCircle = component.find('.loading');

          expect(loadingCircle.length).to.eql(1);
        });
      });

      context('after artworks are loaded', () => {
        it('does not render the loading graphic', () => {
          component.setState({loading: false});
          loadingCircle = component.find('.loading');

          expect(loadingCircle.length).to.eql(0);
        });
      });
    });

    it('fetches from the Rijksmuseum API', () => {
      component = mount(<App />);

      expect(fetchStub.calledOnce).to.eql(true);
    });
  });

  it('renders works', () => {
    component = mount(<App />);
    expect(component.find('.works').length).to.eql(1);
  });

  it('renders a Map', () => {
    component = mount(<App />);
    component.setState({loading: false});
    expect(component.find(Map).length).to.eql(1);
  });

  it('renders a range slider', () => {
    component = shallow(<App />);
    component.setState({loading: false});
    expect(component.find('input').length).to.eql(1);
    expect(component.find('.slider-century').length).to.eql(1);
  });
});
