import React from 'react';
import App from '../App';
import Work from '../Work';
import config from 'config';

describe('App', () => {
  let component;
  let fetchStub;
  let fetchArguments;
  let loadingCircle;

  beforeEach(() => {
    fetchStub = sinon.stub(window, 'fetch').resolves({then: () => {}});
    fetchArguments = config.rijksmuseumUrl;
  });

  afterEach(() => {
    window.fetch.restore();
  });

  context('Initialization', () => {
    describe('loading graphic', () => {
      beforeEach(() => {
        component = mount(<App />);
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

      expect(fetchStub.firstCall.args[0]).to.eql(fetchArguments);
    });
  });

  it('renders 1 Work', () => {
    component = mount(<App />);
    component.setState({
      objects: [
        {
          webImage: { url: 'some-url' },
          title: 'some-title',
          principalOrFirstMaker: 'some-artist'
        }
      ]
    });

    expect(component.find(Work).length).to.eql(1);
  });
});
