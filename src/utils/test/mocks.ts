import { faker } from '@faker-js/faker';
import { Place, HousingType, PlacePreview } from '../../types/place';
import { getRandomCityName } from '../../utils';
import { PlaceComment } from '../../types';
import { Action } from '@reduxjs/toolkit';

export const generatePlace = (): Place => {

  const location = {
    latitude: faker.number.float(),
    longitude: faker.number.float(),
    zoom: faker.number.int()
  };

  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(),
    description: faker.lorem.paragraph(),
    type: HousingType.Apartment,
    price: faker.number.int(),
    bedrooms: faker.number.int(),
    maxAdults: faker.number.int(),
    rating: faker.number.int(),
    isPremium: faker.datatype.boolean(),
    isFavorite: faker.datatype.boolean(),
    location,
    city: {
      name: getRandomCityName(),
      location,
    },
    images: Array(6).fill(null).map(() => faker.image.url()),
    goods: ['Wi-Fi', 'Heating'],
    host: {
      name: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean()
    },
  };
};

export const generatePlacePreview = (): PlacePreview => ({ ...generatePlace(), previewImage: faker.image.url() });

export const generatePlaceComment = (): PlaceComment => ({
  id: faker.string.uuid(),
  comment: faker.lorem.paragraph(),
  date: faker.date.past().toISOString(),
  rating: faker.number.int({ min: 1, max: 5 }),
  user: {
    name: faker.person.fullName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean()
  }
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
