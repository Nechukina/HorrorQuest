import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';
import SvgPath from '../../components/svg-path/svg-path';

function Page404(): JSX.Element {

  return (
    <>
      <SvgPath />
      <div className="wrapper">
        <Helmet>
          <title>Страница не найдена - Escape Room</title>
        </Helmet>
        <Header />
        <main className="decorated-page quest-page">
          <div className="container container--size-l">
            <div className="quest-page__content">
              <h1 className="title title--size-l title--uppercase quest-page__title">Page 404</h1>

              <p className="quest-page__description">Похоже, Вы попали на несуществующую страницу. Попробуйте вернуться на главную...</p>
              <Link className="btn btn--accent btn--cta quest-page__btn" to={AppRoute.Main}>Назад на главную</Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Page404;
