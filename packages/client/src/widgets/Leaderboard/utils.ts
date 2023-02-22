export const generateRandomUserInfo = () => {
  const num = Math.floor(Math.random() * 1000);

  return { playerId: num, name: `User${num}`, email: `user${num}@email.com` };
};
