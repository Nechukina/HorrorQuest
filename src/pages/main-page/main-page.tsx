import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { getQuests } from '../../store/quests-data/quests-data.selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchQuestsAction } from '../../store/api-actions';
import FiltersTypeList from '../../components/filters/filters-type/filters-type-list';
import FiltersLevelList from '../../components/filters/filters-level/filters-level-list';
import QuestCardList from '../../components/quest-card-list/quest-card-list';
import { getLevel, getType } from '../../store/quests-filter/quests-filter.selectors';
import useGetFilteredQuests from '../../hooks/use-get-filtered-quests/use-get-filtered-quests';
import { LevelFilter, TypeFilter } from '../../const';

function MainPage (): JSX.Element {
  const dispatch = useAppDispatch();
  const quests = useAppSelector(getQuests);
  const activeType = useAppSelector(getType);
  const activeLevel = useAppSelector(getLevel);
  const filteredQuests = useGetFilteredQuests(quests, activeType, activeLevel);

  useEffect(() => {
    dispatch(fetchQuestsAction());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Escape Room</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <div className="page-content__title-wrapper">
              <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге
              </h1>
              <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
            </div>
            <div className="page-content__item">
              <form className="filter" action="#" method="get">
                <FiltersTypeList />
                <FiltersLevelList />
              </form>
            </div>
            {activeType === TypeFilter['all-types'] && activeLevel === LevelFilter.any
              ? <QuestCardList quests={quests}/>
              :
              <QuestCardList quests={filteredQuests}/>}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
