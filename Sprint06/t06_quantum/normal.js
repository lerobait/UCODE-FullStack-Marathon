const calculateTime = () => {
  const currentDate = new Date();
  const startDate = new Date("1939-01-01");

  const diffInTime = Math.abs(currentDate - startDate);
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  const years = Math.floor(diffInDays / 365);
  const months = Math.floor((diffInDays % 365) / 30);
  const days = (diffInDays % 365) % 30;

  return {
    years: () => years,
    months: () => months,
    days: () => days,
  };
};

module.exports = { calculateTime };
