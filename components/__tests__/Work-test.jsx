import React from 'react';
import Work from '../Work';

describe('Work', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Work />);
  });

  context('Initialization', () => {

  });

  context('Layout', () => {
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
