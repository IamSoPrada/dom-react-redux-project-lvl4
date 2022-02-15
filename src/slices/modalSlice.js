/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
    channelId: null,
  },
  reducers: {
    openModal(state, { payload }) {
      state.type = payload.type,
      state.channelId = payload.id,
      state.isOpened = true;
    },
    closeModal(state) {
      state.type = null;
      state.isOpened = false;
      state.channelId = null;
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
