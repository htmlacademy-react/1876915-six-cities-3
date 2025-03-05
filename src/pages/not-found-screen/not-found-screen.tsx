import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

export default function NotFoundScreen() {
  return (
    <div className="page page--favorites-empty">
      <Header />
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Page not found (empty)</h1>
            <b className="favorites__status" style={{
              textAlign: 'center',
              marginTop: '50%',
              width: '100%',
              transform: 'translateY(-50%)'
            }}
            >
              Page not found.
            </b>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
