import { NameSpace, Status } from '../../const';
import { BookingQuest, BookingQuests } from '../../types/booking-data';
import { State } from '../../types/state';


export const getBookingQuests = (state: State): BookingQuests => state[NameSpace.Booking].bookingQuest;
export const getCurrentQuest = (state: State): BookingQuest | null => state[NameSpace.Booking].currentQuest;
export const getStatus = (state: State): Status => state[NameSpace.Quests].status;
