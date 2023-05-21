import { Link, generatePath } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, LevelFilter, Status, TypeFilter } from '../../const';
import { getQuest, getStatus } from '../../store/quest/quest.selectors';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import Loader from '../loader/loader';
import Page404 from '../../pages/page-404/page-404';
import { useAppSelector } from '../../hooks';

export type QuestInfoProps = {
  id: string;
}

function QuestInfo({id}: QuestInfoProps): JSX.Element {

  const quest = useAppSelector(getQuest);
  const isQuestLoading = useAppSelector(getStatus) === Status.Loading;
  const authStatus = useAppSelector(getAuthorizationStatus);

  if (!quest ) {
    return <Page404 />;
  }

  if ( isQuestLoading ) {
    return <Loader />;
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
          <p className="subtitle quest-page__subtitle"><span className="visually-hidden">Жанр:</span>{TypeFilter[quest.type]}
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
              </svg>{LevelFilter[quest.level]}
            </li>
          </ul>
          <p className="quest-page__description">{quest.description}</p>
          {authStatus === AuthorizationStatus.Auth
            ?
            <Link className="btn btn--accent btn--cta quest-page__btn" to={generatePath(AppRoute.Booking, { id: id.toString() })}>Забронировать</Link>
            :
            <Link className="btn btn--accent btn--cta quest-page__btn" to={AppRoute.Login}>Забронировать</Link>}
        </div>
      </div>
    </main>
  );
}

export default QuestInfo;
