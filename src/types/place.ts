import { CitiesDefaults, SortType } from '../const';
import { User } from './user';

export enum HousingType {
  Apartment = 'apartment',
  Room = 'room',
  House = 'house',
  Hotel = 'hotel',
}

export type PlaceLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type MarkerType = PlaceLocation & { id?: string };

export type CityName = typeof CitiesDefaults[number]['name'];

export type City = {
  name: CityName;
  location: PlaceLocation;
}

export type PlacePreview = {
  id: string;
  title: string;
  type: HousingType;
  price: number;
  previewImage: string;
  city: City;
  location: PlaceLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type Place = Omit<PlacePreview, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}

export type PlaceSortType = keyof typeof SortType;
