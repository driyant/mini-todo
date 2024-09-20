/*
 * Function that generate a random id for each task
 */
export const generateRandomId = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");
  const seconds = String(newDate.getSeconds()).padStart(2, "0");
  const randomId = `ID${year}${month}${day}${hours}${minutes}${seconds}`;
  return randomId;
};
