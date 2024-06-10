const fs = require("fs");
const xml2js = require("xml2js");
const Comment = require("./Comment");

class AvengerQuote {
  constructor(id, author, quote, photo, publishDate, comments) {
    this.id = id;
    this.author = author;
    this.quote = quote;
    this.photo = photo;
    this.publishDate = publishDate;
    this.comments = comments;
  }

  static toXML(quotes, fileName) {
    const builder = new xml2js.Builder({ rootName: "root", headless: true });
    const groupedQuotes = quotes.reduce((acc, quote) => {
      // Replace invalid characters in XML element names
      const authorKey = quote.author.replace(/[^a-zA-Z0-9_.-]/g, "_");
      if (!acc[authorKey]) {
        acc[authorKey] = [];
      }
      acc[authorKey].push({
        id: quote.id,
        author: quote.author,
        quote: quote.quote,
        photo: quote.photo.join(","),
        publishDate: quote.publishDate,
        comments: quote.comments.map((c) => c.comment),
      });
      return acc;
    }, {});
    const xml = builder.buildObject(groupedQuotes);
    fs.writeFileSync(fileName, xml);
  }

  static fromXML(fileName) {
    const xml = fs.readFileSync(fileName);
    let quotes = [];
    xml2js.parseString(
      xml,
      { explicitArray: false, mergeAttrs: true },
      (err, result) => {
        if (err) {
          throw err;
        }
        for (let author in result.root) {
          let authorQuotes = result.root[author];
          if (!Array.isArray(authorQuotes)) {
            authorQuotes = [authorQuotes];
          }
          authorQuotes.forEach((q) => {
            quotes.push(
              new AvengerQuote(
                q.id,
                q.author,
                q.quote,
                q.photo.split(","),
                q.publishDate,
                q.comments.map(
                  (comment) => new Comment(new Date().toISOString(), comment)
                )
              )
            );
          });
        }
      }
    );
    return quotes;
  }
}

module.exports = AvengerQuote;
