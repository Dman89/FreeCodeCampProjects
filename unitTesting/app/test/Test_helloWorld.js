var expect = require("chai").expect;
var helloWorld = require("../helloWorld").helloWorld;


describe("It Should be a String", () => {
  it("Is a String", () => {
    expect(helloWorld("Hello World")).to.be.a("string");
  })
  it("Capitalized", () => {
    expect(helloWorld("a")).to.equal("A");
  })
  it("First Letter Capitalized", () => {
    expect(helloWorld("hello")).to.equal("Hello");
  })
  it("All Words Capitalized", () => {
    expect(helloWorld("hello world")).to.equal("Hello World");
  })
  it("First Letter ONLY Capitalized", () => {
    expect(helloWorld("helLO world")).to.equal("Hello World");
  })
  it("Important Words Capitalized", () => {
    expect(helloWorld("A Whole World Of The Hello")).to.equal("A Whole World of the Hello");
  })
})
