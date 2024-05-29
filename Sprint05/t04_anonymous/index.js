const getAnonymous = (name, alias, affiliation) => {
  return new (class {
    #name = name;
    #alias = alias;
    #affiliation = affiliation;

    get name() {
      return this.#name;
    }

    get alias() {
      return this.#alias;
    }

    get affiliation() {
      return this.#affiliation;
    }
  })();
};

module.exports = { getAnonymous };
