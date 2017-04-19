import React from 'react';
import ReactDOM from 'react-dom';

import Stylesheet from './saint-tracker.css';

import App from './components/App';

window.startApp = () => {
  ReactDOM.render(<App />, document.getElementById('content'));
};
