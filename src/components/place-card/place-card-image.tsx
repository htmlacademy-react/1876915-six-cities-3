import clsx from 'clsx';
import { AppRoute, PlaceCardDefault as D } from '../../const';
import { Link } from 'react-router-dom';

type PlaceCardImageProps = {
  id: string;
  url: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function PlaceCardImage({ id, url, className, width = D.DEFAULT_WIDTH, height = D.SMALL_HEIGHT }: PlaceCardImageProps) {
  return (
    <div className={clsx('place-card__image-wrapper', className)}>
      <Link to={`${AppRoute.Offer}/${id}`}>
        <img
          className="place-card__image"
          src={url}
          width={width}
          height={height}
          alt="Place image"
        />
      </Link>
    </div>
  );
}
