type GalleryProps = {
  imageUrls: string[];
}

export default function PlaceGallery({ imageUrls }: GalleryProps) {
  return (
    <div className="offer__gallery" data-testid="place-gallery">
      {imageUrls.map((url, index) => (
        <div className="offer__image-wrapper" key={url} data-testid="place-gallery-image-wrapper">
          <img
            className="offer__image"
            src={url}
            alt={`Offer photo #${index}}`}
          />
        </div>
      ))}
    </div>
  );
}
