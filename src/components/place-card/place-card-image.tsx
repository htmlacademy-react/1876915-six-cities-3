import cn from 'classnames';
import { AppRoute, ImageDefault as D } from '../../const';
import { Link } from 'react-router-dom';

type PlaceCardImageProps = {
  id: string;
  url: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function PlaceCardImage({ id, url, className, width = D.DefaultWidth, height = D.DefaultHeight }: PlaceCardImageProps) {
  return (
    <div className={cn('place-card__image-wrapper', className)}>
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
