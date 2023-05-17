import { Link, generatePath } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import Page404 from '../../pages/page-404/page-404';
import { getQuest } from '../../store/quest-data/quest-data.selector';
import { AppRoute } from '../../const';

export type QuestInfoProps = {
  id: string;
}

function QuestInfo({id}: QuestInfoProps): JSX.Element {

  const quest = useAppSelector(getQuest);

  // eslint-disable-next-line no-console
  console.log(quest);


  if (!quest) {
    return <Page404/>;
  }

  const srcSet2Webp = `${quest.coverImgWebp}, ${quest.coverImgWebp} 2x`;
  const srcSet2Jpeg = `${quest.coverImg} 2x`;

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet={srcSet2Webp}/><img src={quest.coverImg} srcSet={srcSet2Jpeg} width="1366" height="768" alt=""/>
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">{quest.title}</h1>
          <p className="subtitle quest-page__subtitle"><span className="visually-hidden">Жанр:</span>{quest.type}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width="11" height="14" aria-hidden="true">
                <use xlinkHref="#icon-person"></use>
              </svg>{quest.peopleMinMax[0]}&ndash;{quest.peopleMinMax[1]}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-level"></use>
              </svg>{quest.level}
            </li>
          </ul>
          <p className="quest-page__description">{quest.description}</p>
          <Link className="btn btn--accent btn--cta quest-page__btn" to={generatePath(AppRoute.Booking, { id: id.toString() })}>Забронировать</Link>
        </div>
      </div>
    </main>
  );
}

export default QuestInfo;
