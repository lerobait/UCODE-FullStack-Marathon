const nameExp = /^[A-Za-z]+$/;

let firstName = prompt("Enter your first name", "");
if (firstName.match(nameExp)) {
  firstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
} else {
  alert("Wrong input!");
  console.log("Wrong input!");
  throw "";
}

let lastName = prompt("Enter your last name", "");
if (lastName.match(nameExp)) {
  lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
} else {
  alert("Wrong input!");
  console.log("Wrong input!");
  throw "";
}

alert(`Greetings, ${firstName} ${lastName}!`);
console.log(`Greetings, ${firstName} ${lastName}!`);
