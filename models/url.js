const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  { timestamps: true } // Add timestamps here for the entire schema
);

const URL = mongoose.model("url", URLSchema);
module.exports = URL;
