/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsInfoSlice.js';
export const dropDownSlice = createSlice({
  name: 'dropDown',
  initialState: {
    isOpened: false,
    channelId: null,
  },
  reducers: {
    openDropDown(state, { payload }) {
      if (payload === state.channelId) {
        state.isOpened = !state.isOpened;
      } else {
        state.channelId = payload,
        state.isOpened = true;
      }
    },
    closeDropDown(state) {
      state.isOpened = false;
      state.channelId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.setCurrentChannel, (state) => {
        state.isOpened = false
      });
  },
});

export const { actions } = dropDownSlice;

export default dropDownSlice.reducer;
