import { SignIn } from "@/features/Auth/SignIn";
import { useAuth } from "@/shared/hooks/useAuth";
import { BasicLayout } from "@/shared/layouts/BasicLayout";

export const SignInPage = () => {
  const { signInAuth } = useAuth();
  const handleSignIn = signInAuth;
  return (
    <BasicLayout>
      <SignIn handleSignIn={handleSignIn} />
    </BasicLayout>
  );
};
