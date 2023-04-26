import { SignInResponse } from "@/shared/api/auth/models";
import {
  useLazyGetServiceIDQuery,
  useSignInYandexOAuthMutation,
} from "@/shared/api/oauth/oauth";
import { REDIRECT_URI } from "@/shared/constants/api";
import { useAuth } from "@/shared/hooks/useAuth";

export const useOAuth = () => {
  const [getServiceID] = useLazyGetServiceIDQuery();
  const [signInYandexOAuth] = useSignInYandexOAuthMutation();
  const { checkIsUserAuth } = useAuth();
  const yandexOAuth = async (code: string) => {
    const body = {
      code: code,
      redirect_uri: REDIRECT_URI,
    };
    const { data, error } = (await signInYandexOAuth(
      body
    )) as unknown as SignInResponse;
    if (data) {
      checkIsUserAuth();
    } else {
      console.log(error);
    }
  };
  const handleYandexOAuth = async () => {
    const response = await getServiceID(REDIRECT_URI);
    const CLIENT_ID = response.data.service_id;
    window.location.assign(
      `https://oauth.yandex.ru/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
    );
  };

  return {
    yandexOAuth,
    handleYandexOAuth,
  };
};
