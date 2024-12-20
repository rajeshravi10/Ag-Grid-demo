const User = require("../models/User");

// Create a User
const createUser = async (req, res) => {
  try {
    const { id, name, username, email, phone, website, company, address, net, gross, total } = req.body;

    // Ensure all required fields are provided
    if (!id || !name || !username || !email || !phone || !website || !company || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = await User.create({ id, name, username, email, phone, website, company, address, net, gross, total });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a Single User
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { net, gross, total, ...otherData } = req.body;

    // Log previous data for debugging
    const previousData = await User.findOne({ id });
    if (!previousData) return res.status(404).json({ message: "User not found" });
    console.log("Previous Data:", previousData);

    const updatedUser = await User.findOneAndUpdate(
      { id },
      { net, gross, total, ...otherData },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    console.log("Updated Data:", updatedUser);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ id: req.params.id });
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
