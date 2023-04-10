export const plusZero = (number: string) => {
  return number.padStart(2, "0");
};

export const dDay = (date: string | undefined) => {
  if (typeof date === "undefined") {
    return null;
  } else {
    const time = new Date(date).getTime() - new Date().getTime();
    return Math.ceil(time / (24 * 60 * 60 * 1000));
  }
};

export const dTime = (dateTime: string) => {
  const time = new Date(dateTime).getTime() - new Date().getTime();

  const other = time % (1000 * 60 * 60);

  const hours = String(Math.floor(time / (1000 * 60 * 60))).padStart(2, "0");
  const mins = String(
    Math.floor((other % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");
  const secs = String(Math.floor((other % (1000 * 60)) / 1000)).padStart(
    2,
    "0"
  );
  const result = `${hours}:${mins}:${secs}`;
  return result;
};
