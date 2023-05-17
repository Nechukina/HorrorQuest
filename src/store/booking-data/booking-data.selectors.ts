import { NameSpace, Status } from '../../const';
import { BookingQuests } from '../../types/booking-data';
import { State } from '../../types/state';


export const getBookingQuests = (state: State): BookingQuests => state[NameSpace.Booking].bookingQuest;
export const getStatus = (state: State): Status => state[NameSpace.Quests].status;
