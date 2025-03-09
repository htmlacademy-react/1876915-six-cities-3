import clsx from 'clsx';

type FooterProps = {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={clsx('footer', className)}>
      <a className="footer__logo-link" href="main.html">
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={64}
          height={33}
        />
      </a>
    </footer >
  );
}
