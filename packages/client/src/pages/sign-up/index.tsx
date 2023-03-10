import { SignUp } from "@/features/Auth/SignUp";
import { useAuth } from "@/shared/hooks/useAuth";
import { BasicLayout } from "@/shared/layouts/BasicLayout";
import { Notification } from "@/widgets/Notification";

export const SignUpPage = () => {
  const { signUpAuth } = useAuth();
  return (
    <BasicLayout>
      <SignUp handleSignUp={signUpAuth} />
      <Notification />
    </BasicLayout>
  );
};
