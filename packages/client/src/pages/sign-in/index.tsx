import { SignIn } from "@/features/Auth/SignIn";
import { useAuth } from "@/shared/hooks/useAuth";
import { BasicLayout } from "@/shared/layouts/BasicLayout";
import { Notification } from "@/widgets/Notification";

export const SignInPage = () => {
  const { signInAuth } = useAuth();
  return (
    <BasicLayout>
      <SignIn handleSignIn={signInAuth} />
      <Notification />
    </BasicLayout>
  );
};
