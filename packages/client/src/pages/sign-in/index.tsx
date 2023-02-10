import { FC, PropsWithChildren } from "react";
import { BasicLayout } from "../../shared/layouts/BasicLayout";
import { SignIn } from "../../features/Auth/SignIn";

export const SignInPage: FC<PropsWithChildren> = props => {
    return (
      <BasicLayout>
        <SignIn />
        {props.children}
      </BasicLayout>
    );
};
