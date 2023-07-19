const currDate = (date = new Date()) => {
  const today = new Date(date);
  const year = today.getFullYear();

  // Get the month
  const month = today.getMonth() + 1; // Months are zero-indexed, so January is 0

  // Get the day
  const day = today.getDate();

  // Get the full date string
  const fullDate = `${year}-${month}-${day}`;

  return fullDate;
};
export const currdate = currDate();
export default currDate;
