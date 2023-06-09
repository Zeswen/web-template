type Props = { text: string };

export const Header: React.FC<Props> = ({ text }) => {
  return <h1>{text}</h1>;
};
