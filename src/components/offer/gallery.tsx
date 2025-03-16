type GalleryProps = {
  imageUrls: string[];
}

export default function Gallery({ imageUrls }: GalleryProps) {
  return (
    <div className="offer__gallery">
      {imageUrls.map((url, index) => (
        <div className="offer__image-wrapper" key={url}>
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
