import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './layouts/App';
import 'bootstrap/dist/css/bootstrap.min.css';


import cartReducer from './reducers/cartReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(cartReducer);


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


