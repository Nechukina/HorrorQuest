import FiltersLevelItem from './filters-level-item';

function FiltersLevelList(): JSX.Element {
  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">Сложность</legend>
      <ul className="filter__list">
        <FiltersLevelItem />
      </ul>
    </fieldset>
  );
}

export default FiltersLevelList;
