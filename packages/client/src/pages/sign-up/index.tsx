import { SignUp } from "@/features/Auth/SignUp";
import { useAuth } from "@/shared/hooks/useAuth";
import { BasicLayout } from "@/shared/layouts/BasicLayout";

export const SignUpPage = () => {
  // const { signUpAuth } = useAuth();
  // eslint-disable-next-line
  const signUpAuth = () => {};
  return (
    <BasicLayout>
      <SignUp handleSignUp={signUpAuth} />
    </BasicLayout>
  );
};
