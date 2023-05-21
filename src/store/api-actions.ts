import { createAsyncThunk } from '@reduxjs/toolkit';
import { generatePath } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { APIRoute, AppRoute } from '../const';
import { AuthData, UserData } from '../types/user-process';
import { BookingData, BookingPostData } from '../types/booking-form';
import { BookingQuests } from '../types/booking';
import { dropToken, saveToken } from '../services/token';
import { pushNotification } from './notifications/notifications.slice';
import { Quest, QuestData, Quests } from '../types/quests';
import { redirectToRoute } from './actions';
import { ReservationQuest } from '../types/reservation-quests';
import { ThunkOptions } from '../types/state';


export const checkAuthAction = createAsyncThunk<UserData, undefined, ThunkOptions>(
  'user/checkAuth',
  async (_arg, { extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      return data;
    } catch {
      throw new Error();
    }
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData & {onSuccess: () => void}, ThunkOptions>(
  'user/login',
async ({email, password, onSuccess}, { dispatch, extra: api}) => {
  try {
    const {data} = await api.post<UserData>(`${APIRoute.Login}`, {email, password});
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
      await api.delete(`${APIRoute.Logout}`);
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
      const { data } = await api.get<QuestData>(generatePath(APIRoute.Quest, { questId: questId.toString() }));

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
      const { data } = await api.get<Quest[]>(APIRoute.Quests);

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

      const { data } = await api.get<BookingQuests>(generatePath(APIRoute.Booking, { id: questId.toString() }));

      return data;
    } catch (err) {

      dispatch(pushNotification({ type: 'error', message: 'Не удалось загрузить информацию о бронировании квестов' }));
      throw err;
    }
  }
);

export const postBookingQuestAction = createAsyncThunk<BookingData, BookingPostData & {onSuccess: () => void}, ThunkOptions>(
  'data/postBookingQuest',
async ({ questId, bookingData, onSuccess }, { dispatch, extra: api }) => {
  try {
    const { data } = await api.post<BookingData>(generatePath(APIRoute.Booking, { id: questId.toString() }), bookingData);
    dispatch(pushNotification({ type: 'success', message: 'Квест забронирован!' }));
    dispatch(redirectToRoute(AppRoute.Reservation));
    onSuccess();
    return data;
  } catch (err) {
    dispatch(pushNotification({ type: 'error', message: 'Ошибка бронирования квеста' }));
    throw err;
  }
}
);

export const fetchReservationQuestsAction = createAsyncThunk<ReservationQuest[], undefined, ThunkOptions>(
  'data/fetchReservationQuests',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<ReservationQuest[]>(APIRoute.Reservation);

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Ошибка загрузки забронированных квестов' }));
      throw err;
    }
  }
);

export const deleteReservationQuestAction = createAsyncThunk<string, string, ThunkOptions>(
  'data/deleteReservationQuest',
  async (placeId, { dispatch, extra: api }) => {
    try {
      await api.delete(`${APIRoute.Reservation}/${placeId}`);
      dispatch(pushNotification({ type: 'info', message: 'Бронирование удалено' }));

      return placeId;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Ошибка удаления бронирования' }));
      throw err;
    }
  }
);
