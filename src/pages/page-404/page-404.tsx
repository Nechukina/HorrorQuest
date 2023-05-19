import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';

function Page404(): JSX.Element {

  return (
    <>
      <Helmet>
        <title>Страница не найдена - Escape Room</title>
      </Helmet>
      <div className="wrapper">
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
