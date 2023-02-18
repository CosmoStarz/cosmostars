import { FC, PropsWithChildren } from "react";

import { MainMenu } from "@/widgets/MainMenu/MainMenu";

import { BasicLayout } from "./BasicLayout";

export const MainLayout: FC<PropsWithChildren> = props => {
  return (
    <BasicLayout>
      <MainMenu />
      {props.children}
    </BasicLayout>
  );
};
