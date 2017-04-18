import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

window.startApp = () => {
  ReactDOM.render(<App />, document.getElementById('content'));
};
