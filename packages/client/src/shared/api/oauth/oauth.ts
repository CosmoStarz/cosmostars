import { Method, OAUTH } from "@/shared/constants/api";

import { getErrorReason } from "../utils";
import { yandexApi } from "../yandexApi";

const OAUTH_URL = {
  SERVICE_ID: `${OAUTH}/service-id`,
};

export const oauthApi = yandexApi.injectEndpoints({
  endpoints: builder => ({
    signInYandexOAuth: builder.mutation({
      query: signInYandexOAuthRequest => ({
        url: OAUTH,
        method: Method.POST,
        body: signInYandexOAuthRequest,
        credentials: "include",
        responseHandler: "content-type",
      }),
      transformErrorResponse(response) {
        return getErrorReason(response);
      },
    }),
    getServiceID: builder.query({
      query: redirect_uri => ({
        url: OAUTH_URL.SERVICE_ID,
        params: { redirect_uri: redirect_uri },
        responseHandler: "content-type",
      }),
    }),
  }),
});

export const { useSignInYandexOAuthMutation, useLazyGetServiceIDQuery } =
  oauthApi;
