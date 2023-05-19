import { useAppSelector } from '../../hooks';
import { QuestData } from '../../types/quests-data';
import BookingForm from '../booking-form/booking-form';
import Map from '../map/map';
import { getBookingQuests, getStatus } from '../../store/booking-data/booking-data.selectors';
import { Status } from '../../const';
import Loader from '../loader/loader';


export type BookingQuestProps = {
  id: string;
  quest: QuestData;
}

function BookingQuest({id, quest}: BookingQuestProps): JSX.Element {
  const bookingQuests = useAppSelector(getBookingQuests);
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
          <div className="booking-map">
            <div className="map">
              <Map location={bookingQuests[0].location.coords} quests={bookingQuests} selectedQuestId={id} className="map__container"/>
            </div>
            <p className="booking-map__address">Вы&nbsp;выбрали: наб. реки Карповки&nbsp;5, лит&nbsp;П, м. Петроградская</p>
          </div>
        </div>
        <BookingForm id={id}/>
      </div>
    </>
  );
}

export default BookingQuest;
