export const dDay = (date: string) => {
  const time = new Date(date).getTime() - new Date().getTime();
  return Math.floor(time / (24 * 60 * 60 * 1000));
};
