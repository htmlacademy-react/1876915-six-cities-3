import clsx from 'clsx';
import { PlacePreview } from '../../types';
import PlaceCardMark from './place-card-mark';
import PlaceCardImage from './place-card-image';
import PlaceCardInfo from './place-card-info';

type PlaceListProps = {
  preview: PlacePreview;
  className: string;
}

export default function PlaceCard({ preview, className }: PlaceListProps) {
  return (
    <article className={clsx('place-card', className)}>
      {preview.isPremium && <PlaceCardMark />}
      <PlaceCardImage
        id={preview.id}
        url={preview.previewImage}
        className='cities__image-wrapper'
      />
      <PlaceCardInfo preview={preview} />
    </article>
  );
}
