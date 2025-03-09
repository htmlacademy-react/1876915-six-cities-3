import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { getPlaces } from './mocks/places';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placePreviews={getPlaces()} />
  </React.StrictMode>
);
