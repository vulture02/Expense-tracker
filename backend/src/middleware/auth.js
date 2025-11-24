
const User=require("../models/User");
const admin = require("../config/firebase");
module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = await admin.auth().verifyIdToken(token);

    let user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
        name: decoded.name || decoded.email.split("@")[0]
      });
    }

    req.user = user; // attach logged-in user
    next();
  } catch (err) {
    console.error(" Auth error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};
