const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  wallet_id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const Client = (module.exports = mongoose.model("Client", clientSchema));

module.exports.addClient = function(newClient, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      throw err;
    }
    bcrypt.hash(newClient.password, salt, function(err, hash) {
      if (err) throw err;
      newClient.password = hash;
      newClient.save(callback);
    });
  });
};

module.exports.getUserById = function(id, callback) {
  Client.findById(id, callback);
};

module.exports.getUserByUsername = function(email, callback) {
  const query = { email: email };
  Client.findOne(query, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};
