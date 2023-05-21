import {combineReducers} from '@reduxjs/toolkit';
import { bookingSlice } from './booking/booking.slice';
import { NameSpace } from '../const';
import { notificationsSlice } from './notifications/notifications.slice';
import { questSlice } from './quest/quest.slice';
import { questsSlice } from './quests/quests.slice';
import { questsFilterSlice } from './quests-filter/quests-filter.slice';
import { reservationQuestsSlice } from './reservation-quests/reservation-quests.slice';
import { userProcessSlice } from './user-process/user-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcessSlice.reducer,
  [NameSpace.Quest]: questSlice.reducer,
  [NameSpace.Quests]: questsSlice.reducer,
  [NameSpace.Booking]: bookingSlice.reducer,
  [NameSpace.Notification]: notificationsSlice.reducer,
  [NameSpace.Filter]: questsFilterSlice.reducer,
  [NameSpace.Reservation]: reservationQuestsSlice.reducer
});
