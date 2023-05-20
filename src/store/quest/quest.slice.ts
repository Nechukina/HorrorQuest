import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { QuestData } from '../../types/quests';
import { fetchQuestAction } from '../api-actions';

export type QestSlice = {
  quest: QuestData | null;
  status: Status;
};

const initialState: QestSlice = {
  quest: null,
  status: Status.Idle
};

export const questSlice = createSlice({
  name: NameSpace.Quest,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchQuestAction.fulfilled, (state, action) => {
        state.quest = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchQuestAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
