import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type FooterProps = {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={clsx('footer', className)}>
      <Link className="footer__logo-link" to={AppRoute.Main}>
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={64}
          height={33}
        />
      </Link>
    </footer >
  );
}
