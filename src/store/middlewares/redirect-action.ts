import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../../const';

const redirectAction = createAction<AppRoute | string>('app/redirectToRoute');

export { redirectAction };
