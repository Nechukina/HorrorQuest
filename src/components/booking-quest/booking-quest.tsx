import { useAppSelector } from '../../hooks';
import { QuestData } from '../../types/quests';
import BookingForm from '../booking-form/booking-form';
import { getStatus } from '../../store/booking/booking.selectors';
import { Status } from '../../const';
import Loader from '../loader/loader';
import MapBooking from '../map/map-booking';


export type BookingQuestProps = {
  id: string;
  quest: QuestData;
}

function BookingQuest({id, quest}: BookingQuestProps): JSX.Element {
  const isBookingQuestsLoaded = useAppSelector(getStatus);


  if (isBookingQuestsLoaded === Status.Loading) {
    return <Loader />;
  }

  return (
    <>
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
        <div className="page-content__item">
          <MapBooking />
        </div>
        <BookingForm />
      </div>
    </>
  );
}

export default BookingQuest;
