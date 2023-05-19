import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData, UserData } from '../types/user-process';
import { ThunkOptions } from '../types/state';
import { AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { Quest, QuestData, Quests } from '../types/quests-data';
import { BookingQuests } from '../types/booking-data';
import { generatePath } from 'react-router-dom';
import { pushNotification } from './notifications/notifications.slice';
import 'react-toastify/dist/ReactToastify.css';


export const checkAuthAction = createAsyncThunk<UserData, undefined, ThunkOptions>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(AppRoute.Login);
      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'You do not have permission to this page. Please, log in' }));
      throw err;
    }
  }
);

export const loginAction = createAsyncThunk<UserData | void, AuthData, ThunkOptions>(
  'user/login',
  async ({email, password}, { dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserData>(`${AppRoute.Login}`, {email, password});
      saveToken(data.token);
      dispatch(pushNotification({ type: 'success', message: 'Login success' }));
      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Login failed' }));
      throw err;
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/logout',
  async (_arg, { dispatch ,extra: api}) => {
    try {
      await api.delete(`${AppRoute.Logout}`);
      dropToken();
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Logout failed' }));
      throw err;
    }
  },
);

export const fetchQuestAction = createAsyncThunk<QuestData, string, ThunkOptions>(
  'data/fetchQuest',
  async (questId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<QuestData>(`${AppRoute.Quest}/${questId}`);

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Failed to load quest data' }));
      throw err;
    }
  }
);

export const fetchQuestsAction = createAsyncThunk<Quests, undefined, ThunkOptions>(
  'data/fetchQuests',
  async (_arg, { dispatch ,extra: api }) => {
    try {
      const { data } = await api.get<Quest[]>(AppRoute.Quest);

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Failed to load quests data' }));

      throw err;
    }
  }
);

export const fetchBookingQuestsAction = createAsyncThunk<BookingQuests, string, ThunkOptions>(
  'data/fetchBookingQuests',
  async (questId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<BookingQuests>(generatePath(AppRoute.Booking, { id: questId.toString() }));

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Failed to load booking quests data' }));
      throw err;
    }
  }
);
