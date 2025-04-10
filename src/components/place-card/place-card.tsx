import cn from 'classnames';
import { MarkerType, PlacePreview } from '../../types';
import PlaceStatusLabel from './place-status-label';
import PlaceCardImage from './place-card-image';
import PlaceCardInfo from './place-card-info';

type PlaceListProps = {
  preview: PlacePreview;
  cardClassName: string;
  imageClassName: string;
  imageWidth?: number;
  imageHeight?: number;
  mouseEventHandler?: (marker: MarkerType) => void;
}

export default function PlaceCard({ preview, cardClassName, imageClassName, imageWidth, imageHeight, mouseEventHandler, }: PlaceListProps) {
  return (
    <article className={cn('place-card', cardClassName)}
      onMouseEnter={() => mouseEventHandler?.({ ...preview.location, id: preview.id })}
      onMouseLeave={() => mouseEventHandler?.({ ...preview.city.location })}
    >
      {preview.isPremium && <PlaceStatusLabel className='place-card__mark' />}
      <PlaceCardImage
        id={preview.id}
        url={preview.previewImage}
        className={imageClassName}
        width={imageWidth}
        height={imageHeight}
      />
      <PlaceCardInfo preview={preview} />
    </article>
  );
}
