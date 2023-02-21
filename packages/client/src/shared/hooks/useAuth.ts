import { useSelector } from "react-redux";
import { selectIsLogged } from "../../entities/auth/model/auth";
export const useAuth = () => {
  return useSelector(selectIsLogged);
};
