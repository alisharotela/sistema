export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("es-PY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
