import { Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { rootReducer } from '../index';

type Reducer = ReturnType<typeof rootReducer>;

const redirect: Middleware<unknown, Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (action.type === 'app/redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};

export { redirect };

