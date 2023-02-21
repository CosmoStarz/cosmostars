import { useLocation, useNavigate } from "react-router-dom";
import { BasicLayout } from "../../shared/layouts/BasicLayout";
import { SignUp } from "../../features/Auth/SignUp";
import { RoutesName } from "../../shared/constants";
import { useSignUpMutation } from "../../shared/api/auth/auth";
export const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const handleSignUp = async userForm => {
    await signUp(userForm);
    console.log(userForm);
    navigate(location?.state?.from ?? RoutesName.LOGIN);
  };
  return (
    <BasicLayout>
      <SignUp handleSignUp={handleSignUp} />
    </BasicLayout>
  );
};
