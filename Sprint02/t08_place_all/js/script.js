const sortEvenOdd = (arr) => {
  return arr.sort((a, b) => {
    return (a % 2) - (b % 2) || a - b;
  });
};
