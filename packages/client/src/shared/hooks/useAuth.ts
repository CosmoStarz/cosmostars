import { useState } from "react";
import { useSelector } from "react-redux";

import { useLazyGetUserQuery } from "@/entities/user/model/api";
import {
  resetAuth,
  selectIsAuth,
  setIsAuth,
  setUser,
} from "@/entities/user/model/user";
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
import { useAppDispatch } from "./store";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [getUser] = useLazyGetUserQuery();
  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();
  const [logout] = useLogoutMutation();
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const checkIsUserAuth = async () => {
    setIsLoadingAuth(true);
    try {
      const { isSuccess, data } = await getUser();
      dispatch(setIsAuth(isSuccess));
      if (isSuccess) {
        dispatch(setUser(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingAuth(false);
    }
  };
  const signInAuth = async (userForm: SignInRequest) => {
    const { data, error } = (await signIn(
      userForm
    )) as unknown as SignInResponse;

    if (data) {
      checkIsUserAuth();
    } else {
      console.log(error);
    }
  };

  const signUpAuth = async (userForm: SignUpRequest) => {
    const { error } = (await signUp(userForm)) as unknown as SignUpResponse;

    if (error) {
      console.log(error);
    } else {
      checkIsUserAuth();
    }
  };

  const logoutAuth = async () => {
    await logout("");
    dispatch(resetAuth());
  };
  return {
    logoutAuth,
    signUpAuth,
    signInAuth,
    checkIsUserAuth,
    isLoadingAuth,
    isAuth,
  };
};
