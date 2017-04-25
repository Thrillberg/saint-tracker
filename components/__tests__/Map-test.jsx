import React from 'react';
import Map from '../Map';

import config from 'config';

describe('Map', () => {
  let component;
  let loadingCircle;
  let fetchStub;
  let fetchArguments;

  beforeEach(() => {
    fetchStub = sinon.stub(window, 'fetch').resolves({then: () => {}});
    fetchArguments = config.googleGeocoder('Vienna');
  });

  afterEach(() => {
    window.fetch.restore();
  });

  context('Initialization', () => {
    it('fetches from Google Geocoder API', () => {
      component = mount(<Map objects={[{productionPlaces: ['Vienna']}]} />);
      component.update();

      expect(fetchStub.firstCall.args[0]).to.eql(fetchArguments);
    });
  });

  context('Layout', () => {
    it('renders a map', () => {
      component = shallow(<Map />);
      component.setState({loading: false});

      expect(component.find('.map-container').length).to.eql(1);
    });

  });
});
