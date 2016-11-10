const helloWorld = (req) => {
  req = req.split(" ")
  var titleReturned = req.map((x) => {
    if (x.toLowerCase() == "of" || x.toLowerCase() == "the") {
      return x.toLowerCase();
    } else {
      return x[0].toUpperCase() + x.substring(1).toLowerCase();
    }
  })
  return titleReturned.join(" ")
}

module.exports.helloWorld = helloWorld;
