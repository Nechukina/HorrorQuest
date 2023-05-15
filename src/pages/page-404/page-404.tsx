import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import HiddenSvg from '../../components/hidden-svg/hidden-svg';
import { AppRoute } from '../../const';

function Page404(): JSX.Element {
//   const PageTitleStyle = {
//     textAlign: 'center',
//     fontSize: '3em',
//     marginBottom: '1.25em',
//     color: 'red'
//   } as const;
//   const PageTextStyle = {
//     textAlign: 'center',
//     color: '#c9c0bb',
//     fontSize: '1.25em',
//   } as const;
//   const MainLinkStyle = {
//     width: 'fit-content',
//     margin: '0 auto',
//     padding: '0 2%'
//   } as const;
  return (
    <>
      <HiddenSvg />
      <div className="wrapper">
        <Header />
        <main className="decorated-page quest-page">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"/><img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366" height="768" alt=""/>
            </picture>
          </div>
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
