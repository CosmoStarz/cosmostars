import { useLocation, useNavigate } from "react-router-dom";

import { SignUp } from "@/features/Auth/SignUp";
import { useSignUpMutation } from "@/shared/api/auth/auth";
import { RoutesName } from "@/shared/constants";
import { BasicLayout } from "@/shared/layouts/BasicLayout";
export const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const handleSignUp = async userForm => {
    try {
      await signUp(userForm);
      navigate(location?.state?.from ?? RoutesName.LOGIN);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BasicLayout>
      <SignUp handleSignUp={handleSignUp} />
    </BasicLayout>
  );
};
