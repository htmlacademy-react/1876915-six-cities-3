import clsx from 'clsx';
import { MarkerType, PlacePreview } from '../../types/place';
import PlaceStatusLabel from './place-status-label';
import PlaceCardImage from './place-card-image';
import PlaceCardInfo from './place-card-info';

type PlaceListProps = {
  preview: PlacePreview;
  cardClassName: string;
  imageClassName: string;
  imageWidth?: number;
  imageHeight?: number;
  onMouseEnterCallback?: (preview: MarkerType) => void;
  onMouseLeaveCallback?: (preview: MarkerType) => void;
}

export default function PlaceCard({ preview, cardClassName, imageClassName, imageWidth, imageHeight, onMouseEnterCallback, onMouseLeaveCallback }: PlaceListProps) {
  return (
    <article className={clsx('place-card', cardClassName)}
      onMouseEnter={() => onMouseEnterCallback?.({ id: preview.id, ...preview.location })}
      onMouseLeave={() => onMouseLeaveCallback?.({ id: preview.id, ...preview.location })}
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
