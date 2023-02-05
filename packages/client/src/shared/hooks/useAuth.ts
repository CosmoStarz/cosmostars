export const useAuth = () => {
  return Boolean(Number(localStorage.getItem("isLogged")));
};
