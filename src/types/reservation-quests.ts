import { DateSlot } from '../const';
import { QuestLocation } from './booking';
import { Quest } from './quests';

export type ReservationQuest = {
  date: DateSlot;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  id: string;
  location: QuestLocation;
  quest: Quest;
}
