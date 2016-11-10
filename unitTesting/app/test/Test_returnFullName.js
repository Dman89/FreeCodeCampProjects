var expect = require("chai").expect;
var fullName = require("../fullName").fullName;

describe("Full Name", () => {
  it("Return a Object", () => {
    expect(fullName("First", "Last")).to.be.a("object");
  })
  it("Returns First and Last Names", () => {
    expect(fullName("First", "Last")).to.deep.equal({firstName: "First", lastName: "Last"})
  })
})
