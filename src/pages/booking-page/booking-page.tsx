import { Helmet } from 'react-helmet-async';
import BookingQuest from '../../components/booking-quest/booking-quest';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getQuest } from '../../store/quest-data/quest-data.selector';
import Page404 from '../page-404/page-404';

function BookingPage (): JSX.Element {
  const quest = useAppSelector(getQuest);
  const questId = quest?.id;
  const id = String(questId);

  if (!quest) {
    return <Page404 />;
  }
  return (
    <>
      <Helmet>
        <title>Бронирование квеста - Escape Room</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main className="page-content decorated-page">
          <BookingQuest id={id} quest={quest}/>
        </main>
        <Footer />
      </div>
    </>

  );
}

export default BookingPage;
