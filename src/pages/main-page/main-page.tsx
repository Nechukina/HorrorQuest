import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchQuestsAction } from '../../store/api-actions';
import FiltersTypeList from '../../components/filters/filters-type/filters-type-list';
import FiltersLevelList from '../../components/filters/filters-level/filters-level-list';
import Footer from '../../components/footer/footer';
import { getLevel, getType } from '../../store/quests-filter/quests-filter.selectors';
import { getQuests } from '../../store/quests/quests.selectors';
import Header from '../../components/header/header';
import { LevelFilter, TypeFilter } from '../../const';
import SvgPath from '../../components/svg-path/svg-path';
import QuestCardList from '../../components/quest-card-list/quest-card-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useGetFilteredQuests from '../../hooks/use-get-filtered-quests/use-get-filtered-quests';

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
      <SvgPath />
      <div className="wrapper">
        <Helmet>
          <title>Escape Room</title>
        </Helmet>
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
