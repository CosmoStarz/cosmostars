import { FC } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { logIn } from "../../features/auth";
import { RoutesName } from "../../shared/constants";

export const LoginPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onLoginButtonClick = () => {
    logIn();
    navigate(location?.state?.from ?? RoutesName.MAIN);
  };

  return (
    <main data-testid="login-page">
      <h1>Login</h1>
      <button onClick={onLoginButtonClick}>Log in</button>
    </main>
  );
};
