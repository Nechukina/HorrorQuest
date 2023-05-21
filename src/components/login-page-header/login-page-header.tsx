import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

function LoginPageHeader(): JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);

  return (
    <header className="header">
      <div className="container container--size-l">
        <span className="logo header__logo">
          <Link className="link" to={AppRoute.Main}>
            <svg width="134" height="52" aria-hidden="true">
              <image href="/img/sprite/logo.svg" />
            </svg>
          </Link>
        </span>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="link" to={AppRoute.Main}>Квесты</Link>
            </li>
            <li className="main-nav__item">
              <Link className="link" to={AppRoute.Contacts}>Контакты</Link>
            </li>
            {authStatus === AuthorizationStatus.Auth &&
        <li className="main-nav__item">
          <Link className="link" to={AppRoute.Reservation}>Мои бронирования</Link>
        </li>}

          </ul>
        </nav>
        <div className="header__side-nav">
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}

export default LoginPageHeader;
