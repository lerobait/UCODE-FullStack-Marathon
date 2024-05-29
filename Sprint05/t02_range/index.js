const checkDivision = (start = 1, end = 60) => {
  for (start; start <= end; start++) {
    if (start % 2 === 0 && start % 3 === 0 && start % 10 === 0) {
      console.log(
        `The number ${start} is divisible by 2, is divisible by 3, is divisible by 10`
      );
    } else if (start % 2 === 0 && start % 3 === 0) {
      console.log(`The number ${start} is divisible by 2, is divisible by 3`);
    } else if (start % 3 === 0) {
      console.log(`The number ${start} is divisible by 3`);
    } else if (start % 2 === 0) {
      console.log(`The number ${start} is divisible by 2`);
    } else {
      console.log(`The number ${start} -`);
    }
  }
};

module.exports = { checkDivision };
