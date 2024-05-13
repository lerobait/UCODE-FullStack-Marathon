let guestList = new WeakSet();
let homer = { name: "Homer" };
let marge = { name: "Marge" };
let bart = { name: "Bart" };
let lisa = { name: "Lisa" };
let maggie = { name: "Maggie" };

guestList.add(homer).add(marge).add(bart).add(lisa).add(maggie);
console.log(guestList.has(bart));
guestList.delete(lisa);
console.log(guestList.has(lisa));

let menu = new Map();
menu
  .set("Duff Beer", 10)
  .set("Donut", 5)
  .set("Butterfinger", 15)
  .set("Ribwich", 25);

for (let [dish, price] of menu) {
  console.log(`Dish: ${dish}, Price: ${price}$`);
}

let bankVault = new WeakMap();
let depositeBox1 = { id: 1 };
let depositeBox2 = { id: 2 };
let depositeBox3 = { id: 3 };
let depositeBox4 = { id: 4 };

bankVault
  .set(depositeBox1, "Cash")
  .set(depositeBox2, "Bonds")
  .set(depositeBox3, "Gold bar")
  .set(depositeBox4, "Jewelry");

console.log(bankVault.get(depositeBox1));
bankVault.delete(depositeBox2);
console.log(bankVault.get(depositeBox2));

let coinCollection = new Set();
coinCollection
  .add("Bitcoin")
  .add("Ethereum")
  .add("Tether")
  .add("BNB")
  .add("Solana");

console.log(coinCollection.size);
coinCollection.delete("BNB");
console.log(coinCollection.has("BNB"));

for (let coin of coinCollection) {
  console.log(coin);
}
