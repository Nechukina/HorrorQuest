import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../../components/booking-form/booking-form';
import Footer from '../../components/footer/footer';
import { fetchBookingQuestsAction, fetchQuestAction } from '../../store/api-actions';
import { getBookingQuests, getBookingStatus } from '../../store/booking/booking.selectors';
import { getQuest, getStatus } from '../../store/quest/quest.selectors';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import SvgPath from '../../components/svg-path/svg-path';
import MapBooking from '../../components/map/map-booking';
import { Status } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';

function BookingPage (): JSX.Element {
  const dispatch = useAppDispatch();
  const quest = useAppSelector(getQuest);
  const questLoadingStatus = useAppSelector(getStatus);
  const bookingLoadingStatus = useAppSelector(getBookingStatus);
  const bookingQuests = useAppSelector(getBookingQuests);
  const questId = useParams().id;
  const id = String(questId);

  useEffect(() => {
    dispatch(fetchQuestAction(id));
    dispatch(fetchBookingQuestsAction(id));
  }, [dispatch, id]);

  if (!quest || !bookingQuests || questLoadingStatus === Status.Loading || bookingLoadingStatus === Status.Loading || bookingLoadingStatus === Status.Idle) {
    return <Loader />;
  }
  return (
    <>
      <SvgPath />
      <div className="wrapper">
        <Helmet>
          <title>Бронирование квеста - Escape Room</title>
        </Helmet>
        <Header />
        <main className="page-content decorated-page">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source type="image/webp" srcSet={quest.coverImgWebp}/><img src={quest.coverImg} srcSet={quest.coverImg} width="1366" height="1959" alt=""/>
            </picture>
          </div>
          <div className="container container--size-s">
            <div className="page-content__title-wrapper">
              <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
              </h1>
              <p className="title title--size-m title--uppercase page-content__title">{quest.title}</p>
            </div>
            {bookingQuests.length &&
            <>
              <div className="page-content__item">
                <MapBooking />
              </div>
              <BookingForm />
            </>}
          </div>
        </main>
        <Footer />
      </div>
    </>

  );
}

export default BookingPage;
