import React from 'react';
import Work from '../Work';

import config from 'config';

describe('Work', () => {
  let component;

  context('Initialization', () => {
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
