import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    type: null,
    text: "",
  },
  reducers: {
    setNotification: (state, { payload: { type, text } }) => {
      state.type = type;
      state.text = text;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
