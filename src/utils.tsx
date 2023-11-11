export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("es-PY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function getNextMonth(today = new Date()) {
  today.setTime(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  return today;
}

export const isSameDate = (strDate1, strDate2) => {
  const date1 = new Date(strDate1);
  const date2 = new Date(strDate2);
  return (
    date1.getDate() == date2.getDate() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  );
};
