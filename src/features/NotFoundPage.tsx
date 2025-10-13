import {Link} from 'react-router-dom';
import {AppRoute} from '../constants.ts';

function NotFoundPage(): JSX.Element {
  return (
    <div
      className="page page--not--found"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h1>404. Page not found</h1>
      <br/>
      <Link
        className="to__main__page"
        to={AppRoute.Main}
        style={{
          color: '#007bff',
          textDecoration: 'underline',
          cursor: 'pointer'
        }}
      >
        <small>Вернуться на главную страницу</small>
      </Link>
    </div>
  );
}

export default NotFoundPage;
