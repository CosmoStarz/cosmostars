import { useLocation, useNavigate } from "react-router-dom";

import { SignUp } from "@/features/Auth/SignUp";
import { RoutesName } from "@/shared/constants";
import { BasicLayout } from "@/shared/layouts/BasicLayout";

export const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate(location?.state?.from ?? RoutesName.LOGIN);
  };
  return (
    <BasicLayout>
      <SignUp handleSignUp={handleSignUp} />
    </BasicLayout>
  );
};
