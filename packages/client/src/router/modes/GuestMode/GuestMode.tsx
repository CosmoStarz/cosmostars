import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { RoutesName } from "@/shared/constants";
import { useAuth } from "@/shared/hooks/useAuth";

export type PrivateModeProps = {
  children: ReactNode;
};

export const GuestMode: FC<PrivateModeProps> = ({ children }) => {
  const isAuth = useAuth();
  return !isAuth ? (
    <>{children}</>
  ) : (
    <Navigate to={RoutesName.MAIN} replace={true} />
  );
};
