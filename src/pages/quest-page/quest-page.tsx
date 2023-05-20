import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch } from '../../hooks';
import { fetchBookingQuestsAction, fetchQuestAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import QuestInfo from '../../components/quest-info/quest-info';
import SvgPath from '../../components/svg-path/svg-path';

function QuestPage(): JSX.Element {
  const {id} = useParams();
  const questId = String(id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestAction(questId));
    dispatch(fetchBookingQuestsAction(questId));

  }, [dispatch, questId]);

  return (
    <>
      <SvgPath />
      <div className="wrapper">
        <Helmet>
          <title>Квест - Escape Room</title>
        </Helmet>
        <Header />
        <QuestInfo id={questId} />
        <Footer />
      </div>
    </>
  );
}

export default QuestPage;
