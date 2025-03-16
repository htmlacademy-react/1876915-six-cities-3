type PlaceCardMarkProps = {
  className: string;
  text?: string;
}

export default function PlaceMark({ className, text = 'Premium' }: PlaceCardMarkProps) {
  return (
    <div className={className}>
      <span>{text}</span>
    </div>
  );
}
