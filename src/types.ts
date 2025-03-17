import { SortType } from './const';

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

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type LoggedUser = User & {
  email: string;
  token: string;
}

export type Place = Omit<PlacePreview, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}

export type Comment = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export type PlaceSortType = keyof typeof SortType;
