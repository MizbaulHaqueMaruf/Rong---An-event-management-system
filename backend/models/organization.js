const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: String,
  description: String,
  email: String,
  website: String,
});

module.exports = mongoose.model("Organization", organizationSchema);
