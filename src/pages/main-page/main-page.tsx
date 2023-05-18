import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
// import { getQuests, getStatus } from '../../store/quests-data/quests-data.selector';
// import { useAppDispatch, useAppSelector } from '../../hooks';
// import { useEffect } from 'react';
// import { fetchQuestsAction } from '../../store/api-actions';
// import { Status } from '../../const';
// import Loader from '../../components/loader/loader';
import FiltersTypeList from '../../components/filters/filters-type/filters-type-list';
import FiltersLevelList from '../../components/filters/filters-level/filters-level-list';
import QuestCardList from '../../components/quest-card-list/quest-card-list';

function MainPage (): JSX.Element {


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
            <QuestCardList />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
