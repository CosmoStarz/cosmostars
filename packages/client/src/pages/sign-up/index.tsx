import { FC, PropsWithChildren } from "react";
import { BasicLayout } from "../../shared/layouts/BasicLayout";
import { SignUp } from "../../features/Auth/SignUp";

export const SignUpPage: FC<PropsWithChildren> = props => {
    return (
      <BasicLayout>
        <SignUp />
        {props.children}
      </BasicLayout>
    );
};
