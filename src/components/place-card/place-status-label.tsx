type PlaceCardMarkProps = {
  className: string;
  text?: string;
}

export default function PlaceStatusLabel({ className, text = 'Premium' }: PlaceCardMarkProps) {
  return (
    <div className={className} data-testid="place-status-label">
      <span>{text}</span>
    </div>
  );
}
