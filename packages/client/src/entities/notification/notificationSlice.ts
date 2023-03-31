import { createSlice } from "@reduxjs/toolkit";

import { NotificationTypes } from "./types";

type NotificationState = {
  id: string | null;
  type: NotificationTypes | null;
  text: string;
};
const initialState: NotificationState = { id: null, type: null, text: "" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, { payload: { id, type, text } }) => {
      return { ...state, id, type, text };
    },
    clearNotification: () => {
      return initialState;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
