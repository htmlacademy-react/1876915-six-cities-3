type GalleryProps = {
  imageUrls: string[];
}

export default function Gallery({ imageUrls }: GalleryProps) {
  return (
    <div className="offer__gallery" data-testid="gallery">
      {imageUrls.map((url, index) => (
        <div className="offer__image-wrapper" key={url} data-testid="gallery-image-wrapper">
          <img
            className="offer__image"
            src={url}
            alt={`Offer photo #${index}}`}
            data-testid="gallery-image"
          />
        </div>
      ))}
    </div>
  );
}
