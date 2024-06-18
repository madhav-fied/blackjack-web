interface CardProps {
  value: string;
}

function Card({ value }: CardProps) {
  return <div>{value}</div>;
}

export default Card;
