import { useGetUserQuery } from "../api/auth/auth";
export const useAuth = () => {
  const { data } = useGetUserQuery("user");
  console.log(data);
  return !!data;
};
