import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from 'browser-history';
import { Middleware } from 'redux';
import { rootReducer } from 'store/root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirectMiddleware: Middleware<unknown, Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (action.type === 'app/redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};
