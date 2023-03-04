import { useState } from "react";
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
import { useAppDispatch } from "./store";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const [getUser] = useLazyGetUserQuery();
  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();
  const [logout] = useLogoutMutation();

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
    const data = await signIn(userForm);
    if ((data as unknown as SignInResponse).error.data === "OK") {
      checkIsUserAuth();
    }
  };

  const signUpAuth = async (userForm: SignUpRequest) => {
    const response = await signUp(userForm);
    // приводится к типу unknown, т.к в базовых типах нет поле data
    // из-за этого TS выдает ошибку
    if ((response as unknown as SignUpResponse).data.id) {
      checkIsUserAuth();
    }
  };

  const logoutAuth = async () => {
    await logout("");
    await checkIsUserAuth();
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
