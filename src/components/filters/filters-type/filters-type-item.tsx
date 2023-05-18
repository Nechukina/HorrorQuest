function FiltersTypeItem(): JSX.Element {
  return (
    <>
      <li className="filter__item">
        <input type="radio" name="type" id="all" />
        <label className="filter__label" htmlFor="all">
          <svg className="filter__icon" width="26" height="30" aria-hidden="true">
            <use xlinkHref="#icon-all-quests"></use>
          </svg><span className="filter__label-text">Все квесты</span>
        </label>
      </li>
      <li className="filter__item">
        <input type="radio" name="type" id="adventure" />
        <label className="filter__label" htmlFor="adventure">
          <svg className="filter__icon" width="36" height="30" aria-hidden="true">
            <use xlinkHref="#icon-adventure"></use>
          </svg><span className="filter__label-text">Приключения</span>
        </label>
      </li>
      <li className="filter__item">
        <input type="radio" name="type" id="horror" />
        <label className="filter__label" htmlFor="horror">
          <svg className="filter__icon" width="30" height="30" aria-hidden="true">
            <use xlinkHref="#icon-horror"></use>
          </svg><span className="filter__label-text">Ужасы</span>
        </label>
      </li>
      <li className="filter__item">
        <input type="radio" name="type" id="mystic" />
        <label className="filter__label" htmlFor="mystic">
          <svg className="filter__icon" width="30" height="30" aria-hidden="true">
            <use xlinkHref="#icon-mystic"></use>
          </svg><span className="filter__label-text">Мистика</span>
        </label>
      </li>
      <li className="filter__item">
        <input type="radio" name="type" id="detective" />
        <label className="filter__label" htmlFor="detective">
          <svg className="filter__icon" width="40" height="30" aria-hidden="true">
            <use xlinkHref="#icon-detective"></use>
          </svg><span className="filter__label-text">Детектив</span>
        </label>
      </li>
      <li className="filter__item">
        <input type="radio" name="type" id="sciFi" />
        <label className="filter__label" htmlFor="sciFi">
          <svg className="filter__icon" width="28" height="30" aria-hidden="true">
            <use xlinkHref="#icon-sci-fi"></use>
          </svg><span className="filter__label-text">Sci-fi</span>
        </label>
      </li>
    </>
  );
}

export default FiltersTypeItem;
