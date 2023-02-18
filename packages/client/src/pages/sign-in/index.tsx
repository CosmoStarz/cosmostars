import { useLocation, useNavigate } from "react-router-dom";
import { BasicLayout } from "@/shared/layouts/BasicLayout";
import { SignIn } from "@/features/Auth/SignIn";
import { RoutesName } from "@/shared/constants";

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
