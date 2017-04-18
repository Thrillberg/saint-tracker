import React from 'react';
import App from '../App';

describe('App', () => {
  let component = shallow(<App />);
  it('has a div', () => {
    expect(component.find('div').length).to.eql(1);
  });
});
