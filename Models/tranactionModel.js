const mongoose = require("mongoose");

// User Schema design
const transactionSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: [true, "Amount is Required"],
  },
  type: {
    type: String,
    required: [true, "Type is Required"],
  },
  category: {
    type: String,
    required: [true, "category is Required"],
  },
  description: {
    type: String,
  },
  date: {
    type: Date, // Date stored as string
    default: Date.now()
    },
  });

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;
