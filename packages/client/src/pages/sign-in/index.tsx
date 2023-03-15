import { SignIn } from "@/features/Auth/SignIn";
import { useAuth } from "@/shared/hooks/useAuth";
import { BasicLayout } from "@/shared/layouts/BasicLayout";

export const SignInPage = () => {
  // const { signInAuth } = useAuth();
  // eslint-disable-next-line
  const signInAuth = () => {};
  return (
    <BasicLayout>
      <SignIn handleSignIn={signInAuth} />
    </BasicLayout>
  );
};
