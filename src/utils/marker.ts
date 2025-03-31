import { CitiesDefaults, DEFAULT_CITY } from '../const';
import { PlacePreview } from '../types';

export const getCityLocation = (cityName: string, previews: PlacePreview[]) => {
  const existPreview = previews.find((item) => item.city.name === cityName);

  if (existPreview) {
    return existPreview.city.location;
  }

  return CitiesDefaults.find((item) => item.name === cityName) || DEFAULT_CITY;
};
