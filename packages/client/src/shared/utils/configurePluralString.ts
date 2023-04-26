export const configurePluralString = (word: string, count: number) => {
  const str = count === 1 ? word : `${word}s`;

  return `${count} ${str}`;
};
