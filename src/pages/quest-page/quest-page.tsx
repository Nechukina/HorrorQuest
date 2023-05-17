import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch } from '../../hooks';
import { fetchQuestAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import QuestInfo from '../../components/quest-info/quest-info';

function QuestPage(): JSX.Element {
  const {id} = useParams();
  const questId = String(id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestAction(questId));
  }, [dispatch, questId]);

  return (
    <>
      <Helmet>
        <title>Квест - Escape Room</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <QuestInfo id={questId} />
        <Footer />
      </div>
    </>
  );
}

export default QuestPage;
