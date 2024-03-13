const transactionModel = require("../Models/tranactionModel");
const moment = require("moment");

/*
 * Returns all the transactions with filters such as custom date, frequency, type.
 */
const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, typeFilter } = req.body;

    const transactions = await transactionModel.find({
      ...(typeFilter !== "All" && { type: typeFilter }),

      ...(frequency !== "All"
        ? frequency !== "Custom"
          ? {
              date: { $gt: moment().subtract(Number(frequency), "d").toDate() },
            }
          : {
              $or: [
                { date: { $gte: selectedDate[0], $lte: selectedDate[1] } },
                { date: { $exists: false } },
              ],
            }
        : {}),
      userid: req.body.userid,
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json(error);
  }
};

/*
 * adds a transactions to the database
 */
const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(200).json({
      success: true,
      message: "Transaction Created",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

/*
 * edits the transaction
 */
const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndReplace(
      {
        _id: req.body.transactionId,
      },
      req.body.payload
    );
    res.status(200).json({
      success: true,
      message: "Edited Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};


/*
 * deletes the transaction
 */
const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.body.transactionId;
    const deletedTransaction = await transactionModel.findOneAndDelete({
      _id: transactionId,
    });

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
