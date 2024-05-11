const total = (addCount, addPrice, currentTotal = 0) => {
  return +(addCount * addPrice + currentTotal).toFixed(2);
};
