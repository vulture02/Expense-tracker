const express = require("express");
const Group = require("../models/Group");
const Expense = require("../models/Expense");
const { calculateBalances } = require("../utils/balances");

const router = express.Router();

// Create a group
router.post("/", async (req, res) => {
  try {
    const { name, memberIds } = req.body;

    const group = await Group.create({
      name,
      members: memberIds && memberIds.length ? memberIds : [req.user._id]
    });

    res.status(201).json(group);
  } catch (err) {
    console.error("Create group error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get groups of logged-in user
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user._id });
    res.json(groups);
  } catch (err) {
    console.error("Get groups error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get balances for a group
router.get("/:groupId/balances", async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate("members");

    if (!group) return res.status(404).json({ message: "Group not found" });

    const expenses = await Expense.find({ group: groupId })
      .populate("paidBy")
      .populate("splitBetween");

    const balances = calculateBalances(
      expenses,
      group.members.map((m) => m._id)
    );

    res.json({ group, balances });
  } catch (err) {
    console.error("Get balances error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
