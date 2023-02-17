import { useLocation, useNavigate } from "react-router-dom";

import { SignIn } from "@/features/Auth/SignIn";
import { RoutesName } from "@/shared/constants";
import { BasicLayout } from "@/shared/layouts/BasicLayout";

export const SignInPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate(location?.state?.from ?? RoutesName.MAIN);
  };
  return (
    <BasicLayout>
      <SignIn handleSignIn={handleSignIn} />
    </BasicLayout>
  );
};
