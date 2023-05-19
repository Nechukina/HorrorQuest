import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BookingQuest, BookingQuests } from '../../types/booking-data';
import { NameSpace, Status } from '../../const';
import { fetchBookingQuestsAction } from '../api-actions';

export type BookingSlice = {
  bookingQuest: BookingQuests;
  currentQuest: BookingQuest | null;
  status: Status;
};

const initialState: BookingSlice = {
  bookingQuest: [],
  currentQuest: null,
  status: Status.Idle
};

export const bookingSlice = createSlice({
  name: NameSpace.Booking,
  initialState,
  reducers: {
    changeCurrentPlace: (state, action: PayloadAction<BookingQuest>) => {
      state.currentQuest = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBookingQuestsAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchBookingQuestsAction.fulfilled, (state, action) => {
        state.bookingQuest = action.payload;
        state.currentQuest = action.payload[0];
        state.status = Status.Success;
      })
      .addCase(fetchBookingQuestsAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});

export const {changeCurrentPlace} = bookingSlice.actions;

