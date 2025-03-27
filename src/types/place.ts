import { SortType } from '../const';
import { User } from './user';

export enum PlaceType {
  Apartment = 'apartment',
  Room = 'room',
  House = 'house',
  Hotel = 'hotel',
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type MarkerType = Location & { id?: string };

export type City = {
  name: string;
  location: Location;
}

export type PlacePreview = {
  id: string;
  title: string;
  type: PlaceType;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
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
