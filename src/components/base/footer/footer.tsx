import { Link } from 'react-router-dom';
import { AppRoute } from '@constants';

function Footer(): JSX.Element {
  return (
    <footer className="footer container" data-testid="footer-container">
      <Link className="footer__logo-link" to={AppRoute.Main} data-testid="footer-link">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </Link>
    </footer>
  );
}

export default Footer;
