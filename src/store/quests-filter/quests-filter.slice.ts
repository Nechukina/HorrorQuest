import { createSlice } from '@reduxjs/toolkit';
import { LevelFilter, NameSpace } from '../../const';
import { TypeFilter } from '../../const';
// import { Quests } from '../../types/quests-data';


export type QuestsFilterSlice = {
  activeType: string;
  activeLevel: string;
//   filteredQuests: Quests;
}

export const initialState: QuestsFilterSlice = {
  activeType: TypeFilter['all-types'],
  activeLevel: LevelFilter.any,
//   filteredQuests: [],
};


export const questsFilterSlice = createSlice({
  name: NameSpace.Filter,
  initialState,
  reducers: {
    chooseType(state, action: { payload: string }) {
      state.activeType = action.payload;
    },
    chooseLevel(state, action: { payload: string }) {
      state.activeLevel = action.payload;
    }
  },
});

export const { chooseType, chooseLevel } = questsFilterSlice.actions;
