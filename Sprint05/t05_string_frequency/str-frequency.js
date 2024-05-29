class StrFrequency {
  constructor(str) {
    this.str = str;
  }

  letterFrequencies() {
    const frequencies = {};
    const lettersOnly = this.str.replace(/[^a-zA-Z]/g, "").toLowerCase();

    for (const char of lettersOnly) {
      const upperChar = char.toUpperCase();
      frequencies[upperChar] = (frequencies[upperChar] || 0) + 1;
    }

    return frequencies;
  }

  wordFrequencies() {
    const frequencies = {};
    const words = this.str.toLowerCase().match(/\b[a-z]+\b/g) || [];

    for (const word of words) {
      const upperWord = word.toUpperCase();
      frequencies[upperWord] = (frequencies[upperWord] || 0) + 1;
    }

    if (this.str.trim() === "") {
      frequencies[""] = 1;
    }

    return frequencies;
  }

  reverseString() {
    return this.str.split("").reverse().join("");
  }
}

module.exports = StrFrequency;
