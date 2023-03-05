import { FC, ReactNode } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { useLogoutMutation } from "@/shared/api/auth/auth";
import { RoutesName } from "@/shared/constants";
import { useAuth } from "@/shared/hooks/useAuth";

export type PrivateModeProps = {
  children: ReactNode;
};

export const PrivateMode: FC<PrivateModeProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = useAuth();
  const [logout] = useLogoutMutation();
  const onLogoutButtonClick = async () => {
    await logout("");
    window.location.reload();
    navigate(RoutesName.LOGIN);
  };

  return isAuth ? (
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
