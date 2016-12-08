const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:auth/client_side_auth', function(err) {
  if (err) {
    console.log("Error Connecting");
  } else {
    console.log('Connected to MongoDB!')
  }
})
