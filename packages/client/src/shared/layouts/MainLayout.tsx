import { FC, PropsWithChildren } from "react";

import { MainMenu } from "@/widgets/MainMenu/MainMenu";
import { Notification } from "@/widgets/Notification";

import { BasicLayout } from "./BasicLayout";

export const MainLayout: FC<PropsWithChildren> = props => {
  return (
    <BasicLayout>
      <MainMenu />
      {props.children}
      <Notification />
    </BasicLayout>
  );
};
