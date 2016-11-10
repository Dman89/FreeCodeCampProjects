var expect = require("chai").expect;
var modal = require("../modal").modal;

describe("Full Name", () => {
  it("Return a Object", () => {
    expect(modal("First", "Last")).to.be.a("object");
  })
  it("Returns First and Last Names", () => {
    expect(modal("First", "Last")).to.contain.all.keys({firstName: "First", lastName: "Last"})
  });
  it("Returns a Message", () => {
    expect(modal("First", "Last")).to.contain.any.keys('message')
  });
  it("Returns a Sorry Message", () => {
    expect(modal("First", "Last")).to.contain.any.keys({message: "Sorry First Last, We are OUT of Items"})
  });
});
