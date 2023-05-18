import { LevelFilter, TypeFilter } from '../../const';
import { Quests } from '../../types/quests-data';


function useGetFilteredQuests(quests: Quests, type: string, level: string): Quests {
  let filteredQuests: Quests = [];

  if (type === TypeFilter['all-types']) {
    filteredQuests = quests.filter((quest) =>
      LevelFilter[quest.level] === level);
  } else if (level === LevelFilter.any) {
    filteredQuests = quests.filter((quest) =>
      TypeFilter[quest.type] === type);
  } else {
    filteredQuests = quests.filter((quest) =>
      LevelFilter[quest.level] === level && TypeFilter[quest.type] === type);
  }

  return filteredQuests;
}

export default useGetFilteredQuests;
