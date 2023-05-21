import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchQuestAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import QuestInfo from '../../components/quest-info/quest-info';
import SvgPath from '../../components/svg-path/svg-path';
import { getQuest, getStatus } from '../../store/quest/quest.selectors';
import { Status } from '../../const';
import Loader from '../../components/loader/loader';

function QuestPage(): JSX.Element {
  const {id} = useParams();
  const questId = String(id);
  const dispatch = useAppDispatch();
  const quest = useAppSelector(getQuest);
  const isQuestLoading = useAppSelector(getStatus) === Status.Loading;

  useEffect(() => {
    dispatch(fetchQuestAction(questId));
  }, [dispatch, questId]);

  if ( !quest || isQuestLoading ) {
    return <Loader />;
  }

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
