import { NameSpace, Status } from '../../const';
import { QuestData } from '../../types/quests';
import { State } from '../../types/state';

export const getQuest = (state: State): QuestData | null => state[NameSpace.Quest].quest;
export const getStatus = (state: State): Status => state[NameSpace.Quest].status;
