/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { getChannels, actions as channelsActions } from './channelsInfoSlice.js';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, { payload }) {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      })
      .addCase(channelsActions.deleteChannel, (state, { payload }) => {
        state.messages = state.messages.filter(({ channelId }) => channelId !== payload);
      });
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
