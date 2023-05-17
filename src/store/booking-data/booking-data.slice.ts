import { createSlice } from '@reduxjs/toolkit';
import { BookingQuests } from '../../types/booking-data';
import { NameSpace, Status } from '../../const';
import { fetchBookingQuestsAction } from '../api-actions';

export type BookingSlice = {
  bookingQuest: BookingQuests;
  status: Status;
};

const initialState: BookingSlice = {
  bookingQuest: [],
  status: Status.Idle
};

export const bookingSlice = createSlice({
  name: NameSpace.Booking,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBookingQuestsAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchBookingQuestsAction.fulfilled, (state, action) => {
        state.bookingQuest = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchBookingQuestsAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
