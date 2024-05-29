function firstUpper(string) {
  if (typeof string !== "string") return "";

  string = string.trim();

  if (string === "") return "";

  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

module.exports = { firstUpper };
