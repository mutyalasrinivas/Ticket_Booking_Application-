import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
 import {BrowserRouter} from 'react-router-dom';
 import {Provider} from 'react-redux';
import axios from 'axios';
import { store } from './store';
 
const root = createRoot(document.getElementById('root'));
axios.defaults.baseURL="http://localhost:5000"
root.render(
  <React.StrictMode>
   <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
   </BrowserRouter>
     
  </React.StrictMode>
);