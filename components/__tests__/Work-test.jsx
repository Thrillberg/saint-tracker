import React from 'react';
import Work from '../Work';

import config from 'config';

describe('Work', () => {
  let component;
  let fetchStub;
  let fetchArguments;
  let newState;

  context('Initialization', () => {
    beforeEach(() => {
      fetchStub = sinon.stub(window, 'fetch');
      fetchArguments = config.rijksmuseumUrl;

      component = shallow(<Work />);
    });

    afterEach(() => {
      window.fetch.restore();
    });

    it('fetches from the Rijksmuseum API', () => {
      expect(fetchStub.firstCall.args[0]).to.eql(fetchArguments);
    });
  });

  context('Layout', () => {
    beforeEach(() => {
      component = shallow(<Work />);
    });

    it('displays an image', () => {
      expect(component.find('img').length).to.eql(1);
    });

    it('displays a title', () => {
      expect(component.find('.work-title').length).to.eql(1);
    });

    it('displays an artist name', () => {
      expect(component.find('.artist-name').length).to.eql(1);
    });
  });

  context('Interaction', () => {

  });
});
