import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SvgPath from '../../components/svg-path/svg-path';
import ReservationQuestList from '../../components/reservation-quests-list/reservation-quests-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getStatus } from '../../store/reservation-quests/reservation-quests.selectors';
import { useEffect } from 'react';
import { Status } from '../../const';
import Loader from '../../components/loader/loader';
import {fetchReservationQuestsAction} from '../../store/api-actions';

function MyQuestsPage(): JSX.Element {
  const reservationQuestsStatus = useAppSelector(getStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReservationQuestsAction());
  }, [dispatch]);

  if (reservationQuestsStatus === Status.Loading) {
    return <Loader />;
  }
  return (
    <>
      <SvgPath />
      <div className="wrapper">
        <Helmet>
          <title>Мои бронирования - Escape Room</title>
        </Helmet>
        <Header />
        <main className="decorated-page login">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source type="image/webp" srcSet="/img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"/><img src="/img/content/maniac/maniac-bg-size-m.jpg" srcSet="/img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959" alt=""/>
            </picture>
          </div>
          <div className="container">
            <div className="page-content__title-wrapper">
              <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
            </div>
            <ReservationQuestList />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MyQuestsPage;
