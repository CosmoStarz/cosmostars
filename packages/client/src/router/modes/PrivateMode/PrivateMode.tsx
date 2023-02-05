import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RoutesName } from "../../../shared/constants";
import { useAuth } from "../../../shared/hooks/useAuth";

export type PrivateModeProps = {
  children: ReactNode;
};

export const PrivateMode: FC<PrivateModeProps> = ({ children }) => {
  const location = useLocation();

  const isLogged = useAuth();

  return isLogged ? (
    <>{children}</>
  ) : (
    <Navigate
      to={RoutesName.LOGIN}
      replace={true}
      state={{ from: location.pathname }}
    />
  );
};
