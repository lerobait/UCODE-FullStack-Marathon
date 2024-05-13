const houseMixin = {
  wordReplace(oldWord, newWord) {
    this.description = this.description.replace(oldWord, newWord);
  },
  wordInsertAfter(word, newWord) {
    const index = this.description.indexOf(word);
    if (index !== -1) {
      this.description =
        this.description.slice(0, index + word.length) +
        " " +
        newWord +
        this.description.slice(index + word.length);
    }
  },
  wordDelete(word) {
    this.description = this.description.replace(word, "");
  },
  wordEncrypt() {
    this.description = this.description.replace(/[a-z]/gi, function (char) {
      return String.fromCharCode(
        char.charCodeAt(0) + (char.toLowerCase() < "n" ? 13 : -13)
      );
    });
  },
  wordDecrypt() {
    this.wordEncrypt();
  },
};
