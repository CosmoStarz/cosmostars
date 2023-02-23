import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BasicLayout } from "@/shared/layouts/BasicLayout";
import { SignIn } from "@/features/Auth/SignIn";
import { RoutesName } from "@/shared/constants";
import { useSignInMutation } from "@/shared/api/auth/auth";
import { authModel } from "@/entities/auth";

export const SignInPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();
  const handleSignIn = userForm => {
    try {
      signIn(userForm);
      dispatch(authModel.authSlice.setCredentials());
      navigate(location?.state?.from ?? RoutesName.MAIN);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BasicLayout>
      <SignIn handleSignIn={handleSignIn} />
    </BasicLayout>
  );
};
