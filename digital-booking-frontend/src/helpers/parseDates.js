const getMonthNumber = (monthIndex) => {
  const monthsNumbers = {
    0: "01",
    1: "02",
    2: "03",
    3: "04",
    4: "05",
    5: "06",
    6: "07",
    7: "08",
    8: "09",
    9: "10",
    10: "11",
    11: "12",
  };
  return monthsNumbers[monthIndex];
};

const getDateFormat = (date, separator) => {
  return `${date.getFullYear()}${separator}${getMonthNumber(
    date.getMonth()
  )}${separator}${date.getDate()}`;
};

const getDateArrayFormat = (date, separator) => {
  return `${date[0]}${separator}${date[1]}${separator}${date[2]}`;
};

const addDays = (date, days) => {
  date.setDate(date.getDate() + days);
  return date;
};

const subtractDays = (date, days) => {
  date.setDate(date.getDate() - days);
  return date;
};

export {
  getMonthNumber,
  getDateFormat,
  getDateArrayFormat,
  addDays,
  subtractDays,
};
