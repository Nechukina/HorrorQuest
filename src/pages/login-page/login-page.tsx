import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import LoginForm from '../../components/login-form/login-form';
import SvgPath from '../../components/svg-path/svg-path';
import LoginPageHeader from '../../components/login-page-header/login-page-header';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { getQuest } from '../../store/quest/quest.selectors';
import { Navigate, generatePath, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

function LoginPage(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const quest = useAppSelector(getQuest);

  const location = useLocation();
  const route = quest && location.state ? generatePath(AppRoute.Booking, { id: quest.id }) : AppRoute.Main;

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <Navigate to={route} />
    );
  }
  return (
    <>
      <SvgPath />
      <div className="wrapper">
        <Helmet>
          <title>Авторизация - Escape Room</title>
        </Helmet>
        <LoginPageHeader />
        <main className="decorated-page login">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source type="image/webp" srcSet="/img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"/><img src="/img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366" height="768" alt=""/>
            </picture>
          </div>
          <div className="container container--size-l">
            <div className="login__form">
              <LoginForm />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default LoginPage;
