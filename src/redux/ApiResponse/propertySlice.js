


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const fetchProperties = createAsyncThunk('property/fetchProperties', async (location, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/v1/property/get-all-properties`);
    return response?.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return rejectWithValue(error.message);
  }
});

export const fetchPropertyLocations = createAsyncThunk('property/fetchPropertyLocations', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/v1/master/property/get-all-property-locations`);
    return response?.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return rejectWithValue(error.message);
  }
});

const initialState = {
  properties: [],
  locations: [],
  location: '',
  loading: true,
  error: null,
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
        state.error = null;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPropertyLocations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPropertyLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
        state.error = null;
      })
      .addCase(fetchPropertyLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLocation, setLoading } = propertySlice.actions;
export default propertySlice.reducer;
