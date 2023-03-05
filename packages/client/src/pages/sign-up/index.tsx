import { useLocation, useNavigate } from "react-router-dom";

import { SignUp } from "@/features/Auth/SignUp";
import { useSignUpMutation } from "@/shared/api/auth/auth";
import { SignUpRequest } from "@/shared/api/auth/models";
import { SignUpResponse } from "@/shared/api/auth/models";
import { RoutesName } from "@/shared/constants";
import { BasicLayout } from "@/shared/layouts/BasicLayout";
export const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const handleSignUp = async (userForm: SignUpRequest) => {
    const response = await signUp(userForm);
    // приводится к типу unknown, т.к в базовых типах нет поле data
    // из-за этого TS выдает ошибку
    if ((response as unknown as SignUpResponse).data.id) {
      navigate(location?.state?.from ?? RoutesName.MAIN);
    }
  };
  return (
    <BasicLayout>
      <SignUp handleSignUp={handleSignUp} />
    </BasicLayout>
  );
};
