import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import './not-found-page.css';

export default function NotFoundPage() {
  return (
    <>
      <main className="page__main page__main--not-found">
        <Helmet>
          <title>6 Cities. Page not found</title>
        </Helmet>
        <h1 className="visually-hidden">Page not found (empty)</h1>
        <b>Page not found.</b>
      </main>
      <Footer />
    </>
  );
}
