const AvengerQuote = require("./AvengerQuote");
const ListAvengerQuotes = require("./ListAvengerQuotes");
const Comment = require("./Comment");

const quotesList = new ListAvengerQuotes();

const comments1 = [
  new Comment("2024-05-06", "jump"),
  new Comment("2024-05-06", "fight"),
  new Comment("2024-05-06", "cut"),
];
const comments2 = [
  new Comment("2024-05-07", "fly"),
  new Comment("2024-05-07", "shoot"),
  new Comment("2024-05-07", "save"),
];
const comments3 = [
  new Comment("2024-05-08", "defend"),
  new Comment("2024-05-08", "slam"),
  new Comment("2024-05-08", "vicktory"),
];
const comments4 = [
  new Comment("2024-05-09", "eat"),
  new Comment("2024-05-09", "munch"),
  new Comment("2024-05-09", "bite"),
];

const quote1 = new AvengerQuote(
  1,
  "Black Panther",
  "Fighter",
  ["o/vjo/panther.jpg"],
  "05.06.2024",
  comments1
);
const quote2 = new AvengerQuote(
  2,
  "Spider Man",
  "Jumper",
  ["o/vjo/spider.jpg"],
  "06.06.2024",
  comments2
);
const quote3 = new AvengerQuote(
  3,
  "Capitan America",
  "Strong",
  ["o/vjo/cap.jpg"],
  "07.06.2024",
  comments3
);
const quote4 = new AvengerQuote(
  4,
  "Venom",
  "Huge",
  ["o/vjo/venom.jpg"],
  "08.06.2024",
  comments4
);

quotesList.addQuote(quote1);
quotesList.addQuote(quote2);
quotesList.addQuote(quote3);
quotesList.addQuote(quote4);

quotesList.toXML("avenger_quotes.xml");

const newQuotesList = new ListAvengerQuotes();
newQuotesList.fromXML("avenger_quotes.xml");

module.exports = { quotesList, newQuotesList };
