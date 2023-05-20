import { NameSpace, Status } from '../../const';
import { ReservationQuest } from '../../types/reservation-quests';
import { State } from '../../types/state';


export const getReservationQuests = (state: State): ReservationQuest[] => state[NameSpace.Reservation].quests;
export const getStatus = (state: State): Status => state[NameSpace.Reservation].status;
