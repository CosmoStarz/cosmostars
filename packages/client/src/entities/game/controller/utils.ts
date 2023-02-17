export const getRandomNumber = (max: number, min: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
