const AvengerQuote = require("./AvengerQuote");

class ListAvengerQuotes {
  constructor() {
    this.quotes = [];
  }

  addQuote(quote) {
    this.quotes.push(quote);
  }

  toXML(fileName) {
    AvengerQuote.toXML(this.quotes, fileName);
  }

  fromXML(fileName) {
    this.quotes = AvengerQuote.fromXML(fileName);
  }
}

module.exports = ListAvengerQuotes;
