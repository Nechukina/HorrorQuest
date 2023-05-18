function FiltersLevelItem(): JSX.Element {
  return (
    <>
      <li className="filter__item">
        <input type="radio" name="level" id="any" />
        <label className="filter__label" htmlFor="any"><span className="filter__label-text">Любой</span>
        </label>
      </li>
      <li className="filter__item">
        <input type="radio" name="level" id="easy" />
        <label className="filter__label" htmlFor="easy"><span className="filter__label-text">Лёгкий</span>
        </label>
      </li>
      <li className="filter__item">
        <input type="radio" name="level" id="middle" />
        <label className="filter__label" htmlFor="middle"><span className="filter__label-text">Средний</span>
        </label>
      </li>
      <li className="filter__item">
        <input type="radio" name="level" id="hard" />
        <label className="filter__label" htmlFor="hard"><span className="filter__label-text">Сложный</span>
        </label>
      </li>
    </>
  );
}

export default FiltersLevelItem;

