import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAppointment = createAsyncThunk('reservation/getReservation', async (doctorId, thunkAPI) => axios.get(`http://localhost:4000/api/v1/doctors/${doctorId}/appointments`)
  .then((res) => res.data)
  .catch((err) => thunkAPI.rejectWithValue(err)));

export const postData = createAsyncThunk('reservation/postData', async (appointment, thunkAPI) => axios.post(`http://localhost:4000/api/v1/doctors/${appointment.docId}/appointments`, appointment, {
  headers: {
    'Content-type': 'application/json',
    // eslint-disable-next-line quote-props
    'Authorization': localStorage.getItem('token'),
  },
  body: JSON.stringify(appointment),
}).then((response) => response.data).catch((err) => thunkAPI.rejectWithValue(err)));

const initialState = {
  reservation: [],
  isLoading: true,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {},
  extraReducers: {
    [getAppointment.pending]: (state) => {
      state.isLoading = true;
    },
    [getAppointment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [getAppointment.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { addAppointment, removeAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
