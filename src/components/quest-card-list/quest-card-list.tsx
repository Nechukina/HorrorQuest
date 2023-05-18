import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getQuests, getStatus } from '../../store/quests-data/quests-data.selector';
import QuestCard from '../quest-card/quest-card';
import { fetchQuestsAction } from '../../store/api-actions';
import { Status } from '../../const';
import Loader from '../loader/loader';


function QuestCardList(): JSX.Element {

  const quests = useAppSelector(getQuests);
  const dispatch = useAppDispatch();
  const questsLoadingStatus = useAppSelector(getStatus);

  useEffect(() => {
    dispatch(fetchQuestsAction());
  }, [dispatch]);

  if (questsLoadingStatus === Status.Loading) {
    return <Loader />;
  }

  return (
    <>
      <h2 className="title visually-hidden">Выберите квест</h2>
      <div className="cards-grid">
        {(quests
          .map((quest) => (
            <QuestCard
              key={quest.id}
              id={quest.id}
              title={quest.title}
              previewImg={quest.previewImg}
              previewImgWebp={quest.previewImgWebp}
              level={quest.level}
              peopleMinMax={quest.peopleMinMax}
            />
          )
          ))}
      </div>
    </>
  );
}

export default QuestCardList;
