import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { questSlice } from './quest-data/quest-data.slice';
import { questsSlice } from './quests-data/quests-data.slice';
import { userProcessSlice } from './user-process/user-process.slice';
import { bookingSlice } from './booking-data/booking-data.slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcessSlice.reducer,
  [NameSpace.Quest]: questSlice.reducer,
  [NameSpace.Quests]: questsSlice.reducer,
  [NameSpace.Booking]: bookingSlice.reducer,
});
