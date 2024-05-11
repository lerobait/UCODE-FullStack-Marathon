const getFormattedDate = (dataObject) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = dataObject.getDate().toString().padStart(2, "0");
  const month = (dataObject.getMonth() + 1).toString().padStart(2, "0");
  const year = dataObject.getFullYear();
  const hours = dataObject.getHours().toString().padStart(2, "0");
  const minutes = dataObject.getMinutes().toString().padStart(2, "0");
  const dayName = days[dataObject.getDay()];

  return `${day}.${month}.${year} ${hours}:${minutes} ${dayName}`;
};
