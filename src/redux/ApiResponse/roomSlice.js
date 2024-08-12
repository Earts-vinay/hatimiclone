import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchRoomData = createAsyncThunk('room/fetchRooms', async (payload, { rejectWithValue }) => {
    try {
        const { propertyId, bookingData } = payload;

        if (!bookingData || !bookingData.dateRange || !bookingData.dateRange.startDate || !bookingData.dateRange.endDate) {
            console.error("Booking data or date range is missing or invalid.");
            return rejectWithValue("Booking data or date range is missing or invalid.");
        }

        const formattedCheckin = moment(bookingData.dateRange.startDate, "ddd Do MMM").format("YYYY-MM-DD");
        const formattedCheckout = moment(bookingData.dateRange.endDate, "ddd Do MMM").format("YYYY-MM-DD");

        const obj = {
            startDate: formattedCheckin,
            endDate: formattedCheckout,
            adults: bookingData.adults,
            children: bookingData.children,
            no_of_rooms: bookingData.roomCount,
        }
        const response = await axios.post(`${BASE_URL}/v1/property/room/get-rooms-info/${propertyId}`, obj);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return rejectWithValue(error.message);
    }
});

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        loading: false,
        error: null,
        availableRooms: [],
        soldOutRooms: [],
        propertyData: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoomData.fulfilled, (state, action) => {
                const { availableRooms, soldOutRooms, propertyData } = action.payload;
                state.availableRooms = availableRooms || []
                state.soldOutRooms = soldOutRooms || []
                state.propertyData = propertyData || null
                state.loading = false;
            })
            .addCase(fetchRoomData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { } = roomSlice.actions;
export const roomReducer = roomSlice.reducer;
