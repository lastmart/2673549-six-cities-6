import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './features/App';
import {PlacesCount} from './constants.ts';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCount={PlacesCount}/>
  </React.StrictMode>
);
