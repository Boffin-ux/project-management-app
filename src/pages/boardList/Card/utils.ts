const generateRandomColor = (): number => Math.round(Math.random() * 255);

export const setRandomColor = (): string => {
  const r = Number(generateRandomColor()).toString(16);
  const g = Number(generateRandomColor()).toString(16);
  const b = Number(generateRandomColor()).toString(16);
  return `#${r}${g}${b}`;
};
