const calculateTime = () => {
  const currentDate = new Date();
  const startDate = new Date("1939-01-01");

  const diffInTime = Math.abs(currentDate - startDate);
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  const years = Math.floor(diffInDays / 64);
  const months = Math.floor((diffInDays % 64) / 5);
  const days = (diffInDays % 64) % 5;

  return [years, months, days];
};

module.exports = { calculateTime };
