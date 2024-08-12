// store.js
import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './ApiResponse/propertySlice';
import { roomReducer } from './ApiResponse/roomSlice';

const store = configureStore({
  reducer: {
    property: propertyReducer,
    room: roomReducer,
  },
});

export default store;
