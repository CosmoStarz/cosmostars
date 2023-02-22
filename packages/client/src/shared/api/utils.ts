import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { ErrorResponse } from "./types";

export const getErrorReason = (response: FetchBaseQueryError) => {
  return (response.data as ErrorResponse)?.reason;
};
