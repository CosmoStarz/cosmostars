import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useLocation} from "react-router-dom";

import { RoutesName } from "@/shared/constants";
import { useAuth } from "@/shared/hooks/useAuth";

export type PrivateModeProps = {
  children: ReactNode;
};

export const GuestMode: FC<PrivateModeProps> = ({ children }) => {
  const { isAuth } = useAuth();
  const location = useLocation();
  return !isAuth ? (
    <>{children}</>
  ) : (
    <Navigate to={location?.state?.from ?? RoutesName.MAIN} replace={true} />
  );
};
