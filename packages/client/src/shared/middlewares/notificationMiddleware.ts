import { Middleware } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store/types";

import { setNotification } from "../slices/notificationSlice";
import { NotificationTypes } from "../slices/types";

export const notificationMiddleware: Middleware<unknown, RootState> =
  ({ dispatch, getState }) =>
  next =>
  action => {
    if (action.type === "yandexApi/executeQuery/rejected") {
      console.log(action.payload);
      dispatch(
        setNotification({ type: NotificationTypes.ERROR, text: action.payload })
      );
    }
    next(action);
  };
