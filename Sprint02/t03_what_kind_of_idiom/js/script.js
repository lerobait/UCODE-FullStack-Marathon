let number;
while (true) {
  number = Number(prompt("Enter a number from 1 to 10:", ""));
  if (!isNaN(number) && number >= 1 && number <= 10) {
    break;
  }
}

let idiom;
switch (number) {
  case 1:
    idiom = "Back to square 1";
    break;
  case 2:
    idiom = "Goody 2-shoes";
    break;
  case 3:
  case 6:
    idiom = "Two's company, three's a crowd";
    break;
  case 4:
  case 9:
    idiom = "Counting sheep";
    break;
  case 5:
    idiom = "Take five";
    break;
  case 7:
    idiom = "Seventh heaven";
    break;
  case 8:
    idiom = "Behind the eight-ball";
    break;
  case 10:
    idiom = "Cheaper by the dozen";
    break;
}
alert(idiom);
