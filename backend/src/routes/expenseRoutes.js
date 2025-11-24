const express = require("express");
const Group = require("../models/Group");
const Expense = require("../models/Expense");

const router = express.Router({ mergeParams: true });

// Add expense to a group
router.post("/", async (req, res) => {
  try {
    const { groupId } = req.params;
    const { amount, description, splitBetweenIds } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const expense = await Expense.create({
      group: groupId,
      paidBy: req.user._id,
      amount,
      description,
      splitBetween:
        splitBetweenIds && splitBetweenIds.length
          ? splitBetweenIds
          : group.members
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error("Create expense error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get expenses of group
router.get("/", async (req, res) => {
  try {
    const { groupId } = req.params;
    const expenses = await Expense.find({ group: groupId })
      .populate("paidBy", "name email")
      .populate("splitBetween", "name email");

    res.json(expenses);
  } catch (err) {
    console.error("Get expenses error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
