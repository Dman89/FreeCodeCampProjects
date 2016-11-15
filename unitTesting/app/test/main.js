var expect = require("chai").expect;

describe('Mocha', function() {
  it("Should Run Out Test Using NPM", () => {
    expect(true).to.be.ok;
  })
})

var checkTitle = require("./Test_helloWorld").checkTitle

var checkIfEven = require("./Test_checkIfEven").checkIfEven

var fullName = require("./Test_returnFullName").fullName

var modal = require("./Test_modal").modal
