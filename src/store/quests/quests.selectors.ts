import { NameSpace, Status } from '../../const';
import { Quests } from '../../types/quests';
import { State } from '../../types/state';

export const getQuests = (state: State): Quests => state[NameSpace.Quests].quests;
export const getStatus = (state: State): Status => state[NameSpace.Quests].status;
//TODO: rename -data
