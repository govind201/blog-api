const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password are required fields" });
      }
      const hashedPassword = await bcrypt.hash(password, 10); 
      const user = await User.create({ username, password: hashedPassword });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password are required fields" });
      }
      const hashedPassword = await bcrypt.hash(password, 10); 
      const user = await User.findByIdAndUpdate(
        id,
        { username, password: hashedPassword },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
