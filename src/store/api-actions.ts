import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData, UserData } from '../types/user-process';
import { AppDispatch, State } from './state';
import axios, { AxiosInstance } from 'axios';
import { AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { toast } from 'react-toastify';


export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(AppRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData | void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, { extra: api}) => {
    try {
      const {data} = await api.post<UserData>('login', {email, password});
      saveToken(data.token);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api}) => {
    try {
      await api.delete('logout');
      dropToken();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  },
);
