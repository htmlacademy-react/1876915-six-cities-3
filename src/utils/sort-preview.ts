import { SortType } from '../const';
import { PlacePreview, PlaceSortType } from '../types';

type Sort = {
  [item: string]: (preview: PlacePreview[]) => PlacePreview[];
}

const sortByPriceIncrease = (first: PlacePreview, second: PlacePreview) => second.price - first.price;
const sortByPriceDecrease = (first: PlacePreview, second: PlacePreview) => first.price - second.price;
const sortByRating = (first: PlacePreview, second: PlacePreview) => second.rating - first.rating;

const sort: Sort = {
  [SortType.Popular]: (preview) => preview,
  [SortType.HighToLow]: (preview) => [...preview].sort(sortByPriceIncrease),
  [SortType.LowToHigh]: (preview) => [...preview].sort(sortByPriceDecrease),
  [SortType.TopRated]: (preview) => [...preview].sort(sortByRating),
};

export const sortPreview = (preview: PlacePreview[], sortType: PlaceSortType) => (sort[SortType[sortType]])(preview);
