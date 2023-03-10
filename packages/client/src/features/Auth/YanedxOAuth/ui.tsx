import { IconButton, Typography } from "@mui/material";
import { useEffect } from "react";

import { SignInResponse } from "@/shared/api/auth/models";
import {
  useLazyGetServiceIDQuery,
  useSignInYandexOAuthMutation,
} from "@/shared/api/oauth/oauth";
import { OK_RESPONSE } from "@/shared/constants/api";
import { REDIRECT_URI } from "@/shared/constants/api";
import { useAuth } from "@/shared/hooks/useAuth";
export const YandexOAuth = () => {
  const [getServiceID] = useLazyGetServiceIDQuery();
  const [signInYandexOAuth] = useSignInYandexOAuthMutation();
  const { checkIsUserAuth } = useAuth();
  useEffect(() => {
    async function yandexOauth() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const codeParam = urlParams.get("code");
      const body = {
        code: codeParam,
        redirect_uri: REDIRECT_URI,
      };
      if (codeParam) {
        const { data, error } = (await signInYandexOAuth(
          body
        )) as unknown as SignInResponse;
        if (data === OK_RESPONSE) {
          checkIsUserAuth();
        } else {
          console.log(error);
        }
      }
    }
    yandexOauth();
  }, []);
  const handleYandexOAuth = async () => {
    const response = await getServiceID(REDIRECT_URI);
    const CLIENT_ID = response.data.service_id;
    window.location.assign(
      `https://oauth.yandex.ru/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
    );
  };
  return (
    <IconButton
      aria-label="logout-icon"
      size="small"
      sx={{
        mx: 2,
      }}
      onClick={handleYandexOAuth}>
      <Typography>Yandex</Typography>
    </IconButton>
  );
};
