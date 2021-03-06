import React from 'react';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, shallow} from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import mock from 'mock-require';

import 'whatwg-fetch';

chai.use(chaiEnzyme());
chai.use(sinonChai);

global.expect = chai.expect;
global.assert = chai.assert;
global.React = React;
global.mount = mount;
global.sinon = sinon;
global.shallow = shallow;

mock('config', '../config/development');
