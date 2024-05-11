const checkDivision = (beginRange, endRange) => {
  for (let i = beginRange; i <= endRange; i++) {
    let description = "";

    if (i % 2 === 0) {
      description += `${i} is even`;
    }
    if (i % 3 === 0) {
      description +=
        (description ? ", " : "") +
        (i % 2 === 0 ? "a multiple of 3" : `${i} is a multiple of 3`);
    }
    if (i % 10 === 0) {
      description +=
        (description ? ", " : "") +
        (i % 2 === 0 ? "a multiple of 10" : `${i} is a multiple of 10`);
    }
    console.log(description ? description : `${i} -`);
  }
};

let beginRange = Number(
  prompt("Enter the number for the begining of a range", "1")
);
let endRange = Number(prompt("Enter the number for the end of a range", "100"));

checkDivision(beginRange, endRange);
