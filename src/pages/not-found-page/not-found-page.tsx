import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import './not-found-page.css';

export default function NotFoundPage() {
  return (
    <div className="page page--not-found">
      <Helmet>
        <title>6 Cities. Page not found</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--not-found">
        <h1 className="visually-hidden">Page not found (empty)</h1>
        <b>Page not found.</b>
      </main>
      <Footer />
    </div>
  );
}
