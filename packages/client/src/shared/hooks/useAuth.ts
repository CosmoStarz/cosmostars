import { useSelector } from "react-redux";

import { useLazyGetUserQuery } from "@/entities/user/model/api";
import { selectIsAuth, setIsAuth, setUser } from "@/entities/user/model/user";
import {
  useLogoutMutation,
  useSignInMutation,
  useSignUpMutation,
} from "@/shared/api/auth/auth";

import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "../api/auth/models";
import { getErrorReason } from "../api/utils";
import { useAppDispatch } from "./store";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [getUser] = useLazyGetUserQuery();
  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();
  const [logout] = useLogoutMutation();

  const checkIsUserAuth = async () => {
    try {
      const { isSuccess, data } = await getUser();
      dispatch(setIsAuth(isSuccess));
      if (isSuccess) {
        dispatch(setUser(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const signInAuth = async (userForm: SignInRequest) => {
    const { error } = (await signIn(userForm)) as unknown as SignInResponse;
    // сделан костыль т.к яндекс возвращает строку ОК на успех
    if (error.data === "OK") {
      checkIsUserAuth();
    } else {
      const textError = getErrorReason(error);
      console.log(textError);
    }
  };

  const signUpAuth = async (userForm: SignUpRequest) => {
    const { error } = (await signUp(userForm)) as unknown as SignUpResponse;

    if (error) {
      const textError = getErrorReason(error);
      console.log(textError);
    } else {
      checkIsUserAuth();
    }
  };

  const logoutAuth = async () => {
    await logout("");
    dispatch(setUser(undefined));
    dispatch(setIsAuth(false));
  };
  return {
    logoutAuth,
    signUpAuth,
    signInAuth,
    checkIsUserAuth,
    isAuth,
  };
};
