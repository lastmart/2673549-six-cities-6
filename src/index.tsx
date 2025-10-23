import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'features/App';
import {PlacesCount} from '@constants';
import {offers} from 'mocks/Offers';
import {reviews} from 'mocks/Reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCount={PlacesCount} offers={offers} reviews={reviews}/>
  </React.StrictMode>
);
