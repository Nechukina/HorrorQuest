import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthorizationStatus);


  const onClick = () => {
    dispatch(logoutAction());
  };
  return (
    <header className="header">
      <div className="container container--size-l">
        <span className="logo header__logo">
          <Link className="link" to={AppRoute.Main}>
            <svg width="134" height="52" aria-hidden="true">
              <use xlinkHref="#logo"></use>
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
          {authStatus === AuthorizationStatus.Auth ? <Link onClick={onClick} className="btn btn--accent header__side-item" to={AppRoute.Login}>Выйти</Link> : <Link className="btn header__side-item header__login-btn" to={AppRoute.Login}>Вход</Link>}
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
