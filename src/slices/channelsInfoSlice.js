/* eslint-disable */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

const DEFAULT_CHANNEL = 1;

export const getChannels = createAsyncThunk('channelsInfo/setInitialState', async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(routes.dataPath(), config);
    const { data } = response;
    return data;
  } catch (e) {
    throw new Error('Упс.. Что-то пошло не так.');
  }
});

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    createNewChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    deleteChannel: (state, { payload }) => {
      state.channels = state.channels.filter((channel) => channel.id !== payload);
      if (state.currentChannelId === payload) {
        state.currentChannelId = DEFAULT_CHANNEL;
      }
    },
    renameChannel: (state, { payload }) => {
      state.channels = state.channels.map((channel) => (channel.id === payload.id ? { ...channel, name: payload.name } : channel));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getChannels.fulfilled, (state, { payload }) => {
        state.channels = payload.channels;
        state.currentChannelId = payload.currentChannelId;
        state.status = 'success';
        state.error = null;
      })
      .addCase(getChannels.rejected, (state, { error }) => {
        state.loading = 'error';
        state.error = error.message;
      });
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
