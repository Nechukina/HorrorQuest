import { useAppSelector } from '../../hooks';
import { getStatus } from '../../store/quests-data/quests-data.selectors';
import QuestCard from '../quest-card/quest-card';
import { Status } from '../../const';
import Loader from '../loader/loader';
import { Quests } from '../../types/quests-data';

type QuestCardListProps ={
  quests: Quests;
}

function QuestCardList({quests}: QuestCardListProps): JSX.Element {
  const questsLoadingStatus = useAppSelector(getStatus);


  if (questsLoadingStatus === Status.Loading) {
    return <Loader />;
  }
  if(!quests.length) {
    return <p style={{textAlign: 'center', fontSize: 24}}>УВЫ! По выбранным фильтрам квестов ещё нет. Попробуйте другие варианты:)</p>;
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
