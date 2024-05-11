const addWords = (obj, wrds) => {
  let words = obj.words.split(" ").concat(wrds.split(" "));
  words = words.filter((word) => word.trim() !== "");
  obj.words = [...new Set(words)].join(" ");
};

const removeWords = (obj, wrds) => {
  let wordsToRemove = wrds.split(" ");
  let words = obj.words.split(" ");
  obj.words = words.filter((word) => !wordsToRemove.includes(word)).join(" ");
};

const changeWords = (obj, oldWrds, newWrds) => {
  removeWords(obj, oldWrds);
  addWords(obj, newWrds);
};
