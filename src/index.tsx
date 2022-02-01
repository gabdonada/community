import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Starting Firebase connection
import './services/firebase'

import '../src/globalStyles.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
