import FiltersTypeItem from './filters-type-item';

function FiltersTypeList(): JSX.Element {
  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">Тематика</legend>
      <ul className="filter__list">
        <FiltersTypeItem />
      </ul>
    </fieldset>
  );
}

export default FiltersTypeList;
