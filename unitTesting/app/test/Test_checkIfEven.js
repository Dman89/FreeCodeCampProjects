var expect = require("chai").expect;
var isEven = require("../isEven").isEven;

describe("Even Number", () => {
  it("Is a Number", () => {
    expect(isEven("Hello World")).to.be.a("number");
  })
  it("Number is Even", () => {
    expect(isEven("2")).to.equal(0)
    expect(isEven("3")).to.equal(1)
  })
})
