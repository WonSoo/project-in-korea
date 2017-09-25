import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './res/reset.css';
import './res/nomalize.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
