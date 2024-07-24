const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide username"],
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      unique: [true],
    },
    password: {
      type: String,
      required: [true, "please provide password"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userSchema);
