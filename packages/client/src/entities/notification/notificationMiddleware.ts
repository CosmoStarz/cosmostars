import { Middleware } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store/types";

import { actions, DEFAULT_ERROR_TEXT } from "./config";
import { setNotification } from "./notificationSlice";
import { NotificationTypes } from "./types";

export const notificationMiddleware: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  next =>
  action => {
    if (actions.includes(action.type)) {
      let text: string;
      if (typeof action.payload !== "string") {
        text = DEFAULT_ERROR_TEXT;
      } else {
        text = action.payload;
      }
      dispatch(
        setNotification({
          id: action.meta.requestId,
          type: NotificationTypes.ERROR,
          text,
        })
      );
    }
    next(action);
  };
