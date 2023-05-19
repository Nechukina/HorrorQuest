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
import { BookingData, BookingPostData } from '../types/booking-form-data';
import { redirectToRoute } from './actions';


export const checkAuthAction = createAsyncThunk<UserData, undefined, ThunkOptions>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(AppRoute.Login);
      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Доступ к странице закрыт. Пожалуйста, авторизуйтесь' }));
      throw err;
    }
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData & {onSuccess: () => void}, ThunkOptions>(
  'user/login',
async ({email, password, onSuccess}, { dispatch, extra: api}) => {
  try {
    const {data} = await api.post<UserData>(`${AppRoute.Login}`, {email, password});
    saveToken(data.token);
    onSuccess();
    dispatch(pushNotification({ type: 'success', message: 'Авторизация успешна' }));
    return data;
  } catch (err) {
    dispatch(pushNotification({ type: 'error', message: 'Ошибка авторизации' }));
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
      dispatch(pushNotification({ type: 'error', message: 'Ошибка завершения сессии. Попробуйте снова' }));
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
      dispatch(pushNotification({ type: 'error', message: 'Не удалось загрузить информацию о квесте' }));
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
      dispatch(pushNotification({ type: 'error', message: 'Не удалось загрузить информацию о квестах' }));

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
      dispatch(pushNotification({ type: 'error', message: 'Не удалось загрузить информацию о квестах' }));
      throw err;
    }
  }
);

export const postBookingQuestAction = createAsyncThunk<BookingData, BookingPostData, ThunkOptions>(
  'data/postBookingQuest',
  async ({ questId, bookingData }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<BookingData>(generatePath(AppRoute.Booking, { id: questId.toString() }), bookingData);
      dispatch(pushNotification({ type: 'success', message: 'Квест забронирован!' }));
      dispatch(redirectToRoute(AppRoute.Reservation));
      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Ошибка бронирования квеста' }));
      throw err;
    }
  }
);
