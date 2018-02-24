import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import configureStore from './app/store';
import App from './app/App';
import 'semantic-ui-css/semantic.min.css';

const store = configureStore();

const render = () => {
  ReactDOM.render(
  	<Provider store={store}>
	    <App/>
    </Provider>,
    document.getElementById('root')
  )
};

store.subscribe(render);
render();