import { FC, ReactNode } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { logOut } from "@/features/auth";
import { RoutesName } from "@/shared/constants";
import { useAuth } from "@/shared/hooks/useAuth";

export type PrivateModeProps = {
  children: ReactNode;
};

export const PrivateMode: FC<PrivateModeProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogged = useAuth();

  const onLogoutButtonClick = () => {
    logOut();
    navigate(RoutesName.LOGIN);
  };

  return isLogged ? (
    <>
      {children}
      <button onClick={onLogoutButtonClick}>Log out</button>
    </>
  ) : (
    <Navigate
      to={RoutesName.LOGIN}
      replace={true}
      state={{ from: location.pathname }}
    />
  );
};
