// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import propertyReducer from './ApiResponse/propertySlice';
import {thunk} from 'redux-thunk'; // Import the thunk middleware
const store = configureStore({
  reducer: {
  
    property: propertyReducer,
  },
});

export default store;
