import clsx from 'clsx';
import { PlacePreview } from '../../types';
import PlaceMark from './place-mark';
import PlaceCardImage from './place-card-image';
import PlaceCardInfo from './place-card-info';

type PlaceListProps = {
  preview: PlacePreview;
  cardClassName: string;
  imageClassName: string;
  imageWidth?: number;
  imageHeight?: number;
}

export default function PlaceCard({ preview, cardClassName, imageClassName, imageWidth, imageHeight }: PlaceListProps) {
  return (
    <article className={clsx('place-card', cardClassName)} data-card-id={preview.id}>
      {preview.isPremium && <PlaceMark className='place-card__mark'/>}
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
