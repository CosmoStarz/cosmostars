import { Middleware } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store/types";

import { actions } from "./config";
import { setNotification } from "./notificationSlice";
import { NotificationTypes } from "./types";

export const notificationMiddleware: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  next =>
  action => {
    if (actions.includes(action.type)) {
      console.log(action.payload);
      dispatch(
        setNotification({
          id: action.meta.requestId,
          type: NotificationTypes.ERROR,
          text: action.payload,
        })
      );
    }
    next(action);
  };
