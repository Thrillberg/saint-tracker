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
    component = mount(<App />);
    component.setState({
      museums: {
        museum1: {
          url: 'museum1-url',
          objects: [{object1: 'object'}]
        },
        museum2: {
          url: 'museum2-url',
          objects: [{object1: 'object'}, {object2: 'object2'}]
        }
      }
    });
  });

  afterEach(() => {
    window.fetch.restore();
  });

  context('Initialization', () => {
    describe('loading graphic', () => {
      context('before artworks are loaded', () => {
        it('renders loading graphic', () => {
          loadingCircle = component.find('.loading');

          expect(loadingCircle.length).to.eql(1);
        });
      });

      context('after artworks are loaded', () => {
        it('does not render the loading graphic', () => {
          component.setState({loading: false});
          expect(component.find('.loading').length).to.eql(0);
        });
      });
    });

    it('fetches from the museum APIs', () => {
      expect(fetchStub.calledTwice).to.eql(true);
    });
  });

  context('Layout', () => {
    it('renders a header', () => {
      expect(component.find('.header').length).to.eql(1);
    });

    it('renders works', () => {
      expect(component.find('.works').length).to.eql(1);
    });

    it('renders a Map', () => {
      component.setState({loading: false});
      expect(component.find(Map).length).to.eql(1);
    });

    it('renders a range slider', () => {
      component.setState({loading: false});
      expect(component.find('input').length).to.eql(1);
      expect(component.find('.slider-century').length).to.eql(1);
    });
  });
});
