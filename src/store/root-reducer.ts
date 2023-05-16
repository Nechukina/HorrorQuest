import {combineReducers} from '@reduxjs/toolkit';
import { userProcessSlice } from './user-process/user-process.slice';
import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcessSlice.reducer,
});
