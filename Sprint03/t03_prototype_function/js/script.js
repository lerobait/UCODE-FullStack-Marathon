String.prototype.removeDuplicates = function () {
  let words = this.split(/\s+/);
  let uniqieWords = [...new Set(words)];
  let result = uniqieWords.join(" ").trim();
  return result;
};
