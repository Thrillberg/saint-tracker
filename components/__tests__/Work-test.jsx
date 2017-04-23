import React from 'react';
import Work from '../Work';
import WorkModal from '../WorkModal';

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

    it('does not display a title', () => {
      expect(component.find('.work-title').length).to.eql(0);
    });

    it('does not display an artist name', () => {
      expect(component.find('.artist-name').length).to.eql(0);
    });

    it('does not display a work modal', () => {
      expect(component.find(WorkModal).length).to.eql(0);
    });
  });

  context('Interaction', () => {
    context('on mouse enter', () => {
      beforeEach(() => {
        component = shallow(<Work />);
        component.simulate('mouseEnter');
      });

      it('displays a title', () => {
        expect(component.find('.work-title').length).to.eql(1);
      });

      it('displays an artist name', () => {
        expect(component.find('.artist').length).to.eql(1);
      });
    });

    context('on mouse leave', () => {
      beforeEach(() => {
        component = shallow(<Work />);
        component.simulate('mouseEnter');
        component.simulate('mouseLeave');
      });

      it('displays a title', () => {
        expect(component.find('.work-title').length).to.eql(0);
      });

      it('displays an artist name', () => {
        expect(component.find('.artist-name').length).to.eql(0);
      });
    });

    describe('on click', () => {
      beforeEach(() => {
        component = shallow(<Work />);
        component.find('img').simulate('click');
      });

      it('displays a modal', () => {
        expect(component.find(WorkModal).length).to.eql(1);
      });

      it('closes the modal', () => {
        component.instance().toggleWorkModal();

        expect(component.find(WorkModal).length).to.eql(0);
      });
    });
  });
});
