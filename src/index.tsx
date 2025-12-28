import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from 'components/app/app';
import ErrorMessage from 'components/base/error-message/error-message';
import { store } from 'store';
import {
  checkAuthAction,
  fetchFavoriteOffersAction,
  fetchOffersAction
} from 'store/api-actions';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoriteOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
