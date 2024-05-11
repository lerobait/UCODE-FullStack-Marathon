let expect = chai.expect;

describe("checkBrackets", function () {
  it("Should return -1 when string does not contain brackets", function () {
    expect(checkBrackets("abc")).to.equal(-1);
  });

  it("Should return the number of brackets to be added when brackets are not balanced", function () {
    expect(checkBrackets(")(")).to.equal(2);
    expect(checkBrackets("(()")).to.equal(1);
    expect(checkBrackets(")()")).to.equal(1);
    expect(checkBrackets("(()))")).to.equal(1);
    expect(checkBrackets(")()(")).to.equal(2);
  });

  it("Should return 0 when brackets are balanced", function () {
    expect(checkBrackets("(())")).to.equal(0);
    expect(checkBrackets("((()))")).to.equal(0);
    expect(checkBrackets("()()")).to.equal(0);
    expect(checkBrackets("(a(b)c)")).to.equal(0);
    expect(checkBrackets("((a)b(c(d)e)f)")).to.equal(0);
  });

  it("Should return -1 when input is not a string", function () {
    expect(checkBrackets(123)).to.equal(-1);
    expect(checkBrackets(true)).to.equal(-1);
    expect(checkBrackets(null)).to.equal(-1);
    expect(checkBrackets(undefined)).to.equal(-1);
    expect(checkBrackets({})).to.equal(-1);
  });

  it("Should handle strings with characters other than brackets", function () {
    expect(checkBrackets("1)()(())2(()")).to.equal(2);
    expect(checkBrackets("a(b)c)d")).to.equal(1);
    expect(checkBrackets("a(b(c)d)e)")).to.equal(0);
    expect(checkBrackets("a)b(c)d")).to.equal(2);
    expect(checkBrackets("a(b)c)d)e")).to.equal(1);
  });
});
