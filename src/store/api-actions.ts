import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData, UserData } from '../types/user-process';
import { ThunkOptions } from '../types/state';
import axios from 'axios';
import { AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { toast } from 'react-toastify';
import { redirectToRoute } from './actions';
import { Quest, QuestData, Quests } from '../types/quests-data';


export const checkAuthAction = createAsyncThunk<UserData, undefined, ThunkOptions>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(AppRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData | void, AuthData, ThunkOptions>(
  'user/login',
  async ({email, password}, { dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserData>(`${AppRoute.Login}`, {email, password});
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.Main));
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/logout',
  async (_arg, { extra: api}) => {
    try {
      await api.delete(`${AppRoute.Logout}`);
      dropToken();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      }
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
      // dispatch(pushNotification({ type: 'error', message: 'Failed to load offer data' }));
      if (axios.isAxiosError(err)) {
        toast.error(err.message);
      }
      throw err;
    }
  }
);

export const fetchQuestsAction = createAsyncThunk<Quests, undefined, ThunkOptions>(
  'data/fetchQuests',
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<Quest[]>(AppRoute.Quest);

      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.message);
      }
      throw err;
    }
  }
);
