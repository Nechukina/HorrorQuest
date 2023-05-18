import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getLevel } from '../../../store/quests-filter/quests-filter.selectors';
import { chooseLevel } from '../../../store/quests-filter/quests-filter.slice';

type FiltersLevelItemProps = {
  level: string;
}

function FiltersLevelItem({level}: FiltersLevelItemProps): JSX.Element {

  const activeLevel = useAppSelector(getLevel);
  const dispatch = useAppDispatch();
  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    dispatch(chooseLevel(level));
  };

  return (
    <li className="filter__item">
      <input type="radio" name="level" id={level} checked={level === activeLevel} onChange={handleChange}/>
      <label className="filter__label" htmlFor={level}><span className="filter__label-text">{level}</span>
      </label>
    </li>
  );
}

export default FiltersLevelItem;

