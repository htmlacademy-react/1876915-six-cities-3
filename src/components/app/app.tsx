import MainScreen from '../../pages/main-screen/main-screen';

type AppProps = {
  cardsCount: number;
}

export default function App({ cardsCount }: AppProps): JSX.Element {
  return (
    <MainScreen cardsCount={cardsCount} />
  );
}
