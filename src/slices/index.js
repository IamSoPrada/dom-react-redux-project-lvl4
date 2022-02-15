import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsInfoSlice.js';
import messagesReducer from './messagesInfoSlice.js';
import modalReducer from './modalSlice.js';
import dropDownReducer from './dropDownSlice.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
    modal: modalReducer,
    dropDown: dropDownReducer,
  },
});
