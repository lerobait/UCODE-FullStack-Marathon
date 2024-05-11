let concat = (string1, string2) => {
  if (string2 !== undefined) {
    return string1 + " " + string2;
  } else {
    let count = 0;
    function func1() {
      let string2 = prompt("Please enter a string", "");
      count++;
      return string1 + " " + string2;
    }
    func1.count = function () {
      return count;
    };
    return func1;
  }
};
