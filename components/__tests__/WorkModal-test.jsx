import React from 'react';
import WorkModal from '../WorkModal';

describe('WorkModal', () => {
  let component;

  context('Layout', () => {
    beforeEach(() => {
      component = shallow(<WorkModal />);
    });

    it('displays an image', () => {
      expect(component.find('img').length).to.eql(1);
    });

    it('displays a title', () => {
      expect(component.find('.title').length).to.eql(1);
    });

    it('displays an artist name', () => {
      expect(component.find('.artist-name').length).to.eql(1);
    });
  });
});
