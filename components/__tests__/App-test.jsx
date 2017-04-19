import React from 'react';
import App from '../App';
import Work from '../Work';
import config from 'config';

describe('App', () => {
  let component;
  let fetchStub;
  let fetchArguments;

  beforeEach(() => {
    fetchStub = sinon.stub(window, 'fetch').resolves({then: () => {}});
    fetchArguments = config.rijksmuseumUrl;
  });

  afterEach(() => {
    window.fetch.restore();
  });

  context('Initialization', () => {
    it('fetches from the Rijksmuseum API', () => {
      component = shallow(<App />);

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
