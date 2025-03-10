import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import './not-found-page.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function NotFoundPage() {
  return (
    <>
      <main className="page__main page__main--index page__main--index-empty">
        <Helmet>
          <title>6 Cities. Page not found</title>
        </Helmet>
        <h1 className="visually-hidden">Page not found (empty)</h1>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">404 Page not found</b>
                <Link className="cities__status-description not-found-link" to={AppRoute.Main}>
                  Go Back
                </Link>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
