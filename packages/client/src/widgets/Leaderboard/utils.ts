import { getRandomNumber } from "@/shared/utils/functions";

export const generateRandomUserInfo = () => {
  const num = getRandomNumber(0, 1000);

  return { playerId: num, name: `User${num}`, email: `user${num}@email.com` };
};
