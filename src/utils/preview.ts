import { SortType } from '../const';
import { PlacePreview, PlaceSortType } from '../types';

type Sort = {
  [item: string]: (preview: PlacePreview[]) => PlacePreview[];
}

const sortByPriceIncrease = (first: PlacePreview, second: PlacePreview) => second.price - first.price;
const sortByPriceDecrease = (first: PlacePreview, second: PlacePreview) => first.price - second.price;
const sortByRating = (first: PlacePreview, second: PlacePreview) => first.rating - second.rating;

const sort: Sort = {
  [SortType.Popular]: (preview) => preview,
  [SortType.HighToLow]: (preview) => preview.toSorted(sortByPriceIncrease),
  [SortType.LowToHigh]: (preview) => preview.toSorted(sortByPriceDecrease),
  [SortType.TopRated]: (preview) => preview.toSorted(sortByRating),
};

export const sortPreview = (preview: PlacePreview[], sortType: PlaceSortType) => (sort[SortType[sortType]])(preview);
