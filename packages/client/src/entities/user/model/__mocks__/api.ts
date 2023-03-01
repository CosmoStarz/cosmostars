const user = {
  id: 1,
  first_name: "TestFirstName",
  second_name: "TestSecondName",
  display_name: "",
  login: "TestLogin",
  email: "test@email.com",
  phone: 1234567890,
  avatar: null,
};

export const useGetUserQuery = () => ({
  data: user,
});

export const useChangeProfileMutation = () => [
  () => {
    return;
  },
];

export const useChangePasswordMutation = () => [
  () => {
    return;
  },
];

export const useChangeAvatarMutation = () => [
  () => {
    return;
  },
];
