import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

const redirectToRoute = createAction<AppRoute | string>('app/redirectToRoute');

export { redirectToRoute };
