type PlaceCardMarkProps = {
  text?: string;
}

export default function PlaceCardMark({ text = 'Premium' }: PlaceCardMarkProps) {
  return (
    <div className="place-card__mark">
      <span>{text}</span>
    </div>
  );
}
